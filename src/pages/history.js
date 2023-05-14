import CheckSession from "@/web/components/CheckSession"
import Page from "@/web/components/Page"
import Th from "@/web/components/Th"
import api from "@/web/services/api"
import formatDate from "@/web/utils/formatDate"
import { useEffect, useState } from "react"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import Td from "@/web/components/Td"
import CustomLink from "@/web/components/CustomLink"
import formatOptions from "@/web/utils/formatOptions"

const History = () => {
  const [scans, setScans] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const {
          data: { result },
        } = await api.get("/scan")

        setScans(result)
      } catch (err) {
        return
      }
    })()
  }, [])

  return (
    <CheckSession>
      <Page variant="large">
        <table className="w-full border-separate border-spacing-y-2 bg-white p-8 rounded-lg">
          <thead>
            <tr className="text-left">
              <Th className="w-2/12 rounded-l-lg">DATE</Th>
              <Th className="w-2/12">HOSTNAME</Th>
              <Th className="w-2/12">OPTIONS</Th>
              <Th className="w-5/12">OUTPUT</Th>
              <Th className="w-1/12 rounded-r-lg"></Th>
            </tr>
          </thead>
          <tbody>
            {scans.map((scan) => {
              return (
                <tr key={scan._id} className="even:bg-indigo-100 rounded-lg">
                  <Td className="rounded-l-lg">
                    {formatDate(new Date(scan.updatedAt))}
                  </Td>
                  <Td>{scan.hostname}</Td>
                  <Td>
                    {formatOptions(scan.options) === 0
                      ? "No options"
                      : formatOptions(scan.options)}
                  </Td>
                  <Td>{scan.output}</Td>
                  <Td className="rounded-r-lg">
                    <CustomLink
                      href={`/scan/${scan._id}`}
                      variant="notStyled"
                      className="flex justify-center"
                    >
                      <InformationCircleIcon className="w-6" />
                    </CustomLink>
                  </Td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Page>
    </CheckSession>
  )
}

export default History
