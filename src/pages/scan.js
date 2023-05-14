import CheckSession from "@/web/components/CheckSession"
import FormField from "@/web/components/FormField"
import Page from "@/web/components/Page"
import Form from "@/web/components/Form"
import * as yup from "yup"
import { useContext, useState } from "react"
import formatOutput from "@/web/utils/formatOutput"
import { ArrowSmallLeftIcon } from "@heroicons/react/24/outline"
import AppContext from "@/web/components/AppContext"

const initialValues = {
  hostname: "",
  options: {
    scan: "",
    hostTimeout: "",
    maxRetries: "",
    fastScan: false,
    verbose: false,
  },
}

const validationSchema = yup.object().shape({
  hostname: yup.string().required().label("Hostname"),
  scan: yup.string().label("Password"),
})

const Scan = () => {
  const {
    actions: { addScan },
  } = useContext(AppContext)

  const [requestResult, setRequestResult] = useState(null)

  const handleClick = () => {
    setRequestResult(null)
  }

  const handleSubmit = async (values) => {
    const result = await addScan(values)
    setRequestResult(result)
  }

  return (
    <CheckSession>
      <Page>
        {requestResult ? (
          <div className="flex flex-col gap-10">
            <div className="bg-white p-8 rounded-lg flex flex-col gap-8">
              {formatOutput(requestResult)}
              <button
                onClick={handleClick}
                className="flex items-center gap-1 border-2 border-indigo-400 w-fit p-2 rounded-lg font-medium active:bg-indigo-400 active:text-white"
              >
                <ArrowSmallLeftIcon className="w-6" />
                BACK
              </button>
            </div>
          </div>
        ) : (
          <Form
            title="Scan"
            desc="Custom your command."
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <FormField name="hostname" label="nmap" placeholder="127.0.0.1" />
            <FormField
              name="options.scan"
              label="scan"
              as="select"
              className="truncate pr-8"
              select
            >
              <option value="">Default scan</option>
              <option value="-sS">TCP SYN</option>
              <option value="-sU">UDP Scan</option>
              <option value="-sV">
                Probe open ports to determine service/version info
              </option>
              <option value="-sP">Ping Scan</option>
              <option value="-sL">List Scan</option>
            </FormField>
            <FormField
              name="options.hostTimeout"
              label="--host-timeout"
              placeholder="30s"
            />
            <FormField
              name="options.maxRetries"
              label="--max-retries"
              placeholder="3"
            />
            <div className="flex gap-8">
              <FormField
                name="options.fastScan"
                label="FastScan"
                placeholder="3"
                type="checkbox"
                checkbox
              />
              <FormField
                name="options.verbose"
                label="Verbose"
                placeholder="3"
                type="checkbox"
                checkbox
              />
            </div>
          </Form>
        )}
      </Page>
    </CheckSession>
  )
}

export default Scan
