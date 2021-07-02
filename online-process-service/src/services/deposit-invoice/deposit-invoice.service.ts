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
        return this.depositInvoiceModel.find().exec()
    }

    async getDepositOfAssignee(assignee: string): Promise<Array<DepositInvoice>> {
        return this.depositInvoiceModel.find({ "workflow.assignee.id": assignee }).exec()
    }

    async getInvoiceByIdAndAssignee(id: string, assignee: string): Promise<DepositInvoice> {
        return this.depositInvoiceModel.findOne({ $and: [ { "workflow.assignee.id": assignee}, { _id: id }]})
    }
}
