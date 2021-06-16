import { IRecord } from '../../base/index';

export interface IProductRow extends IRecord {
    id: number;
    code: string;
    name: string;
    active?: boolean;
    imageDefault?: string;
    price?: number;
}

export function transformToPostData(data: IProductRow): unknown {
    return _.assign({}, data, { id: data.key });
}
