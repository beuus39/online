import { Document } from "mongoose"
export interface User extends Document {
    accountId: string
    fullName: string
}
