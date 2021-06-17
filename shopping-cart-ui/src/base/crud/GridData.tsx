import { useCallback, useState } from 'react';
import { Collapse, Modal, Table, Form, TableProps, ModalProps, FormProps } from 'antd';
import { GridContainer } from './GridContainer';
import { IRecord } from '../Common';
import Empty from '../Empty';
import { buildStore } from './Util';

const { Panel } = Collapse;

const defaultFormOptions = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

export interface IGridDataProp {
    data?: IRecord[];
    filterHeader?: string;
    filterOptions?: FormProps;
    gridPaging?: boolean;
    gridOptions?: TableProps<IRecord>;
    modalOptions?: ModalProps;
    formOptions?: FormProps;
    renderFilterBody?: () => JSX.Element;
    renderFormBody?: () => JSX.Element;
}

export function GridData(prop: IGridDataProp): JSX.Element {
    const {
        data,
        gridPaging,
        gridOptions,
        filterHeader,
        filterOptions,
        modalOptions,
        formOptions,
        renderFilterBody,
        renderFormBody,
    } = prop || {};
    const [visible, setVisible] = useState<boolean>(false);
    const [filterForm] = Form.useForm();
    const [modalForm] = Form.useForm();

    const store = buildStore(gridPaging);

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
}
