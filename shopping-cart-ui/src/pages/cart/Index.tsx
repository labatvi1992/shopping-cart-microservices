import { useCallback, useEffect, useState } from 'react';
import { Image, Form, Row, Col, Button, Input, InputNumber } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import {
    Api,
    Empty,
    formatNumber,
    getItemsFromCart,
    ICartItem,
    Loading,
    updateItemOnCart,
    removeItemFromCart,
    NOT_EMPTY,
    clearCartItems,
} from '../../base';

interface ICartState {
    loading: boolean;
    items?: ICartItem[];
    totalPrice?: number;
}

const ORDER_LIST_KEY = 'orderDetails';

const getCartItemIds = () => {
    return getItemsFromCart().map((item) => item.id);
};

const getCacheIds = (): Record<number | string, number> => {
    const cacheIds: Record<number | string, number> = {};
    getItemsFromCart().forEach((item) => {
        cacheIds[item.id] = item.count;
    });
    return cacheIds;
};

export default function Cart(): JSX.Element {
    const [form] = Form.useForm();

    const [data, setData] = useState<ICartState>({ loading: true });

    const recalculateState = useCallback(
        (cart?: ICartItem[]): ICartState => {
            const cacheIds = getCacheIds();
            let total = 0;
            const transform = cart?.map((item: ICartItem) => {
                const count = cacheIds[item.id];
                total += count * _.get(item, 'price');
                return _.assign({}, item, { count });
            });
            return { loading: false, items: transform, totalPrice: total };
        },
        [data],
    );

    const loadData = async () => {
        const ids = getCartItemIds();
        const response = await axios.get(`${Api.productApi}/get-by`, { params: { ids: ids.join(',') } });
        if (response?.status === 200) {
            const state = recalculateState(_.get(response, 'data.data', []));
            setData(() => {
                const fieldValues: Record<string, unknown> = {};
                _.set(fieldValues, ORDER_LIST_KEY, state.items);
                form.setFieldsValue(fieldValues);
                return state;
            });
        }
    };

    const handleValuesChange = (changes: Record<number, unknown>, values: Record<number, unknown>) => {
        if (_.get(changes, ORDER_LIST_KEY)) {
            const id = _.head(Object.keys(_.get(changes, ORDER_LIST_KEY)));
            if (!_.isEmpty(id)) {
                const count = _.get(changes, `${ORDER_LIST_KEY}.${id}.count`);
                const itemId = _.get(values, `${ORDER_LIST_KEY}.${id}.id`);
                const updateItem: ICartItem = {
                    id: `${itemId}`,
                    count: count,
                };
                updateItemOnCart(updateItem);
                const state = recalculateState(_.get(values, ORDER_LIST_KEY));
                setData(() => {
                    return state;
                });
            }
        }
    };

    const handleSubmit = async (values: any) => {
        const orderDetails = _.get(values, ORDER_LIST_KEY, []);
        const submitDetails = orderDetails.map((item: ICartItem) => {
            return {
                product: item.id,
                count: item.count,
                price: _.get(item, 'price'),
            };
        });
        const submitValues = _.assign({}, { customer: _.get(values, 'customer'), orderDetails: submitDetails });
        try {
            const response = await axios.post(`${Api.orderApi}`, submitValues);
            if (response?.status === 200) {
                console.log(response.data);
                form.resetFields();
                clearCartItems();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onOrderClicked = () => {
        form.submit();
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="cart-page">
            {data.loading && (
                <div className="mask-loading">
                    <Loading />
                </div>
            )}
            <div className="main-section">
                <div className="title">Giỏ hàng</div>
                <div className="body">
                    <Form
                        form={form}
                        name="order"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        onValuesChange={handleValuesChange}
                        onFinish={handleSubmit}
                    >
                        <Row>
                            <Col span={16}>
                                <div className="order-list">
                                    <Form.List name={ORDER_LIST_KEY}>
                                        {(fields, { remove }) => (
                                            <>
                                                {fields.map(({ key, name, fieldKey, ...restField }) => (
                                                    <div key={key} className="order-list-item">
                                                        <Form.Item {...restField} shouldUpdate={true}>
                                                            {({ getFieldValue }) => (
                                                                <Image
                                                                    src={getFieldValue([
                                                                        ORDER_LIST_KEY,
                                                                        name,
                                                                        'imageDefault',
                                                                    ])}
                                                                    className="product-image"
                                                                    width={100}
                                                                    height={100}
                                                                    preview={false}
                                                                />
                                                            )}
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...restField}
                                                            className="product-name"
                                                            shouldUpdate={true}
                                                        >
                                                            {({ getFieldValue }) => (
                                                                <a
                                                                    className="product-name-link"
                                                                    target="_blank"
                                                                    href={`/san-pham/${getFieldValue([
                                                                        ORDER_LIST_KEY,
                                                                        name,
                                                                        'categoryId',
                                                                    ])}/${getFieldValue([ORDER_LIST_KEY, name, 'id'])}`}
                                                                    rel="noreferrer"
                                                                >
                                                                    {getFieldValue([ORDER_LIST_KEY, name, 'name'])}
                                                                </a>
                                                            )}
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...restField}
                                                            label="Đơn giá"
                                                            className="product-price"
                                                            shouldUpdate={true}
                                                        >
                                                            {({ getFieldValue }) =>
                                                                `${formatNumber(
                                                                    getFieldValue([ORDER_LIST_KEY, name, 'price']) ?? 0,
                                                                )}đ`
                                                            }
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...restField}
                                                            label="Số lượng"
                                                            name={[name, 'count']}
                                                            fieldKey={[fieldKey, 'count']}
                                                        >
                                                            <InputNumber min={1} />
                                                        </Form.Item>
                                                        <Form.Item {...restField} shouldUpdate={true}>
                                                            {({ getFieldValue }) => (
                                                                <CloseCircleOutlined
                                                                    className="order-remove-item"
                                                                    onClick={() => {
                                                                        const removeItem: ICartItem = {
                                                                            id: `${getFieldValue([
                                                                                ORDER_LIST_KEY,
                                                                                name,
                                                                                'id',
                                                                            ])}`,
                                                                            count: getFieldValue([
                                                                                ORDER_LIST_KEY,
                                                                                name,
                                                                                'count',
                                                                            ]),
                                                                        };
                                                                        removeItemFromCart(removeItem);
                                                                        remove(name);
                                                                    }}
                                                                />
                                                            )}
                                                        </Form.Item>
                                                    </div>
                                                ))}
                                                {fields.length === 0 && <Empty text="Danh sách rỗng" />}
                                            </>
                                        )}
                                    </Form.List>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="order-calculate">
                                    <div className="order-calculate-title">Thành tiền</div>
                                    <div className="order-calculate-price">{formatNumber(data.totalPrice ?? 0)}đ</div>
                                    <div>(Đã bao gồm VAT)</div>
                                </div>
                                <div className="order-customer">
                                    <fieldset className="field-set">
                                        <legend>Thông tin khách hàng</legend>
                                        <Form.Item
                                            name={['customer', 'name']}
                                            label="Họ tên"
                                            rules={[{ required: true, message: NOT_EMPTY }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name={['customer', 'email']}
                                            label="Email"
                                            rules={[{ required: true, message: NOT_EMPTY }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name={['customer', 'phone']}
                                            label="Số điện thoại"
                                            rules={[{ required: true, message: NOT_EMPTY }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name={['customer', 'address']} label="Địa chỉ">
                                            <Input />
                                        </Form.Item>
                                        <div className="order-submit">
                                            <Button className="order-submit-button" onClick={onOrderClicked}>
                                                Tiến hành đặt hàng
                                            </Button>
                                        </div>
                                    </fieldset>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </div>
    );
}
