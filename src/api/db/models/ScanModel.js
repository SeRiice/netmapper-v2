import ScanSchema from "@/api/db/schemas/ScanSchema"
import mongoose from "mongoose"

const ScanModel = mongoose.modelNames().includes("Scan")
  ? mongoose.model("Scan")
  : mongoose.model("Scan", ScanSchema)

export default ScanModel
