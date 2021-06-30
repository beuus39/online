import {Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Query} from '@nestjs/common';
import {WorkflowService} from "../../services/workflow/workflow.service";
import {CreateWorkflowDto} from "../../dtos/create-workflow.dto";
import {ApiOkResponse, ApiOperation} from "@nestjs/swagger";
import {UpdateStepApprovedListDto} from "../../dtos/update-step-approved-list.dto";
import {UpdateTransitionDto} from "../../dtos/update-transition.dto";

@Controller('workflows')
export class WorkflowController {
    constructor(private readonly workflowService: WorkflowService) {
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ description: "Create Workflow"})
    @ApiOkResponse({})
    async createWorkflow(@Body() workflowDto: CreateWorkflowDto) {
        return this.workflowService.create(workflowDto)
    }

    @Put("/:workflowId/steps/:step")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({description: "Update workflow"})
    @ApiOkResponse({})
    async updateApprovedList(@Param("workflowId") workflowId: string,
                             @Param("step") step: string,
                             @Body() approvedList: UpdateStepApprovedListDto) {
        return this.workflowService.updateApprovedListAndExpectedStatus(workflowId, step, approvedList);
    }

    @Get("/:workflowId/:revision")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ description: "Get workflow by id"})
    @ApiOkResponse({})
    async getWorkflowById(@Param("workflowId") workflowId: string,
                          @Param("revision") revision: string | undefined) {
        if (!workflowId) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "workflowID must not be null or empty"
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return this.workflowService.getWorkflowByIdAndRevision(workflowId, revision)
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ description: "Get workflow by id"})
    @ApiOkResponse({})
    async getAllWorkflows() {
        return this.workflowService.getAllWorkflows();
    }

    @Put("/:workflowId")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ description: "Update status of the workflow" })
    @ApiOkResponse({})
    async updateWorkflow(@Param("workflowId") workflowId: string) {
        return this.workflowService.updateWorkflow(workflowId);
    }

    @Put("/:workflowId/steps/:step/transition")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ description: "Update transition"})
    @ApiOkResponse({})
    async updateTransition(@Param("workflowId") workflowId: string,
                           @Param("step") step: string,
                           @Body() status: UpdateTransitionDto) {
        return this.workflowService.updateTransition(workflowId, step, status);
    }
}
