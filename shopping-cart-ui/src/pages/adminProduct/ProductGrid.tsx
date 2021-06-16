import { Api, IBreadcrumbItem, IRecord, SimpleGrid } from '../../base';
import { IProductRow, transformToPostData } from './ProductRow';
import ColumnDef from './ProductColumn';
import FormDef from './ProductForm';

interface IProductGridProp {
    breadcrumbs: IBreadcrumbItem[];
}

export default function ProductGrid(prop: IProductGridProp): JSX.Element {
    return SimpleGrid({
        breadcrumbs: prop.breadcrumbs,
        name: 'Sản phẩm',
        api: Api.productApi,
        paging: true,
        columns: ColumnDef(),
        form: FormDef,
        transformToPostData: (data: IRecord) => transformToPostData(data as IProductRow),
    });
}
