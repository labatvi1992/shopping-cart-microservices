import { TableProps } from 'antd';
import { IRecord } from '../Common';

export interface IGridContainerProp extends TableProps<IRecord> {
    renderGrid: () => JSX.Element;
    renderFilter?: () => JSX.Element;
    renderAddition?: () => JSX.Element;
}

export function GridContainer(prop: IGridContainerProp): JSX.Element {
    const { renderFilter, renderGrid, renderAddition } = prop || {};
    return (
        <div className="grid-container">
            {renderFilter && renderFilter()}
            {renderGrid()}
            {renderAddition && renderAddition()}
        </div>
    );
}
