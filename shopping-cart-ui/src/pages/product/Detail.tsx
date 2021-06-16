import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, InputNumber, Image } from 'antd';
import { addItemToCart, Api, formatNumber, ICartItem, IMG_NOT_FOUND, Loading } from '../../base';
import { IProductItem } from './interface';

interface IProductItemDetailState {
    loading: boolean;
    data: IProductItem | undefined;
}

export default function Detail(): JSX.Element {
    const params = useParams();

    const [data, setData] = useState<IProductItemDetailState>({ loading: true, data: undefined });
    const [form] = Form.useForm();
    const loadData = async (id: number) => {
        const response = await axios.get(`${Api.productApi}/${id}`);
        if (response?.status === 200) {
            const responseData = _.get(response, 'data.data', {});
            setData(() => {
                form.setFieldsValue(responseData);
                return {
                    loading: false,
                    data: responseData,
                };
            });
        }
    };

    const handleSubmit = (values: ICartItem) => {
        const submitValues: ICartItem = _.assign({}, values, { id: _.get(params, 'id', 0) });
        addItemToCart(submitValues);
    };

    useEffect(() => {
        loadData(_.get(params, 'id', 0));
    }, []);

    return (
        <div className="product-detail-page">
            {data.loading && (
                <div className="mask-loading">
                    <Loading />
                </div>
            )}
            <Form form={form} onFinish={handleSubmit}>
                <div className="product-overview">
                    <div className="image-gallery">
                        <Form.Item shouldUpdate={true}>
                            {({ getFieldValue }) => (
                                <Image src={getFieldValue(['imageDefault']) ?? IMG_NOT_FOUND} alt="" preview={false} />
                            )}
                        </Form.Item>
                    </div>
                    <div className="main-section">
                        <div className="title">
                            <Form.Item shouldUpdate={true}>
                                {({ getFieldValue }) => <div className="product-name">{getFieldValue(['name'])}</div>}
                            </Form.Item>
                            <div className="product-status">Còn hàng</div>
                        </div>
                        <div className="body">
                            <Form.Item shouldUpdate={true}>
                                {({ getFieldValue }) => (
                                    <div className="product-price">{`${formatNumber(
                                        getFieldValue(['price']) ?? 0,
                                    )}đ`}</div>
                                )}
                            </Form.Item>
                            <Form.Item className="product-buy-count" name="count" label="Số lượng" initialValue={1}>
                                <InputNumber min={0} style={{ width: 90 }} />
                            </Form.Item>
                            <Form.Item>
                                <Button className="btn-buy" size="large" onClick={() => form.submit()}>
                                    Chọn mua
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
}
