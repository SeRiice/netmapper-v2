const config = {
  api: {
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  session: {
    localStorageKey: "session_jwt",
  },
}

export default config
