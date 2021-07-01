import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import * as _ from "lodash";
import {Workflow} from "../../entities/workflow.interface";
import {CreateWorkflowDto} from "../../dtos/create-workflow.dto";
import {UpdateStepApprovedListDto} from "../../dtos/update-step-approved-list.dto";
import {AppConstant} from "../../constants/app.constant";
import {UpdateTransitionDto} from "../../dtos/update-transition.dto";

@Injectable()
export class WorkflowService {
    constructor(
        @InjectModel("workflow") private readonly workflowModel: Model<Workflow>
    ) {}

    async create(createWorkflow: CreateWorkflowDto): Promise<Workflow> {
        const workflow = new this.workflowModel({
            revision: null,
            step: createWorkflow.step,
            transition: createWorkflow.transition,
            status: createWorkflow.status
        })
        return workflow.save();
    }

    async getWorkflowByIdAndRevision(id: string, revision: string): Promise<Workflow> {
        if (id && revision) {
            return this.workflowModel.findOne({ $and: [ {_id: id, revision }]}).exec();
        }
        return this.workflowModel.findOne({ _id: id }).exec();
    }

    async updateApprovedListAndExpectedStatus(workflowId: string, step: string,
        approvedList: UpdateStepApprovedListDto): Promise<Workflow> {
        const workflow = await this.workflowModel.findOne({_id: workflowId }).exec();
        if (approvedList.fullName && approvedList.userId) {
            workflow.step[`${step}`].approvedList[`${approvedList.userId}`] = approvedList.fullName
        }

        if (approvedList.status) {
            workflow.step[`${step}`].expectedStatus[`${approvedList.status}`] = approvedList.status;
        }
        return workflow.save();
    }

    async getAllWorkflows(): Promise<Workflow[]> {
        return this.workflowModel.find({$and: [
            {status: AppConstant.STATUS_PUBLISHED},
            { revision: null }
        ]}).exec();
    }

    async updateWorkflow(workflowId: string): Promise<Workflow> {
        const workflow = await this.workflowModel.findOne({_id: workflowId});
        const steps = workflow.step || {};
        const transition = workflow.transition || {};

        if (_.isEmpty(steps) || _.isEmpty(transition)) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Step and Transition workflow must be defined"
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }

        const sortKeyStep = Object.keys(steps);
        const sortKeyTransition = Object.keys(transition);
        if (!_.isEqual(sortKeyStep.sort(), sortKeyTransition.sort())) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "All steps must be defined transition state"
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }

        let isMappedAllState = true;
        _.forEach(sortKeyStep, (step) => {
            const expectedStatus = steps[`${step}`].expectedStatus || {};
            const transitionStatus = transition[`${step}`] || {};

            const keyExpectedStatus = _.keys(expectedStatus);
            const keyTransitionStatus = _.keys(transitionStatus);
            if (!_.isEqual(keyExpectedStatus.sort(), keyTransitionStatus.sort())) {
                isMappedAllState = false
            }
        })
        if (!isMappedAllState) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "All state of steps must be defined"
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }

        workflow.status = AppConstant.STATUS_PUBLISHED;
        return workflow.save();
    }

    async updateTransition(workflowId: string, step: string, status: UpdateTransitionDto): Promise<Workflow> {
        const workflow = await this.workflowModel.findOne({ _id: workflowId });
        workflow.transition[`${step}`][`${status.status}`] = status.step;
        return workflow.save();
    }
}
