import { Input } from 'antd';
import { ColumnsType } from 'antd/lib/table/Table';
import { useEffect } from 'react';
import { Api, IRecord } from '../../../base';
import { IOrderProp } from '../interface';
import OrderList from './OrderList';

const columns: ColumnsType<IRecord> = [];

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
            <div className="new-order-filter">
                <fieldset className="field-set">
                    <legend>Tìm kiếm theo tiêu chí</legend>
                    <Input />
                </fieldset>
            </div>
            <div className="new-order-grid">
                <OrderList columns={columns} />
            </div>
        </div>
    );
}
