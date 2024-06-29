import React from 'react'
import Footer from '@/components/Header/Footer'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Stack } from '@chakra-ui/react'
import Header from '@/components/Header/Header'
import ClientSummary from '@/components/Client/ClientSummary'
import ActiveInvoices from '@/components/Client/Invoices'
import Invoices from '@/components/Client/Invoices'
import AboutCompany from '@/components/Client/AboutCompany'
import ClientDashboard from '@/components/Client/ClientDashboard'


type Props = {}

function client({}: Props) {
  return (
    <>
        <Header/>        
        <ClientDashboard/>
        
   <Stack style={{marginTop:"150px", marginRight:"2.5rem"}}>
    <Tabs variant='soft-rounded' ml={10}>
      <TabList  >
        <Tab bg={"brand.ternary"}  _selected={{bg:"brand.quinary", color:"brand.primary"}}>Summary</Tab>
        <Tab bg={"brand.ternary"} mx="5"  _selected={{bg:"brand.quinary", color:"brand.primary"}}>Active Invoices</Tab>

        {/* Optional */}
        <Tab bg={"brand.ternary"}  _selected={{bg:"brand.quinary", color:"brand.primary"}}>About Company</Tab>

      </TabList>
      <TabPanels bg="brand.ternary" mt="10">
        <TabPanel>
            <ClientSummary/>
        </TabPanel>
        <TabPanel>
            <Invoices/>
        </TabPanel>
        <TabPanel>
            <AboutCompany/>
        </TabPanel>
      </TabPanels>
    </Tabs>
   </Stack>
    <div style={{ bottom:"0", width:"auto"}}>
        <Footer/>
    </div>
    
    </>
  )
}

export default client