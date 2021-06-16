import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { IRoute } from './index';
import NotFound from './NotFound';

interface IRouterConfigProp {
    parent?: string;
    data?: IRoute[];
}

export const Router: FC<IRouterConfigProp> = (prop: IRouterConfigProp) => {
    const { parent, data } = prop || {};

    const components = (data || []).map((item: IRoute) => {
        const { id, component: Component, layout: Layout, exact, breadcrumbs, children } = item || {};
        const key = parent ? `${parent}${id}` : id;
        if (children) {
            return (
                <Route
                    key={key}
                    path={key}
                    exact={exact}
                    render={(routeProp) => (
                        <Component {...routeProp}>
                            <Router key={key} parent={key} data={children} />
                        </Component>
                    )}
                />
            );
        }
        return (
            <Route
                key={key}
                path={key}
                exact={exact}
                render={(routeProp) => {
                    if (Layout) {
                        return (
                            <Layout {...routeProp}>
                                <Component {...routeProp} breadcrumbs={breadcrumbs} />
                            </Layout>
                        );
                    }
                    return <Component {...routeProp} breadcrumbs={breadcrumbs} />;
                }}
            />
        );
    });
    return (
        <Switch>
            {components}
            <Route component={NotFound} />
        </Switch>
    );
};
