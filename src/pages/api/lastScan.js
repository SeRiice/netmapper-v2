import ScanModel from "@/api/db/models/ScanModel"
import auth from "@/api/middlewares/auth"
import mw from "@/api/mw"

const handler = mw({
  GET: [
    auth,
    async (req, res) => {
      const user = req.user

      const lastScan = await ScanModel.find({ user: { email: user.email } })
        .sort({ createdAt: -1 })
        .limit(1)

      res.send({ result: lastScan[0] })
    },
  ],
})

export default handler
