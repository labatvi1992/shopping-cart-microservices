import { FC, useCallback, useState } from 'react';
import { Modal, Table, Form } from 'antd';
import { GridContainer } from './GridContainer';
import { IRecord } from '../Common';
import Empty from '../Empty';

const defaultFormOptions = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

export interface IGridDataProp {
    data?: IRecord[];
    filterLegend?: string;
    filterOptions?: Record<string, unknown>;
    gridOptions?: Record<string, unknown>;
    modalOptions?: Record<string, unknown>;
    formOptions?: Record<string, unknown>;
    renderFilterBody?: () => JSX.Element;
    renderFormBody?: () => JSX.Element;
}

export const GridData: FC<IGridDataProp> = (prop: IGridDataProp) => {
    const {
        data,
        gridOptions,
        filterLegend,
        filterOptions,
        modalOptions,
        formOptions,
        renderFilterBody,
        renderFormBody,
    } = prop || {};
    const [visible, setVisible] = useState<boolean>(false);
    const [filterForm] = Form.useForm();
    const [modalForm] = Form.useForm();

    const renderFilter = useCallback((): JSX.Element => {
        return (
            <fieldset className="grid-filter">
                <legend>{filterLegend}</legend>
                <Form {...filterOptions} form={filterForm}>
                    {renderFilterBody && renderFilterBody()}
                </Form>
            </fieldset>
        );
    }, [renderFilterBody]);

    const renderGrid = useCallback((): JSX.Element => {
        return (
            <Table
                {...gridOptions}
                className="grid-data"
                dataSource={data}
                locale={{
                    emptyText: Empty,
                }}
            />
        );
    }, [gridOptions, data]);

    const renderModal = useCallback((): JSX.Element => {
        const handleOk = () => {
            modalForm.submit();
        };

        return (
            <Modal {...modalOptions} visible={visible} onOk={handleOk} onCancel={() => setVisible(false)}>
                <Form {..._.assign({}, defaultFormOptions, formOptions)} form={modalForm}>
                    {renderFormBody && renderFormBody()}
                </Form>
            </Modal>
        );
    }, [visible, modalOptions, renderFormBody]);

    return <GridContainer renderFilter={renderFilter} renderGrid={renderGrid} renderModal={renderModal} />;
};
