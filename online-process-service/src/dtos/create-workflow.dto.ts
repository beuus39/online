import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class CreateWorkflowDto {
    @ApiModelProperty({
        example: '{orderId: 1, name: NVL}',
        description: 'Array all steps'
    })
    readonly step: any
    @ApiModelProperty({
        example: '{step: a -> b}',
        description: 'defined all transition'
    })
    readonly transition: any;
    @ApiModelProperty({
        example: 'DRAFT, PUBLISHED',
        description: 'Status of the workflow'
    })
    readonly status: string;
}
