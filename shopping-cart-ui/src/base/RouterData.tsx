import * as Pages from '../pages/Index';
import { MainLayout, AdminLayout } from '../layout/Index';
import { IRoute, homeItem, adminItem } from '../base';

export const RouterData: IRoute[] = [
    {
        id: '/quan-ly',
        component: AdminLayout,
        exact: false,
        children: [
            {
                id: '/danh-muc',
                component: Pages.AdminCategory,
                exact: true,
                breadcrumbs: [homeItem, adminItem, { text: 'Danh mục' }],
            },
            {
                id: '/san-pham',
                component: Pages.AdminProduct,
                exact: true,
                breadcrumbs: [homeItem, adminItem, { text: 'Sản phẩm' }],
            },
            {
                id: '/tai-nguyen',
                component: Pages.AdminAsset,
                exact: true,
                breadcrumbs: [homeItem, adminItem, { text: 'Tài nguyên' }],
            },
            {
                id: '/khach-hang',
                component: Pages.AdminCustomer,
                exact: true,
                breadcrumbs: [homeItem, adminItem, { text: 'Khách hàng' }],
            },
        ],
    },
    {
        id: '',
        component: MainLayout,
        exact: false,
        children: [
            {
                id: '/trang-chu',
                component: Pages.Home,
                exact: true,
            },
            {
                id: '/san-pham/:categoryid?/',
                component: Pages.Product,
                exact: true,
            },
            {
                id: '/san-pham/:categoryid/:id',
                component: Pages.ProductDetail,
                exact: true,
            },
            {
                id: '/gio-hang',
                component: Pages.Cart,
                exact: true,
            },
        ],
    },
];
