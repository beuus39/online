import { Module } from '@nestjs/common';
import { AppController } from '../apis/app.controller';
import { AppService } from '../services/app.service';
import {BullModule} from "@nestjs/bull";
import {NumberService} from "../services/number.service";
import {MongooseModule} from "@nestjs/mongoose";
import {WorkflowSchema} from "../entities/schema/workflow.schema";
import {WorkflowController} from "../apis/workflow/workflow.controller";
import {WorkflowService} from "../services/workflow/workflow.service";
import {DepositInvoice} from "../entities/deposit-invoice.interface";
import {DepositInvoiceSchema} from "../entities/schema/deposit-invoice.schema";
import {DepositInvoiceService} from "../services/deposit-invoice/deposit-invoice.service";
import {DepositInvoiceController} from "../apis/deposit-invoice/deposit-invoice.controller";

@Module({
  imports: [
      BullModule.forRoot({
          redis: {
              host: "localhost",
              port:6379
          },
      }),
      BullModule.registerQueue({
          name: "message-queue"
      }),
      MongooseModule.forRoot("mongodb://localhost:27017/workflow"),
      MongooseModule.forFeature([
          { name: "workflow", schema: WorkflowSchema },
          { name: "depositInvoice", schema: DepositInvoiceSchema }
      ])
  ],
  controllers: [AppController, WorkflowController, DepositInvoiceController],
  providers: [AppService, NumberService, WorkflowService, DepositInvoiceService],
})
export class AppModule {}
