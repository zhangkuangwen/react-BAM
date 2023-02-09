import React, { memo, useState, useEffect } from "react";
import { Card,  Input, Button, Space } from 'tdesign-react';
import Style from "./index.module.less"
import Table from "@/components/table"
function UserControl() {
  return (
    <div className={Style.h_full}>
     <Table />
    </div>
  )
}

export default memo(UserControl)