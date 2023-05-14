import AppContext from "@/web/components/AppContext"
import Form from "@/web/components/Form"
import FormField from "@/web/components/FormField"
import { useRouter } from "next/router"
import { useContext } from "react"
import * as yup from "yup"

const initialValues = {
  email: "",
  password: "",
}

const validationSchema = yup.object().shape({
  email: yup.string().email().required().label("E-mail"),
  password: yup.string().required().label("Password"),
})

const SignIn = () => {
  const router = useRouter()

  const {
    actions: { signIn },
  } = useContext(AppContext)

  const handleSubmit = async (values, { resetForm }) => {
    const [err] = await signIn(values)

    if (!err) {
      router.push("/")

      return
    } else {
      resetForm()
    }
  }

  return (
    <Form
      title="Sign-in"
      desc="Enter your credentials."
      fullPage
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <FormField
        name="email"
        label="E-mail"
        type="email"
        placeholder="bruno@netmapper.com"
      />
      <FormField
        name="password"
        label="Password"
        type="password"
        placeholder="P@$$w0rd"
      />
    </Form>
  )
}

export default SignIn
