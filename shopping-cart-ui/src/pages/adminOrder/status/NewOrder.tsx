import { Row, Col, Form, Input, DatePicker } from 'antd';
import { ColumnsType } from 'antd/lib/table/Table';
import { useEffect } from 'react';
import { Api, GridApi, IRecord } from '../../../base';
import { IOrderProp } from '../interface';
import FormDef from './NewOrderForm';

const { RangePicker } = DatePicker;

const columns: ColumnsType<IRecord> = [
    {
        key: 'createdDate',
        dataIndex: 'createdDate',
        title: 'Ngày tạo',
        fixed: 'left',
    },
    {
        key: 'createdBy',
        dataIndex: 'createdBy',
        title: 'Tạo bởi',
    },
];

export default function NewOrder(prop: IOrderProp): JSX.Element {
    const { type } = prop || {};
    const loadData = async () => {
        try {
            const response = await axios.get(`${Api.orderApi}`, {
                params: {
                    type,
                },
            });
            if (response?.status === 200) {
                console.log(response.data);
            }
        } catch (error) {}
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="new-order-view">
            <GridApi
                api={Api.orderApi}
                name="Đơn hàng"
                filterHeader="Tìm kiếm nâng cao"
                filterOptions={{
                    labelAlign: 'left',
                    labelCol: { span: 3 },
                }}
                renderFilterBody={(): JSX.Element => {
                    return (
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="createdDate" label="Ngày tạo">
                                    <RangePicker />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="createdBy" label="Tạo bởi">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    );
                }}
                gridOptions={{
                    columns,
                }}
                renderFormBody={FormDef}
            />
        </div>
    );
}
