import { TableProps } from 'antd';
import { IRecord } from '../../base';

export interface IOrderProp {
    type: 'created' | 'processing' | 'approved' | 'delivery';
}

export type IOrderListProp = TableProps<IRecord>;
