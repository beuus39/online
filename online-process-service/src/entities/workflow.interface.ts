import {} from "mongoose";

export interface Workflow extends Document {
    revision: string,
    step: any,
    transition: any,
    status: string
}
