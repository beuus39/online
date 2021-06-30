import {ApiHideProperty} from "@nestjs/swagger";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {IsNotEmpty, MaxLength, MinLength} from "class-validator";

export class CreateStepDto {
    @ApiModelProperty({
        example: 1,
        description: "Step order of the step",
        format: 'isNumeric',
        minLength: 0,
        maxLength: 255
    })
    @IsNotEmpty()
    @MinLength(0)
    @MaxLength(255)
    readonly stepOrder: number;
    @ApiModelProperty({
        example: "GDKD",
        description: "Name of the workflow",
        format: "string",
        minLength: 5,
        maxLength: 255,
    })
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(255)
    readonly name: string;
    @ApiModelProperty({
        example: [1, 2, 3, 4],
        description: "userID of approved list",
    })
    readonly approvedList: [string];
    @ApiModelProperty({
        example: [1, 2, 3, 4],
        description: "userID of approved list",
    })
    readonly expectedStatus: [string];
}
