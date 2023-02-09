import React, { useState, useEffect, memo } from "react";
import Style from "./menu.module.less";
import { Menu } from "tdesign-react";
import { routerList } from "../../router/index";
import MenuItem from "tdesign-react/es/menu/MenuItem";
import SubMenu from "tdesign-react/es/menu/SubMenu";
import { AppIcon } from "tdesign-icons-react";
import { useNavigate, useLocation } from 'react-router-dom';
export default memo(function Menus() {
  const navigate = useNavigate();
  let location = useLocation();
  const [expands, setexpands] = useState<string[]>([]);

  useEffect(() => {
    setexpands(() => {
      let list = location.pathname.split("/");
      list.pop();
      list = list.filter((res) => res != "").map((res) => "/" + res);
      return list;
    });
  }, [setexpands]);

  return (
    <div>
      <Menu
        value={location.pathname}
        style={{ flexShrink: 0, height: '100%' }}
        expandMutex={false}
        expanded={expands}
        onExpand={(values: any) => setexpands(values)}
        theme="light"
        width="180px"
      >
        {routerList.map((res, ind) => {
          if (!res.children) {
            return (
              <MenuItem
                key={ind}
                icon={res.meta?.icon || <AppIcon />}
                value={res.path}
                onClick={() => navigate(res.path)}
              >
                <span>{res.meta?.title}</span>
              </MenuItem>
            );
          } else {
            return (
              <SubMenu
                title={res.meta?.title}
                icon={res.meta?.icon || <AppIcon />}
                key={ind}
                value={res.path}
              >
                {res.children.map((res1, index) => {
                  return (
                    <MenuItem
                      value={res.path + "/" + res1.path}
                      key={ind + "-" + index}
                      onClick={() => navigate(res.path + "/" +res1.path)}
                    >
                      <span>{res1.meta?.title}</span>
                    </MenuItem>
                  );
                })}
              </SubMenu>
            );
          }
        })}
      </Menu>
    </div>
  );
});
