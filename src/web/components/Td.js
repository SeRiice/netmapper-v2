import clsx from "clsx"

const Td = (props) => {
  const { className, children, ...otherProps } = props

  return (
    <td
      className={clsx("px-2 py-1 truncate max-w-0", className)}
      {...otherProps}
    >
      {children}
    </td>
  )
}

export default Td
