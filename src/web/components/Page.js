import AppContext from "@/web/components/AppContext"
import CustomLink from "@/web/components/CustomLink"
import { Cog6ToothIcon, GlobeAltIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { useRouter } from "next/router"
import { useContext } from "react"

const variants = {
  normal: "max-w-3xl",
  large: "max-w-6xl",
}

const Page = (props) => {
  const router = useRouter()
  const { pathname } = router

  const { variant = "normal", children, ...otherProps } = props

  const {
    state: { session, sendingRequest },
    actions: { signOut },
  } = useContext(AppContext)

  const handleClick = () => {
    signOut()
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-indigo-200 to-indigo-400"
      {...otherProps}
    >
      <div className="w-full bg-white sticky top-0">
        <header className="flex justify-between max-w-3xl mx-auto py-4 text-xl">
          <div className="flex gap-1 items-center">
            <GlobeAltIcon className="w-6"></GlobeAltIcon>
            <CustomLink
              href={"/"}
              variant={pathname === "/" ? "active" : "notStyled"}
            >
              NETMAPPER
            </CustomLink>
          </div>
          <nav>
            <ul className="flex gap-10">
              <li>
                <CustomLink
                  href={"/scan"}
                  variant={pathname === "/scan" ? "active" : "notStyled"}
                >
                  Scan
                </CustomLink>
              </li>
              <li>
                <CustomLink
                  href={"/history"}
                  variant={pathname === "/history" ? "active" : "notStyled"}
                >
                  History
                </CustomLink>
              </li>
              <li>
                <button onClick={handleClick} className="hover:text-indigo-400">
                  {`Sign-out (${session.userUsername})`}
                </button>
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <main className={clsx("py-20 mx-auto", variants[variant])}>
        {sendingRequest ? (
          <label className="flex gap-1 items-center justify-center">
            <Cog6ToothIcon className="w-6 animate-spin" />
            Scanning in process...
          </label>
        ) : (
          children
        )}
      </main>
    </div>
  )
}

export default Page
