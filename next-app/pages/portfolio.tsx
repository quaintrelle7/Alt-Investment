import CommonHeader from '@/components/Header/CommonHeader'
import Footer from '@/components/Header/Footer'
import InvestmentSummary from '@/components/Portfolio/InvestmentSummary'
import PortfolioTable from '@/components/Portfolio/PortfolioTable'
import React from 'react'
import UserDashboard from '@/components/Portfolio/UserDashboard'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react'
import InvestmentHistory from '@/components/Portfolio/InvestmentHistory'

function portfolio() {
  return (
    <>
    <CommonHeader/>        
    <UserDashboard/>

   <div style={{marginTop:"150px", marginRight:"2.5rem"}}>
    <Tabs variant='soft-rounded' ml={10}>
      <TabList  >
        <Tab bg={"brand.ternary"}  _selected={{bg:"brand.quinary", color:"brand.primary"}}>Summary</Tab>
        <Tab bg={"brand.ternary"} mx="5"  _selected={{bg:"brand.quinary", color:"brand.primary"}}>Holdings</Tab>
        <Tab bg={"brand.ternary"}  _selected={{bg:"brand.quinary", color:"brand.primary"}}>History</Tab>
      </TabList>
      <TabPanels bg="brand.ternary" mt="10">
        <TabPanel>
            <InvestmentSummary/>
        </TabPanel>
        <TabPanel>
            <PortfolioTable/>
        </TabPanel>
        <TabPanel>
            <InvestmentHistory/>
        </TabPanel>
      </TabPanels>
    </Tabs>
   </div>
    <div style={{ bottom:"0", width:"100%"}}>
        <Footer/>
    </div>
    </>
  )
}

export default portfolio