export interface ICategoryItem {
    id: number;
    name: string;
}

export interface IProductItem {
    id: number;
    name: string;
    imageDefault: string | undefined;
    price: number | undefined;
    categoryId: number | undefined;
}
