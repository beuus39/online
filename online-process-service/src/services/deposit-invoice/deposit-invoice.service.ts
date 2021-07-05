import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {DepositInvoice} from "../../entities/deposit-invoice.interface";
import {Workflow} from "../../entities/workflow.interface";
import {CreateDepositInvoiceDto} from "../../dtos/create-deposit-invoice.dto";
import * as _ from "lodash";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class DepositInvoiceService {
    constructor(
        @InjectModel("depositInvoice") private readonly depositInvoiceModel: Model<DepositInvoice>,
        @InjectModel("workflow") private readonly workflow: Model<Workflow>
    ) {}

    async createDepositInvoice(depositInvoice: CreateDepositInvoiceDto): Promise<DepositInvoice> {
        const workflow = depositInvoice.workflow || {};
        let newRevisionWorkflow = {};
        if (!_.isEmpty(workflow)) {
            const workflowId = workflow.id;
            const cloneWorkflow = await this.workflow.findOne({ _id: workflowId });
            const addRevisionWorkflow = new this.workflow({
                revision: uuidv4(),
                step: cloneWorkflow.step,
                transition: cloneWorkflow.transition,
                status: cloneWorkflow.status
            })
            const createdWorkflowRevision = await addRevisionWorkflow.save();
            const assignees = depositInvoice?.workflow?.assignee?.split("|") ?? []

            newRevisionWorkflow = {
                id: createdWorkflowRevision._id,
                revision: createdWorkflowRevision.revision,
                assignee: {
                    id: assignees[0],
                    name: assignees[1]
                },
                nextStep: "2",
                previousStep: null
            }
        }

        const saveDepositInvoice = new this.depositInvoiceModel({
            issuedDate: depositInvoice.issuedDate,
            project: depositInvoice.project,
            businessUnit: depositInvoice.businessUnit,
            assignee: depositInvoice.assignee,
            workflow: newRevisionWorkflow,
            isActivated: true,
        })
        return saveDepositInvoice.save();
    }

    async getAllDepositInvoices(): Promise<Array<DepositInvoice>> {
        return this.depositInvoiceModel.find({ isActivated: true}).exec()
    }

    async getDepositOfAssignee(assignee: string): Promise<Array<DepositInvoice>> {
        return this.depositInvoiceModel.find({$and: [ { "workflow.assignee.id": assignee }, { isActivated: true }]}).exec()
    }

    async getInvoiceByIdAndAssignee(id: string, assignee: string): Promise<DepositInvoice> {
        return this.depositInvoiceModel.findOne({ $and: [ { "workflow.assignee.id": assignee}, { _id: id }]})
    }

    async updateDepositInvoice(depositInvoice: {
        id:  string,
        workflowId: string,
        description: string,
        assignee: string,
        step: string,
        action: string
    }): Promise<DepositInvoice> {
        const assignees = depositInvoice?.assignee?.split("|")
        const currentInvoice = await this.depositInvoiceModel.findOne({ _id: depositInvoice.id }).exec()
        const currentWorkflow = await this.workflow.findOne({ _id: depositInvoice.workflowId }).exec()
        const newInvoice = {
            project: currentInvoice?.project ?? null,
            businessUnit: currentInvoice?.businessUnit ?? null,
            assignee: currentInvoice?.assignee ?? null,
            workflow: {
                id: currentInvoice?.workflow?.id ?? null,
                revision: currentInvoice?.workflow?.revision ?? null,
                assignee: {
                    id: assignees[0],
                    name: assignees[1],
                },
                nextStep: currentWorkflow?.transition[`${depositInvoice?.step}`][`${depositInvoice?.action}`],
                previousStep: {
                    step: currentInvoice?.workflow?.nextStep,
                    assignee: currentInvoice?.workflow?.assignee
                }
            },
            isActivated: true
        }
        currentInvoice.isActivated = false
        const updatedCurrentInvoice = await currentInvoice.save()
        console.log("All update::", JSON.stringify(updatedCurrentInvoice))

        const afterDepositInvoice = new this.depositInvoiceModel(newInvoice)

        return afterDepositInvoice.save();
    }
}
