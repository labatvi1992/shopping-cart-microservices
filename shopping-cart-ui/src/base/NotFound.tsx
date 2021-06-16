import { FC, useContext, useEffect } from 'react';
import { AppContext } from '../AppContext';
import { homeItem } from './Common';
import Empty from './Empty';

const NotFound: FC = (): JSX.Element => {
    const appContext = useContext(AppContext);
    const { setBreadcrumbs } = appContext || {};

    useEffect(() => {
        setBreadcrumbs && setBreadcrumbs([homeItem]);
    }, []);

    return (
        <div className="app-not-found">
            <Empty text="Không tìm thấy đường dẫn" />
        </div>
    );
};

export default NotFound;
