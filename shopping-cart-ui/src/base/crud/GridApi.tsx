import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Button, Form, FormProps, ModalProps, FormInstance, Popconfirm, notification, Modal } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { AppContext } from '../../AppContext';
import { AxiosResponse } from '../../types/axios';
import {
    ACTION_COLUMN_TITLE,
    CHECK_INPUT,
    CREATED_SUCCESS,
    UPDATED_SUCCESS,
    DELETE_CONFIRM,
    DELETE_SUCCESS,
    IBreadcrumbItem,
    IError,
    IModal,
    IRecord,
    IStore,
} from '../Common';
import { GridData, IGridDataProp } from './GridData';
import { buildParams } from './Util';

export interface IGridApiProp extends IGridDataProp {
    api: string;
    name?: string;
    breadcrumbs?: IBreadcrumbItem[];
    modalOptions?: ModalProps;
    formOptions?: FormProps;
    renderActionColumn?: () => ColumnsType<IRecord>;
    onProcessData?: (data: Record<string, unknown>) => Record<string, unknown>;
    onSubmitData?: (values: unknown) => unknown;
    onSaveForm?: (api: string, state: string | undefined, values: unknown) => Promise<AxiosResponse>;
    renderFormBody?: (form: FormInstance, data?: IRecord) => JSX.Element;
}

const defaultFormOptions = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const defaultModal: IModal = {
    isVisible: false,
    title: undefined,
    data: undefined,
};

export function GridApi(prop: IGridApiProp): JSX.Element {
    const {
        api,
        name,
        breadcrumbs,
        modalOptions,
        formOptions,
        renderActionColumn,
        renderFormBody,
        onProcessData,
        onSubmitData,
        onSaveForm,
        ...lastProp
    } = prop || {};
    const appContext = useContext(AppContext);
    const { setBreadcrumbs } = appContext || {};
    const [store, setStore] = useState<IStore | undefined>(lastProp.store);
    const [modalState, setModalState] = useState<IModal>(defaultModal);
    const [modalForm] = Form.useForm();

    const loadData = async (_store?: IStore) => {
        try {
            setStore((state) => {
                return { ...state, loading: true };
            });
            const response = await axios.get(api, { params: buildParams(_store) });
            let responseData: Record<string, unknown> = {};
            if (response?.status === 200) {
                responseData = {
                    rows: _.get(response, 'data.data', []),
                    total: _.get(response, 'data.total', 0),
                };
            }
            setStore((state) => {
                const transform = onProcessData && onProcessData(responseData);
                return { ...state, loading: false, ...transform };
            });
        } catch (error) {
            notification.error({ message: error.message });
            setStore((state) => {
                return { ...state, loading: false };
            });
        }
    };

    useEffect(() => {
        loadData(store);
    }, []);

    useEffect(() => {
        breadcrumbs && setBreadcrumbs && setBreadcrumbs(breadcrumbs);
    }, [breadcrumbs]);

    const handleDataChange = (newStore?: IStore) => {
        setStore(_.assign({}, store, newStore));
    };

    const renderAction = (): JSX.Element => (
        <>
            <Button
                icon={<i className="fa fa-plus" />}
                className="btn-create-new"
                onClick={() => handleShow(`Tạo mới ${name}`, 'create')}
            >
                Tạo mới
            </Button>
            <Button icon={<i className="fa fa-refresh" />} className="btn-update" onClick={() => handleRefresh()}>
                Tải lại
            </Button>
        </>
    );

    const handleRefresh = () => loadData(store);

    const handleShow = (title: string, state: string, data?: IRecord) => {
        modalForm.resetFields();
        setModalState({
            isVisible: true,
            title,
            state,
            data,
        });
    };

    const handleOk = () => {
        modalForm.submit();
    };

    const handleCancel = () => {
        setModalState(defaultModal);
    };

    const handleSave = async (values: IRecord) => {
        try {
            const submitValues = _.assign({}, modalState.data, values);
            if (onSaveForm) {
                const response = await onSaveForm(
                    api,
                    modalState.state,
                    onSubmitData ? onSubmitData(submitValues) : submitValues,
                );
                if (response?.status === 200) {
                    switch (modalState.state) {
                        case 'create':
                            notification.success({ message: CREATED_SUCCESS });
                            break;
                        case 'update':
                            notification.success({ message: UPDATED_SUCCESS });
                            break;
                    }
                    handleCancel();
                    loadData(store);
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
                modalForm.setFields(fields);
                notification.error({ message: CHECK_INPUT });
            }
        }
    };

    const renderModal = useCallback((): JSX.Element => {
        return (
            <Modal
                {...modalOptions}
                title={modalState.title}
                visible={modalState.isVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form {..._.assign({}, defaultFormOptions, formOptions)} form={modalForm} onFinish={handleSave}>
                    {renderFormBody && renderFormBody(modalForm, modalState.data)}
                </Form>
            </Modal>
        );
    }, [modalState, modalOptions, renderFormBody]);

    const handleDelete = async (record: IRecord) => {
        try {
            const response = await axios.delete(`${api}/${record.key}`);
            if (response.status === 200) {
                notification.success({ message: DELETE_SUCCESS });
                handleCancel();
            }
        } catch (error) {
            notification.error({ message: error.message });
        }
    };

    const mergedColumns = useMemo(() => {
        if (renderActionColumn) {
            return (lastProp?.gridOptions?.columns || []).concat(renderActionColumn());
        }
        const actionColumns: ColumnsType<IRecord> = [
            {
                title: ACTION_COLUMN_TITLE,
                key: 'operation',
                width: 180,
                ellipsis: true,
                fixed: 'right',
                align: 'center',
                render: function renderOperation(_, record: IRecord) {
                    const { key } = record || {};
                    return (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Button
                                className="btn-update"
                                onClick={() => handleShow(`Cập nhật ${name}`, 'update', { key })}
                            >
                                Sửa
                            </Button>
                            <Button className="btn-delete">
                                <Popconfirm title={DELETE_CONFIRM} onConfirm={() => handleDelete({ key })}>
                                    Xóa
                                </Popconfirm>
                            </Button>
                        </div>
                    );
                },
            },
        ];
        return (lastProp?.gridOptions?.columns || []).concat(actionColumns);
    }, [lastProp?.gridOptions?.columns]);

    return (
        <GridData
            {...lastProp}
            gridOptions={_.assign({}, lastProp.gridOptions, {
                loading: store?.loading,
                dataSource: store?.rows,
                columns: mergedColumns,
            })}
            renderAction={renderAction}
            renderAddition={renderModal}
            store={store}
            onDataChange={handleDataChange}
        />
    );
}
