import React, { FC, useState } from 'react';
import { IContext, IBreadcrumbItem } from './base/index';

export const AppContext = React.createContext<IContext>({ breadcrumbs: [] });

export const AppContextProvider: FC<{ children: React.ReactNode }> = (prop: { children: React.ReactNode }) => {
    const { children } = prop || {};
    const [breadcrumbs, setBreadcrumbs] = useState<IBreadcrumbItem[]>([]);

    return (
        <AppContext.Provider
            value={{
                breadcrumbs,
                setBreadcrumbs: (data) => setBreadcrumbs(data),
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
