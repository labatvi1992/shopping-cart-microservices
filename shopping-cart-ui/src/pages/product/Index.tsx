import { FC, useEffect, useMemo, useState } from 'react';
import { List, Row, Col, Image } from 'antd';
import { useHistory } from 'react-router-dom';
import { Api, formatNumber, IMG_NOT_FOUND } from '../../base';
import { ICategoryItem, IProductItem } from './interface';

const Product: FC = () => {
    const history = useHistory();
    const [categoryData, setCategoryData] = useState<{ loading: boolean; data?: ICategoryItem[] }>({ loading: true });
    const [productData, setProductData] = useState<{ loading: boolean; data?: IProductItem[] }>({ loading: true });

    const loadData = async () => {
        const requests = [axios.get(Api.categoryApi), axios.get(Api.productApi)];
        const [responseCategory, responseProduct] = await axios.all(requests);
        if (responseCategory?.status === 200) {
            setCategoryData({ loading: false, data: _.get(responseCategory, 'data.data') });
        }
        if (responseProduct?.status === 200) {
            setProductData({ loading: false, data: _.get(responseProduct, 'data.data') });
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const goToDetail = (item: IProductItem) => {
        const { id, categoryId } = item || {};
        history && history.push(`/san-pham/${categoryId}/${id}`);
    };

    return (
        <div className="product-page">
            <Row gutter={16}>
                <Col span={6}>
                    <div className="category-list">
                        <div className="main-section">
                            <div className="title">Danh mục sản phẩm</div>
                            <div className="body">
                                {useMemo(
                                    () => (
                                        <List
                                            loading={categoryData.loading}
                                            dataSource={categoryData.data}
                                            renderItem={(item) => (
                                                <List.Item key={item.id}>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        {item.name}
                                                    </div>
                                                </List.Item>
                                            )}
                                        />
                                    ),
                                    [categoryData],
                                )}
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={18}>
                    <div className="main-section">
                        <div className="title">Sản phẩm</div>
                        <div className="body product-list">
                            {useMemo(
                                () => (
                                    <List
                                        grid={{
                                            gutter: 0,
                                            xs: 1,
                                            sm: 2,
                                            md: 4,
                                            lg: 4,
                                            xl: 4,
                                            xxl: 4,
                                        }}
                                        loading={productData.loading}
                                        dataSource={productData.data}
                                        renderItem={(item: IProductItem) => (
                                            <List.Item
                                                key={item.id}
                                                className="product-item"
                                                onClick={() => goToDetail(item)}
                                            >
                                                <div
                                                    className="product-body"
                                                    style={{
                                                        flex: 1,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Image
                                                        src={item.imageDefault}
                                                        alt=""
                                                        fallback={IMG_NOT_FOUND}
                                                        preview={false}
                                                    />
                                                </div>
                                                <div className="product-footer">
                                                    <div className="product-name">{item.name}</div>
                                                    <div className="product-price">
                                                        {formatNumber(item.price ?? 0)}đ
                                                    </div>
                                                </div>
                                            </List.Item>
                                        )}
                                    />
                                ),
                                [productData],
                            )}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Product;
