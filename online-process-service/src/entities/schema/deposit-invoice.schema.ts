import * as mongoose from "mongoose";

export const DepositInvoiceSchema = new mongoose.Schema({
    issuedDate: String,
    project: String,
    businessUnit: String,
    assignee: String,
    workflow: {
        // id: String,
        // revision: String,
        // assignee: String,
        // nextStep: String,
        // previousStep: String,
    },
    isActivated: Boolean,
})
