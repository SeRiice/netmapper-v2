import config from "@/api/config.js"
import log from "@/api/middlewares/log"
import mongoose from "mongoose"

mongoose.connect(config.db.uri)

const mw = (handlersByMethod) => async (req, res) => {
  const { method } = req
  const handlers = handlersByMethod[method]

  if (!handlers) {
    res.status(404).send({ error: "Not found." })

    return
  }

  try {
    let handlerIndex = 0
    const next = async () => {
      const handler = handlers[handlerIndex]
      handlerIndex += 1

      await handler(req, res, next)
    }

    await log(req, res, next)
  } catch (err) {
    return
  }
}

export default mw
