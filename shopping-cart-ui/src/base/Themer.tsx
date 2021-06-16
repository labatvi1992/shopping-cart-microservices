import { FC, useEffect, useState } from 'react';
import { Popover, Button } from 'antd';

const Themer: FC = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme'));

    useEffect(() => {
        switch (theme) {
            case 'dark':
                localStorage.setItem('theme', 'dark');
                document.body.classList.add('dark-theme');
                break;
            case 'default':
            default:
                localStorage.setItem('theme', 'light');
                document.body.classList.remove('dark-theme');
                break;
        }
    }, [theme]);

    const onChange = (type: string) => {
        setTheme(type);
    };

    const popupContent = (
        <div className="popover-change-theme-container">
            <div onClick={() => onChange('light')} className={theme !== 'dark' ? 'selected' : ''}>
                Light theme
            </div>
            <div onClick={() => onChange('dark')} className={theme === 'dark' ? 'selected' : ''}>
                Dark theme
            </div>
        </div>
    );

    return (
        <Popover content={popupContent} className="popover-change-theme" placement="left">
            <Button className="button-change-theme">
                <i className="fa fa-cogs" />
            </Button>
        </Popover>
    );
};

export default Themer;
