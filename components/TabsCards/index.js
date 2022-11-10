import {Tab, TabList, TabPanel, Tabs} from "react-tabs";

import tabsInfo from "../../public/DB/SHOP_DATA.json";

import "react-tabs/style/react-tabs.css";
import classes from './tabsCards.module.scss';

const TabsCards = () => {
    return (
        <Tabs className={classes["tabs"]}>
            <TabList className={classes['tabs__list']}>
                {tabsInfo.map(tab => <Tab className={classes['tabs__list-item']} key={tab.title}><span>{tab.title}</span></Tab>)}
            </TabList>
            {tabsInfo.map((tab, i) => <TabPanel className={classes['tabs__panel']} key={tab.title + i}>
                {tab.content.map(item => <p key={item.id}>{item.title}</p>)}
            </TabPanel>)}
        </Tabs>
    );
};

export default TabsCards;