import { IPaging, IStore } from '../Common';

export const PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = ['10', '20', '50', '100'];
export const buildStore = (paging?: boolean): IStore => {
    const initPaging: IPaging = {
        current: 0,
        pageSize: PAGE_SIZE,
    };
    return {
        searchKey: undefined,
        paging: paging ? initPaging : undefined,
        sorting: undefined,
        searchCriteria: undefined,
    };
};

export const buildParams = (store?: IStore): unknown => {
    const params = {};
    if (store?.searchKey) {
        _.set(params, 'searchKey', store.searchKey ?? '');
    }
    if (store?.paging) {
        _.set(
            params,
            'paging',
            btoa(
                JSON.stringify({
                    pageNo: store.paging?.current.toString(),
                    pageSize: store.paging?.pageSize.toString(),
                }),
            ),
        );
    }
    if (store?.sorting) {
        _.set(
            params,
            'sorting',
            btoa(
                JSON.stringify({
                    key: store.sorting?.key.toString() ?? '',
                    direction: store.sorting?.direction.toString() ?? '',
                }),
            ),
        );
    }
    if (store?.searchCriteria) {
        _.set(params, 'searchCriteria', btoa(JSON.stringify(store.searchCriteria)));
    }
    return params;
};
