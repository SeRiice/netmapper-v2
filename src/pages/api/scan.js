import ScanModel from "@/api/db/models/ScanModel"
import auth from "@/api/middlewares/auth"
import mw from "@/api/mw"

const handler = mw({
  POST: [
    auth,
    async (req, res) => {
      const {
        hostname,
        options: { scan, hostTimeout, maxRetries, fastScan, verbose },
      } = req.body

      const formatOptions = {
        scan,
        hostTimeout: hostTimeout ? `--host-timeout ${hostTimeout}` : "",
        maxRetries: maxRetries ? `--max-retries ${maxRetries}` : "",
        fastScan: fastScan ? "-F" : "",
        verbose: verbose ? "-v" : "",
      }

      const user = req.user

      await ScanModel.create({
        hostname,
        options: formatOptions,
        output: "",
        user: { email: user.email },
      })

      res.send({ result: true })
    },
  ],
  GET: [
    auth,
    async (req, res) => {
      const user = req.user

      const scans = await ScanModel.find({
        user: { email: user.email },
      }).sort({
        createdAt: -1,
      })

      res.send({ result: scans })
    },
  ],
})

export default handler
