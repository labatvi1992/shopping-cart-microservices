import { Popover, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function MyAccount(): JSX.Element {
    const popoverContent = (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button className="login-button">Đăng nhập</Button>
            <Button className="register-button">Đăng ký</Button>
        </div>
    );
    return (
        <Popover content={popoverContent} overlayClassName="popover-my-account">
            <div className="my-account">
                <UserOutlined className="my-account-icon" />
                <div className="my-account-button">Tài khoản</div>
            </div>
        </Popover>
    );
}
