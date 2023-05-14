import clsx from "clsx"
import Link from "next/link"

const variants = {
  active: "text-indigo-400",
  session: "bg-white font-medium px-4 py-2 rounded-lg hover:text-indigo-400",
  notStyled: "hover:text-indigo-400",
}

const CustomLink = (props) => {
  const { className, variant = "session", children, ...otherProps } = props

  return (
    <Link className={clsx(variants[variant], className)} {...otherProps}>
      {children}
    </Link>
  )
}

export default CustomLink
