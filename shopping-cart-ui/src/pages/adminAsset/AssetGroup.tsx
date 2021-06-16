import { useState } from 'react';
import { Button, List, Form, Modal, Input, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { IAssetGroupItem } from './interface';
import {
    Api,
    CREATED_SUCCESS,
    UPDATED_SUCCESS,
    DELETE_SUCCESS,
    DELETE_CONFIRM,
    IRecord,
    NOT_EMPTY,
    Empty,
} from '../../base';

const { confirm } = Modal;

interface IAssetGroupProp {
    loading: boolean;
    data?: IAssetGroupItem[];
    onLoad: () => void;
    selected: number | undefined;
    onItemClicked?: (id: number) => void;
}

export default function AssetGroup(prop: IAssetGroupProp): JSX.Element {
    const { loading, data, onLoad, selected, onItemClicked } = prop || {};

    const [modalState, setModalState] = useState<{ isVisible?: boolean; title?: string }>({});
    const [form] = Form.useForm();

    const handleCreateNew = () => {
        showModal('Tạo mới');
    };

    const handleUpdate = async () => {
        showModal('Cập nhật');
        // load data
        try {
            const response = await axios.get(`${Api.fileGroupApi}/${selected}`);
            if (response?.status === 200) {
                const data = _.get(response, 'data.data', {});
                form.setFieldsValue(data);
            }
        } catch (error) {
            notification.error({ message: error.message });
        }
    };

    const handleDelete = async () => {
        confirm({
            title: '',
            icon: <ExclamationCircleOutlined />,
            content: DELETE_CONFIRM,
            async onOk() {
                try {
                    const response = await axios.delete(`${Api.fileGroupApi}/${selected}`);
                    if (response.status === 200) {
                        notification.success({ message: DELETE_SUCCESS });
                        await onLoad();
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const showModal = (title: string) => {
        form.resetFields();
        setModalState({
            isVisible: true,
            title,
        });
    };

    const handleOk = () => {
        form.submit();
    };

    const handleFormSubmit = async (values: IRecord) => {
        const isCreate = !_.isNumber(selected);
        const postData = _.assign({}, values);
        if (isCreate) {
            const response = await axios.post(`${Api.fileGroupApi}`, postData);
            if (response?.status === 200) {
                notification.success({ message: CREATED_SUCCESS });
                handleCancel();
                await onLoad();
            }
        } else {
            _.set(postData, 'id', selected);
            const response = await axios.put(`${Api.fileGroupApi}/${selected}`, postData);
            if (response.status === 200) {
                notification.success({ message: UPDATED_SUCCESS });
                handleCancel();
                await onLoad();
            }
        }
    };

    const handleCancel = () => {
        setModalState({ isVisible: false, title: '' });
    };

    return (
        <fieldset className="field-set">
            <legend>
                <span>Nhóm</span>
                <Button className="btn-create-new" onClick={handleCreateNew}>
                    Tạo mới
                </Button>
                <Button className="btn-update" disabled={!_.isNumber(selected)} onClick={handleUpdate}>
                    Sửa
                </Button>
                <Button className="btn-delete" disabled={!_.isNumber(selected)} onClick={handleDelete}>
                    Xóa
                </Button>
            </legend>
            <List
                className="asset-group"
                itemLayout="horizontal"
                loading={loading}
                locale={{
                    emptyText: <Empty />,
                }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item
                        key={item.id}
                        className={classNames('asset-group-item', _.isEqual(selected, item.id) ? 'selected' : '')}
                    >
                        <div className="item-name" onClick={() => onItemClicked && onItemClicked(item.id)}>
                            {item.name}
                        </div>
                    </List.Item>
                )}
            />
            <Modal title={modalState.title} visible={modalState.isVisible} onOk={handleOk} onCancel={handleCancel}>
                <div className={'base-form'}>
                    <Form
                        form={form}
                        name="control-hooks"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={handleFormSubmit}
                    >
                        <Form.Item name="name" label="Tên nhóm" rules={[{ required: true, message: NOT_EMPTY }]}>
                            <Input />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </fieldset>
    );
}
