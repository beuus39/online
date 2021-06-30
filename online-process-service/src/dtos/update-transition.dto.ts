import {IsNotEmpty} from "class-validator";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class UpdateTransitionDto {
    @ApiModelProperty({
        example: "DRAFT",
        description: "Status",
        minLength: 3,
        maxLength: 10
    })
    @IsNotEmpty()
    status: string;
    @ApiModelProperty({
        example: "1",
        description: "step",
        minLength: 1,
        maxLength: 10
    })
    @IsNotEmpty()
    step: string;
}
