import { useCallback } from 'react';
import { Collapse, Table, Form, TableProps, FormProps, FormInstance } from 'antd';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { TablePaginationConfig } from 'antd/lib/table/Table';
import { GridContainer } from './GridContainer';
import { IPaging, IRecord, ISorting, IStore } from '../Common';
import Empty from '../Empty';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from './Util';

const { Panel } = Collapse;

export interface IGridDataProp {
    store?: IStore;
    filterHeader?: string;
    filterOptions?: FormProps;
    gridOptions?: TableProps<IRecord>;
    renderFilterBody?: (form: FormInstance) => JSX.Element;
    onFilter?: (values: unknown) => void;
    renderAction?: () => JSX.Element;
    renderAddition?: () => JSX.Element;
    onDataChange?: (store?: IStore) => void;
}

export function GridData(prop: IGridDataProp): JSX.Element {
    const {
        store,
        gridOptions,
        filterHeader,
        filterOptions,
        renderFilterBody,
        onFilter,
        renderAction,
        renderAddition,
        onDataChange,
    } = prop || {};
    const [filterForm] = Form.useForm();

    const renderFilter = useCallback((): JSX.Element => {
        return (
            <Collapse defaultActiveKey={['1']} className="grid-filter">
                <Panel header={filterHeader} key="1">
                    <Form {...filterOptions} form={filterForm} onFinish={onFilter}>
                        {renderFilterBody && renderFilterBody(filterForm)}
                    </Form>
                </Panel>
            </Collapse>
        );
    }, [renderFilterBody]);

    const renderGrid = useCallback((): JSX.Element => {
        const pagingOptions: TablePaginationConfig = {
            defaultPageSize: PAGE_SIZE,
            pageSize: store?.paging?.pageSize,
            pageSizeOptions: PAGE_SIZE_OPTIONS,
            total: store?.total,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} / Tổng cộng ${total} dòng`,
        };

        const handleGridChange = (
            pagination: TablePaginationConfig,
            _filters: Record<string, FilterValue | null>,
            sorter: SorterResult<IRecord> | SorterResult<IRecord>[],
        ) => {
            let newPaging: IPaging | undefined = undefined;
            if (!_.isEmpty(pagination)) {
                newPaging = {
                    current: (pagination.current ?? 1) - 1,
                    pageSize: pagination.pageSize ?? 0,
                };
            }
            let newSorting: ISorting | undefined = undefined;
            if (!_.isEmpty(sorter) && _.get(sorter, 'column')) {
                newSorting = {
                    key: _.get(sorter, 'field'),
                    direction: _.get(sorter, 'order'),
                };
            }
            onDataChange && onDataChange({ paging: newPaging, sorting: newSorting });
        };

        return (
            <>
                {renderAction && <div className="grid-action">{renderAction()}</div>}
                <Table
                    {...gridOptions}
                    className="grid-data"
                    locale={{
                        emptyText: Empty,
                    }}
                    pagination={store?.paging ? pagingOptions : false}
                    onChange={handleGridChange}
                />
            </>
        );
    }, [store?.loading, gridOptions, renderAction]);

    return <GridContainer renderFilter={renderFilter} renderGrid={renderGrid} renderAddition={renderAddition} />;
}
