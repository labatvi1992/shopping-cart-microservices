import { IRecord } from '../../base/index';

export interface ICustomerRow extends IRecord {
    id: number | undefined;
    name: string;
    gender: string | undefined;
    dateOfBirth: moment.Moment | undefined;
    phone: string | undefined;
    email: string | undefined;
    avatar: string | undefined;
}
