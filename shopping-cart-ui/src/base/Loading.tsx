import { FC } from 'react';
import { Spin } from 'antd';

const Loading: FC = () => {
    return (
        <div className="loading">
            <Spin size="large" />
        </div>
    );
};

export default Loading;
