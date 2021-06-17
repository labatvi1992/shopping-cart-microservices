import { useEffect, useRef } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { IRecord } from '../Common';
import { GridData } from './GridData';

export interface IGridApiProp {
    api: string;
    columns: ColumnsType<IRecord>;
}

export function GridApi(prop: IGridApiProp): JSX.Element {
    const gridRef = useRef<GridData>(null);
    const { api } = prop || {};

    useEffect(() => {});

    return <GridData ref={gridRef} />;
}
