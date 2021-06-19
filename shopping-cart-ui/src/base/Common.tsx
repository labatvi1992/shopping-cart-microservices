import { FC } from 'react';
import { FormInstance } from 'antd';

export const DATE_FORMAT = 'DD/MM/YYYY';
export const SUBMIT_DATE_FORMAT = 'YYYY-MM-DD';
export const IMG_NOT_FOUND = 'https://img2.pngio.com/documentation-screenshotlayer-api-default-png-250_250.png';
export const NOT_EMPTY = 'Không được rỗng';
export const CHECK_INPUT = 'Vui lòng kiểm tra lại dữ liệu đã nhập!';
export const ACTION_COLUMN_TITLE = 'Hành động';
export const CREATED_SUCCESS = 'Tạo mới thành công';
export const UPDATED_SUCCESS = 'Cập nhật thành công';
export const DELETE_SUCCESS = 'Xóa thành công';
export const DELETE_CONFIRM = 'Bạn chắc chắn xóa dòng này?';

export interface IBreadcrumbItem {
    text: string;
    icon?: string;
    route?: string;
}

export interface IRoute {
    id: string;
    component: React.ElementType;
    layout?: React.ElementType;
    exact: boolean;
    breadcrumbs?: IBreadcrumbItem[];
    children?: IRoute[];
}

export interface IContext {
    breadcrumbs: IBreadcrumbItem[];
    setBreadcrumbs?(data: IBreadcrumbItem[]): void;
}

export interface IRecord {
    key: number | string;
}

export interface ITreeRecord extends IRecord {
    title: string;
    value: number | string;
    parentId: number | string | null;
    children?: ITreeRecord[];
}

export interface IForm {
    data: IRecord | undefined;
    form: FormInstance;
}

export interface IModal {
    isVisible: boolean;
    title: string | undefined;
    state?: string;
    form?: FC<IForm> | undefined;
    data?: IRecord | undefined;
}

export interface IMenuItem {
    text: string;
    route?: string;
    icon?: string;
    children?: IMenuItem[];
}

export interface IError {
    name: string;
    errors: string[];
}

export interface IPaging {
    current: number;
    pageSize: number;
}

export interface ISorting {
    key: string;
    direction: string;
}

export interface ISearch {
    key: string;
    searchOperation: string;
    isOrOperation: boolean;
    arguments: string[] | undefined;
}

export interface IStore {
    loading?: boolean;
    searchKey?: string;
    paging?: IPaging;
    sorting?: ISorting;
    searchCriteria?: ISearch[];
    rows?: IRecord[];
    total?: number;
}

export function formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

export const CART_ITEMS_KEY = 'CART_ITEMS';

export interface ICartItem {
    id: number | string;
    count: number;
}

export interface ICart {
    items: ICartItem[];
    customerId: number | undefined;
}

export function getLocalStorageKey(key: string, parse: boolean): string | unknown | undefined {
    const val = localStorage.getItem(key);
    if (_.isUndefined(val) || _.isNull(val)) {
        return undefined;
    }
    if (parse) {
        return JSON.parse(val);
    }
    return val;
}

export function setLocalStorageKey(key: string, value: string | unknown): void {
    if (typeof value === 'string') {
        localStorage.setItem(key, value);
    }
    localStorage.setItem(key, JSON.stringify(value));
}

export function getItemsFromCart(): ICartItem[] {
    return (getLocalStorageKey(CART_ITEMS_KEY, true) ?? []) as ICartItem[];
}

export function addItemToCart(item: ICartItem): void {
    const cart = getItemsFromCart();
    const existed = _.find(cart, (i: ICartItem) => i.id === item.id);
    let newCart: ICartItem[] | undefined = undefined;
    if (existed) {
        existed.count += item.count;
        newCart = _.union(cart, [existed]);
    } else {
        newCart = _.concat(cart, [item]);
    }
    setLocalStorageKey(CART_ITEMS_KEY, newCart);
}

export function removeItemFromCart(item: ICartItem): void {
    const cart = getItemsFromCart();
    const existed = _.find(cart, (i: ICartItem) => i.id === item.id);
    let newCart: ICartItem[] | undefined = undefined;
    if (existed) {
        existed.count -= item.count;
        if (existed.count > 0) {
            newCart = _.union(cart, [existed]);
        } else {
            newCart = _.remove(cart, (i: ICartItem) => i.id !== item.id);
        }
        setLocalStorageKey(CART_ITEMS_KEY, newCart);
    }
}

export function updateItemOnCart(item: ICartItem): void {
    const cart = getItemsFromCart();
    const existed = _.find(cart, (i: ICartItem) => i.id === item.id);
    let newCart: ICartItem[] | undefined = undefined;
    if (existed) {
        existed.count = item.count;
        newCart = _.union(cart, [existed]);
        setLocalStorageKey(CART_ITEMS_KEY, newCart);
    }
}

export function clearCartItems(): void {
    localStorage.removeItem(CART_ITEMS_KEY);
}

export const homeItem: IBreadcrumbItem = { text: 'Trang chủ', route: '/', icon: 'fa fa-home' };
export const adminItem: IBreadcrumbItem = { text: 'Quản lý', route: '/quan-ly/' };
