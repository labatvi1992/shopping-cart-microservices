import { TableProps } from 'antd';
import { IRecord } from '../Common';

export interface IGridContainerProp extends TableProps<IRecord> {
    renderGrid: () => JSX.Element;
    renderFilter?: () => JSX.Element;
    renderModal?: () => JSX.Element;
}

export function GridContainer(prop: IGridContainerProp): JSX.Element {
    const { renderFilter, renderGrid, renderModal } = prop || {};
    return (
        <div className="grid-container">
            {renderFilter && renderFilter()}
            {renderGrid()}
            {renderModal && renderModal()}
        </div>
    );
}
