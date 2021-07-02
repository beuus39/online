import * as mongoose from "mongoose"

export const UserSchema = new mongoose.Schema({
    accountId: String,
    fullName: String
})
