import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Image from "next/image";


const UITabs = ({tabsInfo}) => (
  <Tabs>
    <TabList className='react-tabs__tab-list'>
        {tabsInfo.map(tab => <Tab className='react-tabs__tab' key={tab.title}><span>{tab.title}</span></Tab>)}
    </TabList>

    {tabsInfo.map((tab, i) => <TabPanel key={tab.title + i}>
      {tab.title === 'Уход' ? <Image src={tab.content} width={440} height={300}  objectFit='contain' priority alt="care instructions"/> : <p className='react-tabs__content'>{tab.content}</p>}
    </TabPanel>)}
  </Tabs>
);

export default UITabs;