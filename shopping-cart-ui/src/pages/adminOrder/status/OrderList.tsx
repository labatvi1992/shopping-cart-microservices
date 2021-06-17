import { Table } from 'antd';
import { Empty } from '../../../base';
import { IOrderListProp } from '../interface';

export default function OrderList(prop: IOrderListProp): JSX.Element {
    return (
        <Table
            {...prop}
            locale={{
                emptyText: Empty,
            }}
            scroll={{ y: 300 }}
            pagination={false}
            expandable={{ defaultExpandAllRows: true }}
        />
    );
}
