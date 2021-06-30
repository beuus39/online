import {Injectable} from "@nestjs/common";
import {InjectQueue} from "@nestjs/bull";
import {Queue} from "bull";

@Injectable()
export class NumberService {
    constructor(
        @InjectQueue("message-queue") private readonly queue: Queue
    ) {}

    async senMessage(msg: string) {
        await this.queue.add({
            text: msg,
            text1: msg,
            text2: msg,
            text3: msg,
        });
    }
    thrice(value: number): number {
        return value * 3;
    }
}
