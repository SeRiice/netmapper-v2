import CheckSession from "@/web/components/CheckSession"
import Page from "@/web/components/Page"
import api from "@/web/services/api"
import formatDate from "@/web/utils/formatDate"
import formatOptions from "@/web/utils/formatOptions"
import formatOutput from "@/web/utils/formatOutput"
import { useEffect, useState } from "react"

export const getServerSideProps = async ({ params }) => {
  return {
    props: { params },
  }
}

const ScanId = (props) => {
  const {
    params: { scanId },
  } = props

  const [scan, setScan] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const {
          data: { result },
        } = await api.get(`/scan/${scanId}`)
        setScan(result)
      } catch (err) {
        return
      }
    })()
  }, [scanId])

  return (
    <CheckSession>
      <Page>
        {scan && (
          <div className="flex flex-col gap-4 bg-white p-8 rounded-lg">
            <p>
              {`>`} <span className="text-indigo-400">nmap</span>{" "}
              {`${
                formatOptions(scan.options) === 0
                  ? ""
                  : formatOptions(scan.options)
              } ${scan.hostname}`}
            </p>
            <div>{formatOutput(scan.output)}</div>
            <p>{`> Scan ended on ${formatDate(
              new Date(scan.updatedAt),
              "long",
              "medium"
            )}`}</p>
          </div>
        )}
      </Page>
    </CheckSession>
  )
}

export default ScanId
