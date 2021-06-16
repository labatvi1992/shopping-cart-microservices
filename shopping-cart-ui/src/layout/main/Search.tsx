import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

export default function MainSearch(): JSX.Element {
    const onSearch = (value: string) => {
        console.log('search', value);
    };
    return (
        <div className="main-search">
            <Search
                className="main-search-input"
                allowClear
                placeholder="Tìm sản phẩm, danh mục ..."
                size="large"
                enterButton={<SearchOutlined className="main-search-addon-icon" />}
                onSearch={onSearch}
            />
        </div>
    );
}
