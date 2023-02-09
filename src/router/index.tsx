import { Navigate, Outlet, RouteObject, RouterProvider, useRoutes } from "react-router-dom";
import React, { lazy, memo, Suspense } from "react";
import { Loading } from "tdesign-react";
import Style from './index.module.less';
export interface Routers {
  path: string;
  redirect?: string;
  component?: any;
  isFullPage?: boolean;
  meta?: {
    title?: string;
    icon?: any;
  };
  children?: Routers[];
}
export let routersIndex: Routers[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: lazy(() => import("@/pages/login")),
    meta: {
      title: "登录",
      icon: "",
    },
    isFullPage: true,
  },
  {
    path: "*",
    meta: {
      title: "404",
    },
    component: lazy(() => import("@/components/404")),
  },
];
export let routerList: Routers[] = [
  {
    path: "/roleManagement",
    meta: {
      title: "权限管理",
      icon: "",
    },
    // redirect:"/roleManagement/userControl",
    children: [
      {
        path: "userControl",
        component: lazy(() => import("@/pages/userControl")),
        meta: {
          title: "用户管理",
          icon: "",
        },
      },
      {
        path: "permissionList",
        component: lazy(() => import("@/pages/permissionList")),
        meta: {
          title: "权限列表",
          icon: "",
        },
      },
    ],
  },
];
export let allRoutes: Routers[] = [...routersIndex, ...routerList];
const syncRouter = (table: Routers[]): RouteObject[] => {
  let mRouteTable: RouteObject[] = [];
  table.forEach((route) => {
    if (route.redirect) {
      mRouteTable.push({
        path: route.path,
        element: <Navigate to={route.redirect} />,
        children: route.children && syncRouter(route.children),
      });
    } else {
      mRouteTable.push({
        path: route.path,
        element: (
          <Suspense fallback={<div className={Style.loading}>
            <Loading />
          </div>}>
            {
             route.component ? <route.component />:<Outlet/>
            }
          </Suspense>
        ),
        children: route.children && syncRouter(route.children),
      });
    }
  });
  return mRouteTable;
};

export default () => useRoutes(syncRouter(allRoutes));
