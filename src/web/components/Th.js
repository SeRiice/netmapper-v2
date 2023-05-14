import clsx from "clsx"

const Th = (props) => {
  const { className, children, ...otherProps } = props

  return (
    <th
      className={clsx(
        "bg-indigo-400 px-2 py-1 text-white font-medium",
        className
      )}
      {...otherProps}
    >
      {children}
    </th>
  )
}

export default Th
