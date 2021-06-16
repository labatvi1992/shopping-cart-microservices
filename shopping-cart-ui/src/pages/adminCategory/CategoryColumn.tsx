import { ColumnsType } from 'antd/lib/table/Table';
import { BorderOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { IRecord, FilterInput } from '../../base';

function columnDef(): ColumnsType<IRecord> {
    return [
        {
            key: 'name',
            dataIndex: 'name',
            title: 'Tên danh mục',
            fixed: 'left',
            ellipsis: true,
            sorter: true,
            filterDropdown: FilterInput,
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
