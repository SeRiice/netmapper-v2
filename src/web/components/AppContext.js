import config from "@/web/config"
import api from "@/web/services/api"
import { createContext, useEffect, useState } from "react"
import jsonwebtoken from "jsonwebtoken"
import { useRouter } from "next/router"

const AppContext = createContext()

export const AppContextProvider = (props) => {
  const [session, setSession] = useState(null)
  const [sendingRequest, setSendingRequest] = useState(false)

  const router = useRouter()

  const signOut = () => {
    setSession(null)
    localStorage.removeItem(config.session.localStorageKey)
    router.push("/")
  }

  const signIn = async ({ email, password }) => {
    try {
      const {
        data: { result: jwt },
      } = await api.post("/sign-in", { email, password })

      localStorage.setItem(config.session.localStorageKey, jwt)
      setSession(jsonwebtoken.decode(jwt).payload)

      return [null, true]
    } catch (err) {
      return [err, false]
    }
  }

  const addScan = async ({ hostname, options }) => {
    await await api.post("/scan", { hostname, options })

    setSendingRequest(true)

    const {
      data: { result },
    } = await api.post("/nmap", { hostname, options })

    setSendingRequest(false)

    return result
  }

  useEffect(() => {
    const jwt = localStorage.getItem(config.session.localStorageKey)

    if (jwt) {
      setSession(jsonwebtoken.decode(jwt).payload)

      return
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        const {
          data: { result },
        } = await api.get("/lastScan")

        if (result.inProgress) {
          setSendingRequest(true)
        } else {
          setSendingRequest(false)
        }
      } catch (err) {
        return
      }
    })()
  }, [])

  useEffect(() => {
    if (!session) {
      return
    }

    let interval = setInterval(async () => {
      try {
        const {
          data: { result },
        } = await api.get("/lastScan")

        if (!result.inProgress) {
          setSendingRequest(false)
          clearInterval(interval)
          interval = null
        }
      } catch (err) {
        return
      }
    }, 3000)

    return () => {
      clearInterval(interval)
    }
  })

  return (
    <AppContext.Provider
      value={{
        state: {
          session,
          sendingRequest,
        },
        actions: {
          signOut,
          signIn,
          addScan,
        },
      }}
      {...props}
    />
  )
}

export default AppContext
