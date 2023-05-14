import clsx from "clsx"
import { ErrorMessage, Field } from "formik"

const FormField = (props) => {
  const { className, name, label, select, checkbox, ...otherProps } = props

  if (checkbox) {
    return (
      <div className="flex items-center gap-2">
        <Field
          name={name}
          className="focus:ring-0 border-2 border-indigo-400 text-indigo-500 rounded-md"
          {...otherProps}
        />
        <label className="font-medium whitespace-nowrap">{label}</label>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-center border-2 border-indigo-400 rounded-lg">
          <label className="font-medium whitespace-nowrap pl-2">{label}</label>
          <Field
            className={clsx(
              select
                ? "px-2 py-1 w-full border-0 border-l-2 border-indigo-400 rounded-r-lg focus:ring-0 focus:border-indigo-400"
                : "px-2 py-1 outline-none border-0 border-l-2 border-indigo-400 w-full rounded-r-lg focus:ring-0 focus:border-indigo-400",
              className
            )}
            name={name}
            {...otherProps}
          />
        </div>
        <ErrorMessage
          component="p"
          name={name}
          className="text-sm text-red-500"
        />
      </div>
    )
  }
}

export default FormField
