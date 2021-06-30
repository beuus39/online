import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import { AppService } from '../services/app.service';
import {InjectQueue} from "@nestjs/bull";
import {Job, Queue} from "bull";
import {NumberService} from "../services/number.service";

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly numberService: NumberService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("send-message")
  async sendMessage(@Query("msg") msg: string) {
    await this.numberService.senMessage(msg)
    return msg;
  }
}
