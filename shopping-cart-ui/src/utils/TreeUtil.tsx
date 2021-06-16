export interface IRecursiveItem {
    id: string | number;
    parentId?: string | number | undefined | null;
    isExpanded?: boolean;
    children?: IRecursiveItem[];
}

export const flatToHierarchy = (flat: IRecursiveItem[]): IRecursiveItem[] => {
    const roots: IRecursiveItem[] = []; // things without parent

    // make them accessible by guid on this map
    const all: { [key: string]: IRecursiveItem } = {};

    flat.forEach((item) => {
        all[item.id] = item;
    });

    // connect childrens to its parent, and split roots apart
    Object.keys(all).forEach((id) => {
        const item = all[id];
        if (item.parentId === undefined || item.parentId === null) {
            roots.push(item);
        } else if (item.parentId in all) {
            const p = all[item.parentId];
            if (!('children' in p)) {
                p.children = [];
            }
            if (p.children && p.children.indexOf(item) === -1) {
                p.children.push(item);
            }
        }
    });

    return roots;
};
