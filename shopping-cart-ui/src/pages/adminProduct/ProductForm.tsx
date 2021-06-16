import { useEffect, useState } from 'react';
import { Form, Input, Checkbox, InputNumber, Select } from 'antd';
import { NOT_EMPTY, IForm, Api } from '../../base';

function formDef(prop: IForm): JSX.Element {
    const [dataOption, setDataOption] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, form } = prop || {};
                const requests = [axios.get(Api.categoryApi)];
                if (data && data.key) {
                    requests.push(axios.get(`${Api.productApi}/${data.key}`));
                }
                const [responseCategory, responseCustomer] = await axios.all(requests);
                if (responseCategory?.status === 200) {
                    const options = (_.get(responseCategory, 'data.data') || []).map((item: unknown) =>
                        _.assign({
                            label: _.get(item, 'name'),
                            value: _.get(item, 'id'),
                        }),
                    );
                    setDataOption(options);
                }
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
            <Form.Item name="code" label="Mã sản phẩm" rules={[{ required: true, message: NOT_EMPTY }]}>
                <Input />
            </Form.Item>
            <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true, message: NOT_EMPTY }]}>
                <Input />
            </Form.Item>
            <Form.Item name="imageDefault" label="Hình mặc định">
                <Input />
            </Form.Item>
            <Form.Item name="price" label="Giá sản phẩm">
                <InputNumber min={0} style={{ flex: 1 }} />
            </Form.Item>
            <Form.Item name="categoryId" label="Danh mục">
                <Select options={dataOption} />
            </Form.Item>
            <Form.Item name="active" label="Kích hoạt" valuePropName="checked" initialValue={true}>
                <Checkbox />
            </Form.Item>
        </>
    );
}

export default formDef;
