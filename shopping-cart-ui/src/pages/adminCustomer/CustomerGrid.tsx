import { Api, IBreadcrumbItem, SimpleGrid } from '../../base';
import ColumnDef from './CustomerColumn';
import FormDef from './CustomerForm';

interface ICustomerGridProp {
    breadcrumbs: IBreadcrumbItem[];
}

export default function CustomerGrid(prop: ICustomerGridProp): JSX.Element {
    return SimpleGrid({
        breadcrumbs: prop.breadcrumbs,
        name: 'Khách hàng',
        api: Api.customerApi,
        paging: true,
        columns: ColumnDef(),
        form: FormDef,
    });
}
