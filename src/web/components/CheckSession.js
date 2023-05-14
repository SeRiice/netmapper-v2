import AppContext from "@/web/components/AppContext"
import CustomLink from "@/web/components/CustomLink"
import { useContext } from "react"

const CheckSession = (props) => {
  const { children } = props

  const {
    state: { session },
  } = useContext(AppContext)

  if (!session) {
    return (
      <div className="flex gap-4 h-screen items-center justify-center bg-gradient-to-br from-indigo-200 to-indigo-400">
        <CustomLink href={"/sign-in"}>Sign-in</CustomLink>
        <CustomLink href={"/sign-up"}>Sign-up</CustomLink>
      </div>
    )
  } else {
    return <div>{children}</div>
  }
}

export default CheckSession
