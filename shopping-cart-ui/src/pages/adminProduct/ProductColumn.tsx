import { ColumnsType } from 'antd/lib/table/Table';
import { BorderOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { formatNumber, IRecord } from '../../base';

function columnDef(): ColumnsType<IRecord> {
    return [
        {
            key: 'name',
            dataIndex: 'name',
            title: 'Tên sản phẩm',
            fixed: 'left',
        },
        {
            key: 'price',
            dataIndex: 'price',
            title: 'Giá',
            width: 200,
            render: function renderPrice(value: number) {
                return `${formatNumber(value ?? 0)}đ`;
            },
        },
        {
            key: 'active',
            dataIndex: 'active',
            title: 'Kích hoạt',
            align: 'center',
            width: 120,
            render: function renderActive(value: boolean) {
                const iconStyle = {
                    fontSize: 20,
                };
                return value ? <CheckSquareOutlined style={iconStyle} /> : <BorderOutlined style={iconStyle} />;
            },
        },
    ];
}

export default columnDef;
