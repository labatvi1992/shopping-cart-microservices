import { Col, Form, Input, Row } from 'antd';
import { Api, GridApi, IBreadcrumbItem } from '../../base';
import ColumnDef from './CustomerColumn';
import FormDef from './FormDef';

interface ICustomerGridProp {
    breadcrumbs: IBreadcrumbItem[];
}

export default function CustomerGrid(prop: ICustomerGridProp): JSX.Element {
    return (
        <GridApi
            breadcrumbs={prop.breadcrumbs}
            api={Api.customerApi}
            name="Khách hàng"
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
                            <Form.Item name="name" label="Tên khách hàng">
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
