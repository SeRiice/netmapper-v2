import { Schema } from "mongoose"

const UserDataSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  { _id: false }
)

export default UserDataSchema
