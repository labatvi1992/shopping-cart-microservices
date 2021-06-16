import { Input } from 'antd';
import { FilterDropdownProps } from 'antd/lib/table/interface';

export function FilterInput(prop: FilterDropdownProps): JSX.Element {
    const { setSelectedKeys, confirm } = prop || {};

    const onChange = _.debounce((value: string | undefined) => {
        setSelectedKeys(value ? [value] : []);
        confirm({ closeDropdown: false });
    }, 300);

    return (
        <div style={{ display: 'flex', alignItems: 'center', padding: 8 }}>
            <Input allowClear placeholder="Tìm kiếm" suffix={false} onChange={(e) => onChange(e.target.value)} />
        </div>
    );
}
