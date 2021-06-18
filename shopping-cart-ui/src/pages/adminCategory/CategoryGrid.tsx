import { Api, GridApi, IBreadcrumbItem } from '../../base';
import ColumnDef from './CategoryColumn';
import FormDef from './FormDef';
import { Col, Form, Input, Row } from 'antd';

interface ICategoryGridProp {
    breadcrumbs: IBreadcrumbItem[];
}

export default function CategoryGrid(prop: ICategoryGridProp): JSX.Element {
    return (
        <GridApi
            breadcrumbs={prop.breadcrumbs}
            api={Api.productApi}
            name="Danh mục"
            filterHeader="Tìm kiếm nâng cao"
            filterOptions={{
                labelAlign: 'left',
                labelCol: { span: 3 },
            }}
            renderFilterBody={(): JSX.Element => {
                return (
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="name" label="Tên danh mục">
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
