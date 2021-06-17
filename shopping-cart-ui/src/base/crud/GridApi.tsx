import { useEffect } from 'react';
import { GridData, IGridDataProp } from './GridData';

export interface IGridApiProp extends IGridDataProp {
    api: string;
}

export function GridApi(prop: IGridApiProp): JSX.Element {
    const { api, ...lastProp } = prop || {};

    const loadData = async () => {
        const response = await axios.get(api);
        if (response?.status === 200) {
            console.log(response);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return <GridData {...lastProp} />;
}
