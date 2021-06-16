import { FC, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import { IMenuItem } from '../../base';

const { SubMenu } = Menu;

interface IMenuProp {
    data: IMenuItem[];
}

interface ICacheItem {
    [key: string]: string;
}

const cacheMenus: ICacheItem = {};

const TopMenu: FC<IMenuProp> = (prop: IMenuProp) => {
    const { data } = prop || {};
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    const history = useHistory();
    const pathname = history?.location?.pathname;

    useEffect(() => {
        // rerender openkeys & selectedkeys
        const part = _.head(pathname.substring(1).split('/'));
        setSelectedKeys([part ? `/${part}` : pathname]);
        // default open all keys has parent
        const defaultOpenKeys: string[] = [];
        _.forEach(cacheMenus, (_value: string, key: string) => {
            defaultOpenKeys.push(key);
        });
        setOpenKeys(defaultOpenKeys);

        const firstRoute = _.get(_.head(data), 'route');
        if (firstRoute && pathname === '/' && pathname !== firstRoute) {
            // redirect to first route
            history && history.push(firstRoute);
        }
    }, [pathname, data, history]);

    const menuComponent = useMemo(() => {
        const onItemClicked = (e: { key: string }) => {
            const { key } = e || {};
            setSelectedKeys([key]);
            history && history.push(key);
        };

        const onOpenChange = (keys: React.Key[]) => {
            const rootSubmenuKeys: string[] = [];
            _.forEach(cacheMenus, (_value: string, key: string) => {
                rootSubmenuKeys.push(key);
            });
            const latestOpenKey = keys.find((key) => openKeys.indexOf(key.toString()) === -1);
            if (!latestOpenKey || (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey.toString()) === -1)) {
                setOpenKeys(keys.map((key) => key.toString()));
            } else {
                setOpenKeys(latestOpenKey ? [latestOpenKey.toString()] : []);
            }
        };

        const renderMenu = (data: IMenuItem[], parent: string | undefined) => {
            return (data || []).map((item: IMenuItem, itemIndex: number) => {
                const { text, route, icon, children } = item || {};
                const Icon = icon && <i className={icon} />;
                if (children && children.length > 0) {
                    const key = `sub-menu-${itemIndex}`;
                    return (
                        <SubMenu key={key} icon={Icon} title={text}>
                            {renderMenu(children, key)}
                        </SubMenu>
                    );
                }
                if (parent) {
                    cacheMenus[parent] = route ? `${route}` : '';
                }
                return (
                    <Menu.Item key={route || `menu-${itemIndex}`} icon={Icon}>
                        {text}
                    </Menu.Item>
                );
            });
        };

        return (
            <div className="top-menu">
                <Menu
                    mode="horizontal"
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    selectedKeys={selectedKeys}
                    onClick={(e) => onItemClicked({ key: e.key.toString() })}
                >
                    {renderMenu(data, undefined)}
                </Menu>
            </div>
        );
    }, [data, openKeys, selectedKeys, history]);

    return menuComponent;
};

export default TopMenu;
