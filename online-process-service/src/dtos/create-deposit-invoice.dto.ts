import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {IsNotEmpty, MaxLength, MinLength} from "class-validator";

export class CreateDepositInvoiceDto {
    @ApiModelProperty({
        example: "2021-01-01",
        description: "issued date",
        minLength: 10,
        maxLength: 255
    })
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(255)
    issuedDate: string;
    @ApiModelProperty({
        example: "Novaworld Ho Tram",
        description: "project",
        minLength: 1,
        maxLength: 255
    })
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(255)
    project: string;
    @ApiModelProperty({
        example: "NVL",
        description: "Business Unit",
        minLength: 1,
        maxLength: 255
    })
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(255)
    businessUnit: string;
    @ApiModelProperty({
        example: "abcxyz123",
        description: "Assignee",
        minLength: 1,
        maxLength: 255
    })
    @MinLength(1)
    @MaxLength(255)
    assignee: string | undefined;
    @ApiModelProperty({
        example: "{}",
        description: "workflow",
        minLength: 1,
        maxLength: 255
    })
    @IsNotEmpty()
    workflow: any;
}
