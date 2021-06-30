import {IsNotEmpty, MaxLength, MinLength} from "class-validator";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class UpdateStepApprovedListDto {
    @ApiModelProperty({
        example: "abc123",
        description: "userid to access novaid",
        minLength: 5,
        maxLength: 255
    })
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(255)
    userId: string | undefined;
    @ApiModelProperty({
        example: "Nguyen Van A",
        description: "full name to access novaid",
        minLength: 10,
        maxLength: 100
    })
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(100)
    fullName: string | undefined;
    @ApiModelProperty({
        example: "DRAFT",
        description: "Status",
        minLength: 3,
        maxLength: 10
    })
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(10)
    status: string | undefined;
}
