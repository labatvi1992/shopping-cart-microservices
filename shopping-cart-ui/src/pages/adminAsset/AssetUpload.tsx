import { useMemo } from 'react';
import classNames from 'classnames';
import { Upload, UploadProps } from 'antd';
import { UploadRequestOption, UploadProgressEvent, UploadRequestError } from 'rc-upload/lib/interface';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

export interface IAssetUploadProp {
    className?: string;
    value?: number | string | undefined;
    onChange?: (value: UploadProps) => void;
    params?: Record<string, string | number | undefined>;
    uploadUrl?: string;
}

export function AssetUpload(prop: IAssetUploadProp): JSX.Element {
    const { className, value, onChange, params, uploadUrl } = prop || {};

    const customRequest = async (options: UploadRequestOption) => {
        const { onSuccess, onError, file, onProgress } = options || {};
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileGroupId', _.get(params, 'group')?.toString() ?? '');
        const config = {
            headers: { 'content-type': 'multipart/form-data' },
            onUploadProgress: (event: UploadProgressEvent) => {
                const percent = (event.loaded / event.total) * 100;
                onProgress && onProgress({ ...event, percent });
            },
        };
        try {
            if (uploadUrl) {
                const response = await axios.post(uploadUrl, formData, config);
                if (response.status === 200) {
                    const fileId = _.get(response, 'data.data.id');
                    onSuccess && onSuccess(file, new XMLHttpRequest());
                    onChange && onChange({ data: fileId });
                }
            }
        } catch (err) {
            const error: UploadRequestError = new Error(err.message);
            onError && onError(error);
        }
    };

    const component = useMemo(() => {
        return (
            <Dragger
                name="file"
                className={classNames('asset-upload', className, value ? 'hide' : '')}
                showUploadList={false}
                listType="picture-card"
                customRequest={customRequest}
            >
                {!value && (
                    <>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    </>
                )}
            </Dragger>
        );
    }, [value]);

    return component;
}
