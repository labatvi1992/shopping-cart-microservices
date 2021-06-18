import { Form, FormInstance, Input } from 'antd';
import { IRecord } from '../../../base';

export default function formDef(form: FormInstance, data?: IRecord): JSX.Element {
    return (
        <>
            <Form.Item name="createdBy" label="Tạo bởi">
                <Input />
            </Form.Item>
        </>
    );
}
