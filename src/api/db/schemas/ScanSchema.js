import UserDataSchema from "@/api/db/schemas/UserDataSchema"
import { Schema } from "mongoose"

const ScanSchema = new Schema(
  {
    inProgress: {
      type: Boolean,
      default: true,
    },
    hostname: { type: String, required: true },
    options: {
      scan: {
        type: String,
      },
      hostTimeout: {
        type: String,
      },
      maxRetries: {
        type: String,
      },
      fastScan: {
        type: String,
      },
      verbose: {
        type: String,
      },
    },
    output: {
      type: String,
    },
    user: {
      type: UserDataSchema,
      required: true,
    },
  },
  { timestamps: true }
)

export default ScanSchema
