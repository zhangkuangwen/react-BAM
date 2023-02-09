import React, { memo } from "react";
import Style from "./index.module.less";
import Menu from "./components/menu";
import Header from "./components/header";
import { Layout } from "tdesign-react";
import RouterView from "../router/index";

const MixLayout = memo(()=>{
  return (
    <Layout className={Style.wrap}>
      <Header></Header>
      <Layout className={Style.body} direction="horizontal">
        <Menu></Menu>
        <Layout className={Style.content}>
          <RouterView />
        </Layout>
      </Layout>
    </Layout>
  );
});
const FullPageLayout = memo(() => <RouterView/>);
export default {
  MixLayout:MixLayout,
  FullPageLayout:FullPageLayout
};
