import { useEffect } from 'react';
import { Form, Input, Checkbox } from 'antd';
import { NOT_EMPTY, IForm, Api } from '../../base';

function formDef(prop: IForm): JSX.Element {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, form } = prop || {};
                const requests = [];
                if (data && data.key) {
                    requests.push(axios.get(`${Api.customerApi}/${data.key}`));
                }
                const [responseCustomer] = await axios.all(requests);
                if (responseCustomer?.status === 200) {
                    form.setFieldsValue(_.get(responseCustomer, 'data.data'));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [prop]);
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
            <Form.Item name="active" label="Kích hoạt" valuePropName="checked" initialValue={true}>
                <Checkbox />
            </Form.Item>
        </>
    );
}

export default formDef;
