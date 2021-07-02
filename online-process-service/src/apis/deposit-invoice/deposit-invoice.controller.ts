import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';
import {DepositInvoiceService} from "../../services/deposit-invoice/deposit-invoice.service";
import {ApiOkResponse, ApiOperation} from "@nestjs/swagger";
import {CreateDepositInvoiceDto} from "../../dtos/create-deposit-invoice.dto";

@Controller('deposit-invoices')
export class DepositInvoiceController {
    constructor(
        private readonly depositInvoiceService: DepositInvoiceService
    ) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ description: "Create deposit"})
    @ApiOkResponse({})
    async createDepositInvoice(@Body() depositInvoice: CreateDepositInvoiceDto) {
        return this.depositInvoiceService.createDepositInvoice(depositInvoice);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ description: "Get All deposit"})
    @ApiOkResponse({})
    async getAllDepositInvoices() {
        return this.depositInvoiceService.getAllDepositInvoices()
    }

    @Get("/workflows/:assignee")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ description: "Get All deposit"})
    @ApiOkResponse({})
    async getAllDepositInvoiceByAssignee( @Param("assignee") assignee: string) {
        return this.depositInvoiceService.getDepositOfAssignee(assignee)
    }

    @Get("/:id/workflows/:assignee")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ description: "Get All deposit"})
    @ApiOkResponse({})
    async getInvoiceByIdAndAssignee(@Param("id") id: string, @Param("assignee") assignee: string) {
        return this.depositInvoiceService.getInvoiceByIdAndAssignee(id, assignee)
    }
}
