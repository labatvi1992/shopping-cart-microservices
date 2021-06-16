import { Form, Input } from 'antd';
import { NOT_EMPTY } from '../../base';

function formDef(): JSX.Element {
    return (
        <>
            <Form.Item name="name" label="Họ tên" rules={[{ required: true, message: NOT_EMPTY }]}>
                <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, message: NOT_EMPTY }]}>
                <Input />
            </Form.Item>
            <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: NOT_EMPTY }]}>
                <Input />
            </Form.Item>
            <Form.Item name="address" label="Địa chỉ">
                <Input />
            </Form.Item>
        </>
    );
}

export default formDef;
