import { Layout, Row, Col, Form, Input, Button, BackTop } from 'antd';
import { ShoppingCartOutlined, ArrowUpOutlined } from '@ant-design/icons';
import Slogan from './Slogan';

const { Header, Content, Footer } = Layout;

interface IMainLayout {
    children: React.ReactNode;
}

export function MainLayout(prop: IMainLayout): JSX.Element {
    const { children } = prop || {};
    return (
        <Layout className="main-layout">
            <Header className="main-header">
                <Slogan
                    logo={<ShoppingCartOutlined className="main-slogan-icon" />}
                    name="Mua Rẻ"
                    description="Online Shopping Cart"
                />
            </Header>
            <Content className="main-content">
                <div className="main-content-children">{children}</div>
                <Footer className="main-footer">
                    <Row className="main-footer-introduction" gutter={16}>
                        <Col span={16} className="col-intro">
                            <p className="col-intro-title">Giới thiệu về chúng tôi</p>
                            <p>
                                Mua rẻ là một hệ sinh thái thương mại tất cả trong một, gồm các công ty thành viên như:
                            </p>
                            <ul>
                                <li>Mua rẻ delivery cung cấp dịch vụ đưa sản phẩm đến tận tay người tiêu dùng;</li>
                                <li>Mua rẻ service mang đến dịch vụ vé sự kiện, xem phim hàng đầu;</li>
                            </ul>
                            <p>
                                Với phương châm hoạt động “Tất cả vì Khách Hàng”, Mua Rẻ luôn không ngừng nỗ lực nâng
                                cao chất lượng dịch vụ và sản phẩm, từ đó mang đến trải nghiệm mua sắm trọn vẹn cho
                                Khách Hàng Việt Nam, cùng cam kết cung cấp hàng chính hãng với chính sách hoàn tiền 111%
                                nếu phát hiện hàng giả, hàng nhái.
                            </p>
                        </Col>
                        <Col span={8} className="introduction">
                            <p className="col-intro-title">Đăng ký nhận bản tin</p>
                            <p>Đừng bỏ lỡ hàng ngàn sản phẩm và chương trình siêu hấp dẫn</p>
                            <Form className="subcribe-form" layout="inline">
                                <i className="fa fa-envelope-open-o subcribe-icon" />
                                <Form.Item label="Email">
                                    <Input placeholder="Nhập địa chỉ Email" />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary">Đăng ký</Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div className="footer-copy-right">© 2021 Shopping Cart. All Rights Reserved.</div>
                        </Col>
                    </Row>
                </Footer>
            </Content>
            <BackTop>
                <ArrowUpOutlined className="back-top-button" />
            </BackTop>
        </Layout>
    );
}
