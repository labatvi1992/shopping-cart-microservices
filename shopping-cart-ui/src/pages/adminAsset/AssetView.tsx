import { useContext, useEffect, useMemo, useState } from 'react';
import { Row, Col, notification } from 'antd';
import { IAssetGroupItem, IAssetItem } from './interface';
import { FitContent, Api, IBreadcrumbItem } from '../../base';
import { AppContext } from '../../AppContext';
import AssetGroup from './AssetGroup';
import AssetGallery from './AssetGallery';

interface IAssetViewProp {
    breadcrumbs: IBreadcrumbItem[];
}

interface IAssetViewState {
    group: number | undefined;
    groups: {
        loading: boolean;
        data: IAssetGroupItem[];
    };
    items: {
        loading: boolean;
        data: IAssetItem[];
    };
}

const initGroup = { loading: true, data: [] };
const initItem = { loading: true, data: [] };

export default function AssetView(prop: IAssetViewProp): JSX.Element {
    const { breadcrumbs } = prop || {};
    const appContext = useContext(AppContext);
    const { setBreadcrumbs } = appContext || {};

    const [data, setData] = useState<IAssetViewState>({
        group: undefined,
        groups: initGroup,
        items: initItem,
    });

    const loadGroup = async () => {
        try {
            setData(_.assign({}, data, { groups: initGroup }));
            const response = await axios.get(`${Api.fileGroupApi}`);
            if (response?.status === 200) {
                const groups = _.get(response, 'data.data', []) || [];
                const groupId = _.get(_.head(groups), 'id');
                const newData = _.assign({}, data, { group: groupId, groups: { loading: false, data: groups } });
                setData(newData);
                if (_.isNumber(groupId)) {
                    await loadFiles(groupId, newData);
                }
            }
        } catch (error) {
            setData(_.assign({}, data, { groups: { loading: false, data: [] }, items: { loading: false, data: [] } }));
            notification.error({ message: error.message });
        }
    };

    const loadFiles = async (groupId: number, prevData?: IAssetViewState) => {
        const totalData = _.assign({}, data, prevData, { group: groupId });
        try {
            setData(_.assign({}, totalData, { items: initItem }));
            const response = await axios.get(`${Api.fileApi}/by-group/${groupId}`);
            if (response?.status === 200) {
                const items = _.get(response, 'data.data', []) || [];
                setData(_.assign({}, totalData, { items: { loading: false, data: items } }));
            }
        } catch (error) {
            setData(_.assign({}, totalData, { items: { loading: false, data: [] } }));
            notification.error({ message: error.message });
        }
    };

    useEffect(() => {
        setBreadcrumbs && setBreadcrumbs(breadcrumbs);
        loadGroup();
    }, []);

    const handleItemClicked = (id: number) => {
        loadFiles(id);
    };

    const groupComponent = useMemo(() => {
        return (
            <AssetGroup
                loading={data.groups.loading}
                data={data.groups.data}
                selected={data.group}
                onLoad={loadGroup}
                onItemClicked={handleItemClicked}
            />
        );
    }, [data.group, data.groups]);

    const galleryComponent = useMemo(() => {
        return (
            <AssetGallery loading={data.items.loading} data={data.items.data} group={data.group} onLoad={loadFiles} />
        );
    }, [data.group, data.items]);

    return (
        <FitContent>
            {(height) => (
                <div className="asset-view" style={{ height }}>
                    <Row gutter={16}>
                        <Col span={6}>{groupComponent}</Col>
                        <Col span={18}>{galleryComponent}</Col>
                    </Row>
                </div>
            )}
        </FitContent>
    );
}
