import * as React from "react";
import { ConfigProvider } from "tdesign-react";
import "tdesign-react/es/style/index.css";
import { useLocation } from "react-router-dom";
import AppLayout from "./layout";
import { allRoutes, Routers } from "./router/index";
const App: React.FC = () => {
  let location = useLocation();
  function getContainer() {
    let pathList = location.pathname.split("/").filter((res) => res != "");
    let nowRoute = getNowRoute(pathList, allRoutes);
    function getNowRoute(pathList: string[], routeList: Routers[]): Routers {
      pathList = JSON.parse(JSON.stringify(pathList));
      let nowRouter: Routers = {
        path: "/",
      };
      let key: string;
      for (key in routeList) {
        if (
          routeList[key].path == pathList[0] ||
          routeList[key].path == "/" + pathList[0]
        ) {
          if (pathList.length == 1) {
            return routeList[key];
          } else {
            if (routeList[key].children) {
              let children = routeList[key].children as Routers[];
              pathList.shift();
              return getNowRoute(pathList, children);
            }
          }
        }
      }
      return nowRouter;
    }
    if (nowRoute.isFullPage) return "FullPageLayout";
    return "MixLayout";
  }
  const AppContainer = AppLayout[getContainer()];
  return (
    <ConfigProvider globalConfig={{ classPrefix: "t" }}>
      <AppContainer />
    </ConfigProvider>
  );
};
export default App;
