import ScanModel from "@/api/db/models/ScanModel"
import auth from "@/api/middlewares/auth"
import mw from "@/api/mw"
import { spawn } from "node:child_process"

const handler = mw({
  POST: [
    auth,
    async (req, res) => {
      const {
        hostname,
        options: { scan, hostTimeout, maxRetries, fastScan, verbose },
      } = req.body

      const user = req.user

      const lastScan = await ScanModel.find({
        user: { email: user.email },
      })
        .sort({ createdAt: -1 })
        .limit(1)

      return new Promise((resolve) => {
        const nmap = spawn("multipass", [
          "exec",
          //nom de votre machine virtuelle multipass
          "methodical-scorpion",
          "--",
          "sudo",
          "nmap",
          scan,
          hostTimeout && "--host-timeout",
          hostTimeout,
          maxRetries && "--max-retries",
          maxRetries,
          fastScan && "-F",
          verbose && "-v",
          hostname,
        ])

        let output = ""
        let error = ""

        nmap.stdout.on("data", async (data) => {
          output += data.toString()

          await ScanModel.updateOne(
            { _id: lastScan[0]["_id"] },
            { $set: { output } }
          )
        })

        nmap.stderr.on("data", async (data) => {
          error += data.toString()
        })

        nmap.on("close", async (code) => {
          // eslint-disable-next-line no-console
          console.log(`child process exited with code ${code}`)

          await ScanModel.updateOne(
            { _id: lastScan[0]["_id"] },
            { $set: { inProgress: false } }
          )

          if (code === 0) {
            res.send({ result: output })
          } else {
            error = output + error

            await ScanModel.updateOne(
              { _id: lastScan[0]["_id"] },
              { $set: { output: error } }
            )

            res.send({ result: error })
          }

          resolve()
        })
      })
    },
  ],
})

export default handler
