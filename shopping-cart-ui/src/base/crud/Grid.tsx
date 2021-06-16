import { FC, useMemo, useState } from 'react';
import { Button, Modal, Table, TableProps, Form, FormInstance, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import FitContent from '../FitContent';
import Empty from '../Empty';
import { ACTION_COLUMN_TITLE, DELETE_CONFIRM, IForm, IModal, IRecord } from '../../base';

const INIT_MODAL: IModal = {
    isVisible: false,
    title: undefined,
    form: undefined,
    data: undefined,
};

export interface IGridProp extends TableProps<IRecord> {
    name?: string;
    transformColumn?: (columns: ColumnsType<IRecord>) => ColumnsType<IRecord>;
    createForm?: FC<IForm>;
    updateForm?: FC<IForm>;
    onSaveForm?: (form: FormInstance, values: IRecord, onCloseModal: () => void) => void;
    onDelete?: (data: IRecord, onCloseModal: () => void) => void;
}

export function Grid(prop: IGridProp): JSX.Element {
    const { name, columns, transformColumn, pagination, createForm, updateForm, onSaveForm, onDelete } = prop || {};
    const [modalState, setModalState] = useState<IModal>(INIT_MODAL);

    const [form] = Form.useForm();

    const showModal = (title: string, modalForm: FC<IForm> | undefined, data?: IRecord) => {
        form.resetFields();
        setModalState({
            isVisible: true,
            title,
            form: modalForm,
            data,
        });
    };

    const handleOk = () => {
        form.submit();
    };

    const handleFormSubmit = (values: IRecord) => {
        onSaveForm && onSaveForm(form, _.assign({}, values, modalState.data), handleCancel);
    };

    const handleCancel = () => {
        setModalState(INIT_MODAL);
    };

    const buttonCreateNew = useMemo(() => {
        return (
            <Button
                className="btn-create-new"
                icon={<i className="fa fa-plus" />}
                onClick={() => showModal(`Tạo mới ${name}`, createForm)}
            >
                Tạo mới
            </Button>
        );
    }, []);

    const handleDelete = (data: IRecord) => {
        onDelete && onDelete(data, handleCancel);
    };

    const mergedColumns = useMemo(
        () =>
            (transformColumn ? transformColumn(columns || []) : columns || []).concat([
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
                                    onClick={() => showModal(`Cập nhật ${name}`, updateForm, { key })}
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
            ]),
        [columns],
    );

    const FormComponent = modalState.form;

    return (
        <FitContent>
            {(height) => {
                return (
                    <fieldset className="field-set" style={{ height }}>
                        <legend>
                            <span>{name}</span>
                            {buttonCreateNew}
                        </legend>
                        <Table
                            {...prop}
                            className="base-grid"
                            locale={{
                                emptyText: Empty,
                            }}
                            columns={mergedColumns}
                            scroll={{ y: height - 150 }}
                            pagination={pagination}
                            expandable={{ defaultExpandAllRows: true }}
                        />
                        <Modal
                            title={modalState.title}
                            visible={modalState.isVisible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                        >
                            <div className={'base-form'}>
                                <Form
                                    form={form}
                                    name="control-hooks"
                                    labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 18 }}
                                    onFinish={handleFormSubmit}
                                >
                                    {FormComponent && <FormComponent data={modalState.data} form={form} />}
                                </Form>
                            </div>
                        </Modal>
                    </fieldset>
                );
            }}
        </FitContent>
    );
}
