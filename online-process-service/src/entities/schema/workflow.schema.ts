import * as mongoose from "mongoose";

export const WorkflowSchema = new mongoose.Schema({
    revision: String,
    step: {},
    transition: {},
    status: String,
})
