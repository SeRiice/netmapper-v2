import clsx from "clsx"
import { Form as FormikForm, Formik } from "formik"

const sizes = {
  normal: "max-w-sm",
}

const Form = (props) => {
  const {
    className,
    size = "normal",
    title,
    desc,
    error,
    fullPage,
    children,
    btnDesc = "SUBMIT",
    ...otherProps
  } = props

  return (
    <div
      className={clsx(
        fullPage
          ? "flex h-screen items-center justify-center bg-gradient-to-br from-indigo-200 to-indigo-400"
          : "flex justify-center"
      )}
    >
      <div
        className={clsx(
          "flex flex-col gap-8 bg-white p-8 rounded-lg w-full",
          sizes[size]
        )}
      >
        <div className="flex flex-col">
          {title && <label className="font-medium text-xl">{title}</label>}
          {desc && <label>{desc}</label>}
        </div>
        <Formik {...otherProps}>
          <FormikForm
            className={clsx("flex flex-col gap-2", className)}
            noValidate
          >
            {children}
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              className="py-2 text-xl mt-6 border-2 border-indigo-400 font-medium rounded-lg active:bg-indigo-400 active:text-white"
              type="submit"
            >
              {btnDesc}
            </button>
          </FormikForm>
        </Formik>
      </div>
    </div>
  )
}

export default Form
