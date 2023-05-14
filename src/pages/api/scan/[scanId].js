import ScanModel from "@/api/db/models/ScanModel"
import auth from "@/api/middlewares/auth"
import mw from "@/api/mw"

const handler = mw({
  GET: [
    auth,
    async (req, res) => {
      const { scanId } = req.query

      const scan = await ScanModel.findOne({ _id: scanId })

      res.send({ result: scan })
    },
  ],
})

export default handler
