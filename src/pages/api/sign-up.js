import UserModel from "@/api/db/models/UserModel"
import mw from "@/api/mw"
import hashPassword from "@/api/utils/hashPassword"

const handler = mw({
  POST: [
    async (req, res) => {
      const { username, email, password } = req.body

      const passwordHash = hashPassword(password)

      try {
        await UserModel.create({ username, email, password: passwordHash })
        res.send({ result: true })
      } catch (err) {
        res.send({ result: false })
      }
    },
  ],
})

export default handler
