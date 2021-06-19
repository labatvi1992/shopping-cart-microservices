import { Row, Col, Form, Input } from 'antd';
import { Api, IBreadcrumbItem, GridApi } from '../../base';
import ColumnDef from './ProductColumn';
import FormDef from './FormDef';

interface IProductGridProp {
    breadcrumbs: IBreadcrumbItem[];
}

export default function ProductGrid(prop: IProductGridProp): JSX.Element {
    return (
        <GridApi
            breadcrumbs={prop.breadcrumbs}
            api={Api.productApi}
            name="Sản phẩm"
            filterHeader="Tìm kiếm nâng cao"
            filterOptions={{
                labelAlign: 'left',
                labelCol: { span: 6 },
                wrapperCol: { span: 18 },
            }}
            renderFilterBody={(): JSX.Element => {
                return (
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="name" label="Tên sản phẩm">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="categoryId" label="Danh mục">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                );
            }}
            gridOptions={{
                columns: ColumnDef(),
            }}
            renderFormBody={FormDef}
            onSaveForm={(api: string, state: string | undefined, values: unknown) => {
                if (state === 'create') {
                    return axios.post(api, values);
                }
                return axios.put(api, values);
            }}
            onSubmitData={(values) => _.assign({}, values, { id: _.get(values, 'key') })}
        />
    );
}
