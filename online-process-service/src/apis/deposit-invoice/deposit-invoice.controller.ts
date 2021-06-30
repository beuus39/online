import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {DepositInvoiceService} from "../../services/deposit-invoice/deposit-invoice.service";
import {ApiOkResponse, ApiOperation} from "@nestjs/swagger";
import {CreateDepositInvoiceDto} from "../../dtos/create-deposit-invoice.dto";

@Controller('deposit-invoices')
export class DepositInvoiceController {
    constructor(
        private readonly depositInvoiceService: DepositInvoiceService
    ) {}

    @Post()
    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ description: "Create deposit"})
    @ApiOkResponse({})
    async createDepositInvoice(@Body() depositInvoice: CreateDepositInvoiceDto) {
        return this.depositInvoiceService.createDepositInvoice(depositInvoice);
    }
}
