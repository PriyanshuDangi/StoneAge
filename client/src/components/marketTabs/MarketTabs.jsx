import React from 'react';
import { Nav, Button } from 'react-bootstrap';

const MarketTabs = (props) => {
    return (
        <Nav className="justify-content-center mb-3" variant="tabs">
            {props.tabList.map((tab, index) => {
                return (
                    <Nav.Item key={index}>
                        <Nav.Link
                            as={'button'}
                            onClick={() => props.setCurrentTab(index)}
                            active={index == props.currentTab}
                        >
                            {tab}
                        </Nav.Link>
                    </Nav.Item>
                );
            })}
        </Nav>
    );
};

export default MarketTabs;
