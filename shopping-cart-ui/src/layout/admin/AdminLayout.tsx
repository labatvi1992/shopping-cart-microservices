import React, { FC } from 'react';
import { Layout } from 'antd';
import Breadcrumb from './Breadcrumb';
import SideMenu from './SideMenu';
import SideMenuData from './SideMenuData';

const { Header, Content, Footer } = Layout;

interface IAdminLayout {
    children: React.ReactNode;
}

export const AdminLayout: FC<IAdminLayout> = (prop: IAdminLayout) => {
    const { children } = prop || {};
    return (
        <Layout className="app-layout">
            <SideMenu data={SideMenuData} />
            <Layout className="site-layout">
                <Header className="app-header">
                    <div className="app-addresses">
                        <Breadcrumb />
                    </div>
                </Header>
                <Content className="site-content">
                    <div className="site-content-layout">{children}</div>
                </Content>
                <Footer className="app-footer">© 2021 Shopping Cart. All Rights Reserved.</Footer>
            </Layout>
        </Layout>
    );
};
