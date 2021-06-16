import { IRecord } from '../../base/index';

export interface ICategoryRow extends IRecord {
    id: number;
    name: string;
    sortIndex?: number;
    active?: boolean;
}

export function transformToPostData(data: ICategoryRow): ICategoryRow {
    return _.assign({}, data, { id: data.key });
}
