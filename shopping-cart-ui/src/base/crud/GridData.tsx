import { useCallback, useState } from 'react';
import { Collapse, Modal, Table, Form, TableProps, ModalProps, FormProps } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table/Table';
import { GridContainer } from './GridContainer';
import { IRecord, IStore } from '../Common';
import { AxiosResponse } from '../../types/axios';
import Empty from '../Empty';
import { buildStore, PAGE_SIZE, PAGE_SIZE_OPTIONS } from './Util';

const { Panel } = Collapse;

export interface IGridDataProp {
    filterHeader?: string;
    filterOptions?: FormProps;
    gridPaging?: boolean;
    gridOptions?: TableProps<IRecord>;
    modalOptions?: ModalProps;
    formOptions?: FormProps;
    renderFilterBody?: () => JSX.Element;
    renderAction?: () => JSX.Element;
    renderFormBody?: () => JSX.Element;
}

export interface IGridDataState {
    loading: boolean;
    rows: IRecord[];
    store?: IStore;
    total?: number;
}

const defaultFormOptions = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const defaultState: IGridDataState = {
    loading: true,
    rows: [],
    store: undefined,
    total: 0,
};

export function GridData(prop: IGridDataProp): JSX.Element {
    const {
        gridPaging,
        gridOptions,
        filterHeader,
        filterOptions,
        modalOptions,
        formOptions,
        renderFilterBody,
        renderAction,
        renderFormBody,
    } = prop || {};
    const [filterForm] = Form.useForm();
    const [modalForm] = Form.useForm();

    const [data, setData] = useState<IGridDataState>(_.assign({}, defaultState, { store: buildStore(gridPaging) }));

    const getStore = () => {
        return data.store;
    };

    const setDataStore = async (
        loadData: () => Promise<AxiosResponse>,
        processData: (response: AxiosResponse) => Record<string, unknown>,
    ) => {
        setData((state) => {
            return { ...state, loading: true };
        });
        const responseData: AxiosResponse = await loadData();
        setData((state) => {
            return { ...state, loading: false, ...processData(responseData) };
        });
    };

    const renderFilter = useCallback((): JSX.Element => {
        return (
            <Collapse defaultActiveKey={['1']} className="grid-filter">
                <Panel header={filterHeader} key="1">
                    <Form {...filterOptions} form={filterForm}>
                        {renderFilterBody && renderFilterBody()}
                    </Form>
                </Panel>
            </Collapse>
        );
    }, [renderFilterBody]);

    const renderGrid = useCallback((): JSX.Element => {
        const pagingOptions: TablePaginationConfig = {
            defaultPageSize: PAGE_SIZE,
            pageSize: data.store?.paging?.pageSize,
            pageSizeOptions: PAGE_SIZE_OPTIONS,
            total: data.total,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} / Tổng cộng ${total} dòng`,
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
                    pagination={gridPaging ? pagingOptions : false}
                />
            </>
        );
    }, [data, gridPaging, gridOptions, renderAction]);

    const renderModal = useCallback((): JSX.Element => {
        return (
            <Modal {...modalOptions}>
                <Form {..._.assign({}, defaultFormOptions, formOptions)} form={modalForm}>
                    {renderFormBody && renderFormBody()}
                </Form>
            </Modal>
        );
    }, [modalOptions, renderFormBody]);

    return <GridContainer renderFilter={renderFilter} renderGrid={renderGrid} renderModal={renderModal} />;
}
