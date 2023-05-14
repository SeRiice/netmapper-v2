const config = {
  db: {
    uri: process.env.DB_URI,
  },
  security: {
    session: {
      tokenLength: 128,
    },
    jwt: {
      secret: process.env.SECURITY_JWT_SECRET,
      expiresIn: "1 day",
    },
    password: {
      salt: process.env.SECURITY_PASSWORD_SALT,
      keylen: Number.parseInt(process.env.SECURITY_PASSWORD_KEYLEN, 10),
      iterations: Number.parseInt(process.env.SECURITY_PASSWORD_ITERATIONS, 10),
      digest: "sha512",
    },
  },
}

export default config
