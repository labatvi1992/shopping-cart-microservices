import { FC } from 'react';
import classNames from 'classnames';
import { Empty } from 'antd';

interface IEmpty {
    className?: string;
    text?: string;
}

const CustomEmpty: FC<IEmpty> = (prop: IEmpty) => {
    const { className, text } = prop || {};
    return (
        <Empty
            className={classNames('empty-text', className)}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>{text || 'Không có dữ liệu'}</span>}
        />
    );
};

export default CustomEmpty;
