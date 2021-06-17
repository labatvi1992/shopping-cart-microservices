import { useContext, useEffect } from 'react';
import { Tabs } from 'antd';
import { FitContent, IBreadcrumbItem } from '../../base';
import { AppContext } from '../../AppContext';
import NewOrder from './status/NewOrder';

const { TabPane } = Tabs;

interface IOrderViewProp {
    breadcrumbs: IBreadcrumbItem[];
}

export default function OrderView(prop: IOrderViewProp): JSX.Element {
    const { breadcrumbs } = prop || {};
    const appContext = useContext(AppContext);
    const { setBreadcrumbs } = appContext || {};

    useEffect(() => {
        setBreadcrumbs && setBreadcrumbs(breadcrumbs);
    }, []);

    const renderTab = (): JSX.Element => {
        const onChange = (key: string) => {
            console.log(key);
        };

        return (
            <Tabs defaultActiveKey="1" onChange={onChange}>
                <TabPane tab="Đơn hàng mới" key="created">
                    <NewOrder type="created" />
                </TabPane>
                <TabPane tab="Đang xử lý" key="processing">
                    Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Đã duyệt" key="approved">
                    Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Đang vận chuyển" key="delivery">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        );
    };

    return (
        <FitContent>
            {(height) => (
                <div className="order-view" style={{ height }}>
                    {renderTab()}
                </div>
            )}
        </FitContent>
    );
}
