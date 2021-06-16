import { ColumnsType } from 'antd/lib/table/Table';
import { BorderOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { IRecord } from '../../base/index';

function columnDef(): ColumnsType<IRecord> {
    return [
        {
            key: 'name',
            dataIndex: 'name',
            title: 'Họ tên',
            fixed: 'left',
            ellipsis: true,
            sorter: true,
        },
        {
            key: 'email',
            dataIndex: 'email',
            title: 'Email',
            width: 250,
            ellipsis: true,
            sorter: true,
        },
        {
            key: 'phone',
            dataIndex: 'phone',
            title: 'Số điện thoại',
            width: 120,
        },
        {
            key: 'address',
            dataIndex: 'address',
            title: 'Địa chỉ',
            width: 300,
        },
        {
            key: 'active',
            dataIndex: 'active',
            title: 'Kích hoạt',
            align: 'center',
            width: 120,
            ellipsis: true,
            sorter: true,
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
