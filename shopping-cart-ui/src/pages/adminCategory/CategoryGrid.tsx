import { Api, IBreadcrumbItem, IRecord, SimpleGrid } from '../../base';
import { ICategoryRow, transformToPostData } from './CategoryRow';
import ColumnDef from './CategoryColumn';
import FormDef from './CategoryForm';

interface ICategoryGridProp {
    breadcrumbs: IBreadcrumbItem[];
}

export default function CategoryGrid(prop: ICategoryGridProp): JSX.Element {
    return SimpleGrid({
        breadcrumbs: prop.breadcrumbs,
        name: 'Danh mục',
        api: Api.categoryApi,
        paging: true,
        columns: ColumnDef(),
        form: FormDef,
        transformToPostData: (data: IRecord) => transformToPostData(data as ICategoryRow),
    });
}
