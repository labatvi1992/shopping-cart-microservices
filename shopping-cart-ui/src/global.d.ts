import { LoDashStatic } from 'lodash';
import { Moment } from './types/moment';
import { AxiosStatic } from './types/axios';

declare global {
    const _: LoDashStatic;
    const moment: Moment;
    const axios: AxiosStatic;
}
