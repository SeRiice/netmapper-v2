import CheckSession from "@/web/components/CheckSession"
import Page from "@/web/components/Page"

const Index = () => {
  return (
    <CheckSession>
      <Page>
        <p className="text-xl ">
          {
            "> Welcome to your Netmapper! Here you can perform nmap commands and view your command history."
          }
        </p>
      </Page>
    </CheckSession>
  )
}

export default Index
