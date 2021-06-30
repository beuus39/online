import { Document } from "mongoose";

export interface DepositInvoice extends Document {
    issuedDate: string,
    project: string,
    businessUnit: string,
    assignee: string,
    workflow: any,
    isActivated: boolean,
}
