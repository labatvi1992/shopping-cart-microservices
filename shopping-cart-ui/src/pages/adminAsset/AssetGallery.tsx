import { useState } from 'react';
import { Button, List, Image, Modal, Form, notification, UploadProps } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Api, DELETE_SUCCESS, Empty, IMG_NOT_FOUND } from '../../base';
import { IAssetItem } from './interface';
import { AssetUpload } from './AssetUpload';

interface IAssetGalleryProp {
    loading: boolean;
    data?: IAssetItem[];
    group: number | undefined;
    onLoad: (groupId: number) => void;
}

export default function AssetGallery(prop: IAssetGalleryProp): JSX.Element {
    const { loading, data, group, onLoad } = prop || {};

    const [modalState, setModalState] = useState<{ isVisible?: boolean; title?: string }>({});
    const [form] = Form.useForm();

    const showModal = (title: string) => {
        form.resetFields();
        setModalState({
            isVisible: true,
            title,
        });
    };

    const handleCancel = () => {
        setModalState({ isVisible: false, title: '' });
    };

    const normalFile = (e: UploadProps) => {
        return e && e.data;
    };

    const onChange = () => {
        notification.success({ message: 'Upload successfully' });
        handleCancel();
        if (group) {
            onLoad(group);
        }
    };

    const onRemove = async (itemId: number) => {
        const url = `${Api.fileApi}/${itemId}`;
        try {
            const response = await axios.delete(url);
            if (response.status === 200) {
                notification.success({ message: DELETE_SUCCESS });
                if (group) {
                    onLoad(group);
                }
            } else {
                notification.error({ message: _.get(response, 'message') });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <fieldset className="field-set">
            <legend>
                <span>Tài nguyên</span>
                <Button className="btn-create-new" disabled={!group} onClick={() => showModal('Tải lên')}>
                    Tải lên
                </Button>
            </legend>
            <List
                className="asset-gallery"
                grid={{ gutter: 16, column: 6 }}
                loading={loading}
                locale={{
                    emptyText: <Empty />,
                }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item key={item.id} className="asset-gallery-item">
                        <Image
                            src={`${Api.viewResourceApi}/${item.path}`}
                            alt=""
                            preview={false}
                            fallback={IMG_NOT_FOUND}
                        />
                        <CloseOutlined className="remove" onClick={() => onRemove(item.id)} />
                    </List.Item>
                )}
            />
            <Modal title={modalState.title} visible={modalState.isVisible} footer={null} onCancel={handleCancel}>
                <div className={'base-form'}>
                    <Form form={form} name="control-hooks" layout="vertical" onChange={onChange}>
                        <Form.Item name="imageDefault" label="Hình ảnh" getValueFromEvent={normalFile}>
                            <AssetUpload params={{ group: group }} uploadUrl={Api.fileApi} />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </fieldset>
    );
}
