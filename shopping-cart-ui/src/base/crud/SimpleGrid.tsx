import { useContext, useEffect, useMemo, useState } from 'react';
import { FormInstance, notification } from 'antd';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table/Table';
import { AppContext } from '../../AppContext';
import {
    IBreadcrumbItem,
    IRecord,
    CREATED_SUCCESS,
    UPDATED_SUCCESS,
    DELETE_SUCCESS,
    CHECK_INPUT,
    IError,
    IForm,
    IStore,
    IPaging,
    ISorting,
    ISearch,
} from '../Common';
import { Grid } from './Grid';

export interface ISimpleGridProp {
    breadcrumbs: IBreadcrumbItem[];
    name: string;
    api: string;
    columns: ColumnsType<IRecord>;
    form?: React.FC<IForm>;
    paging?: boolean;
    transformToPostData?: (data: IRecord) => unknown;
}

const buildStore = (paging?: boolean): IStore => {
    const initPaging: IPaging = {
        current: 0,
        pageSize: 10,
    };
    return {
        searchKey: undefined,
        paging: paging ? initPaging : undefined,
        sorting: undefined,
        searchCriteria: undefined,
    };
};

const buildParams = (store: IStore): unknown => {
    const params = {};
    if (store.searchKey) {
        _.set(params, 'searchKey', store.searchKey ?? '');
    }
    if (store.paging) {
        // console.log('paging: ', store.paging);
        _.set(
            params,
            'paging',
            btoa(
                JSON.stringify({
                    pageNo: store.paging?.current.toString(),
                    pageSize: store.paging?.pageSize.toString(),
                }),
            ),
        );
    }
    if (store.sorting) {
        // console.log('sorting: ', store.sorting);
        _.set(
            params,
            'sorting',
            btoa(
                JSON.stringify({
                    key: store.sorting?.key.toString() ?? '',
                    direction: store.sorting?.direction.toString() ?? '',
                }),
            ),
        );
    }
    if (store.searchCriteria) {
        // console.log('searchCriteria: ', store.searchCriteria);
        _.set(params, 'searchCriteria', btoa(JSON.stringify(store.searchCriteria)));
    }
    return params;
};

export function SimpleGrid(prop: ISimpleGridProp): JSX.Element {
    const { breadcrumbs, name, api, columns, form, paging, transformToPostData } = prop || {};
    const appContext = useContext(AppContext);
    const { setBreadcrumbs } = appContext || {};
    const [data, setData] = useState<{ loading: boolean; rows: IRecord[]; store: IStore; total?: number }>({
        loading: true,
        rows: [],
        store: buildStore(paging),
        total: 0,
    });

    const onLoadData = async (_store: IStore) => {
        try {
            const response = await axios.get(api, { params: buildParams(_store) });
            const total = _.get(response, 'data.total', 0);
            const responseData: IRecord[] = _.get(response, 'data.data', []);
            const rows: IRecord[] = (responseData || []).map((item: IRecord) =>
                _.assign(item, { key: _.get(item, 'id') }),
            );
            setData({
                loading: false,
                rows,
                store: _store,
                total,
            });
        } catch (error) {
            setData({ loading: false, rows: [], store: data.store });
            notification.error({ message: error.message });
        }
    };

    useEffect(() => {
        setBreadcrumbs && setBreadcrumbs(breadcrumbs || []);
        onLoadData(data.store);
    }, [breadcrumbs]);

    const gridComponent = useMemo(() => {
        const onTransformColumn = (columns: ColumnsType<IRecord>) => {
            return (columns || []).map((item) => _.assign({}, item));
        };
        const onSaveForm = async (formRef: FormInstance, values: IRecord, onCloseModal: () => void) => {
            try {
                let config: Record<string, unknown> = {};
                if (values instanceof FormData) {
                    config = {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    };
                }
                const postData = transformToPostData ? transformToPostData(values) : values;
                if (values.key === undefined) {
                    const response = await axios.post(api, postData, config);
                    if (response.status === 200) {
                        notification.success({ message: CREATED_SUCCESS });
                        onCloseModal();
                        await onLoadData(data.store);
                    }
                } else {
                    const response = await axios.put(`${api}/${values.key}`, postData, config);
                    if (response.status === 200) {
                        notification.success({ message: UPDATED_SUCCESS });
                        onCloseModal();
                        await onLoadData(data.store);
                    }
                }
            } catch (error) {
                const { errors } = error?.response?.data || {};
                if (errors) {
                    const fields: IError[] = [];
                    _.each(JSON.parse(errors), (item, key) => {
                        fields.push({
                            name: key,
                            errors: [item],
                        });
                    });
                    formRef.setFields(fields);
                    notification.error({ message: CHECK_INPUT });
                }
            }
        };
        const onDelete = async (record: IRecord, onCloseModal: () => void) => {
            try {
                const response = await axios.delete(`${api}/${record.key}`);
                if (response.status === 200) {
                    notification.success({ message: DELETE_SUCCESS });
                    onCloseModal();
                    await onLoadData(data.store);
                }
            } catch (error) {
                console.log(error);
            }
        };
        const handleGridChange = (
            pagination: TablePaginationConfig,
            filters: Record<string, FilterValue | null>,
            sorter: SorterResult<IRecord> | SorterResult<IRecord>[],
        ) => {
            const newFilters: ISearch[] = [];
            if (!_.isEmpty(filters)) {
                _.forOwn(filters, (value, key) => {
                    if (value) {
                        newFilters.push({
                            key,
                            isOrOperation: false,
                            searchOperation: 'LIKE',
                            arguments: value as string[],
                        });
                    }
                });
            }
            let newPaging: IPaging | undefined = undefined;
            if (paging) {
                newPaging = {
                    current: _.get(pagination, 'current', 1) - 1,
                    pageSize: _.get(pagination, 'pageSize', 0),
                };
            }
            let newSorting: ISorting | undefined = undefined;
            if (!_.isEmpty(sorter) && _.get(sorter, 'column')) {
                newSorting = {
                    key: _.get(sorter, 'field'),
                    direction: _.get(sorter, 'order'),
                };
            }
            onLoadData(
                _.assign({}, data.store, {
                    paging: newPaging,
                    sorting: newSorting,
                    searchCriteria: newFilters,
                }),
            );
        };
        const pagingOptions: TablePaginationConfig = {
            defaultPageSize: 10,
            pageSize: data.store.paging?.pageSize,
            pageSizeOptions: ['10', '20', '50', '100'],
            total: data.total,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} / Tổng cộng ${total} dòng`,
        };
        return (
            <Grid
                name={name}
                loading={data.loading}
                dataSource={data.rows}
                transformColumn={onTransformColumn}
                columns={columns}
                createForm={form}
                updateForm={form}
                onSaveForm={onSaveForm}
                onDelete={onDelete}
                pagination={paging ? pagingOptions : false}
                onChange={handleGridChange}
            />
        );
    }, [data]);

    return gridComponent;
}
