import { FC, useContext } from 'react';
import classnames from 'classnames';
import { Breadcrumb } from 'antd';
import { AppContext } from '../../AppContext';

const Breadcrumbs: FC = () => {
    const appContext = useContext(AppContext);
    const { breadcrumbs } = appContext || {};
    const children = (breadcrumbs || []).map((breadcrumb, index) => {
        const { text, route, icon } = breadcrumb || {};
        return (
            <Breadcrumb.Item
                key={index}
                className={classnames('app-breadcrumb-item', route ? 'app-breadcrumb-item-link' : '')}
                href={route}
            >
                {icon && <i className={`${icon}`} />}
                {text}
            </Breadcrumb.Item>
        );
    });
    return <Breadcrumb className="app-breadcrumb">{children}</Breadcrumb>;
};

export default Breadcrumbs;
