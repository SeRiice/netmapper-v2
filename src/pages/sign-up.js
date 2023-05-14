import AppContext from "@/web/components/AppContext"
import Form from "@/web/components/Form"
import FormField from "@/web/components/FormField"
import api from "@/web/services/api"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import * as yup from "yup"

const initialValues = {
  username: "",
  email: "",
  password: "",
}

const validationSchema = yup.object().shape({
  username: yup.string().required().label("Username"),
  email: yup.string().email().required().label("E-mail"),
  password: yup.string().min(8).required().label("Password"),
})

const SignUp = () => {
  const router = useRouter()

  const {
    actions: { signIn },
  } = useContext(AppContext)

  const [error, setError] = useState(false)

  const handleSubmit = async (values) => {
    const {
      data: { result },
    } = await api.post("/sign-up", values)

    if (!result) {
      setError("E-mail already exists.")

      return
    }

    await signIn(values)
    router.push("/")
  }

  return (
    <Form
      title="Sign-up"
      desc="Let's create your account."
      fullPage
      error={error}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <FormField
        name="username"
        label="Username"
        type="text"
        placeholder="Bruno"
      />
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

export default SignUp
