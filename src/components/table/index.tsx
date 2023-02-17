import React, { memo, useState, useEffect } from "react";
import {  Table, TableRowData } from 'tdesign-react';
import Style from "./index.module.less"
function TableEncapsulation(params: { columns: any; contractList: TableRowData[] | undefined; total: any; }) {
  const [loading, setloading] = useState<boolean>(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  function onSelectChange(value: any, selectOptions: any) {
    console.log('onSelectChange', value, selectOptions);
    setSelectedRowKeys(value);
  }
  return (
    <Table bordered height="calc(100% - 66.8px)" selectedRowKeys={selectedRowKeys} onSelectChange={onSelectChange} columns={params.columns}
      rowKey={"id"} loading={loading}
      data={params.contractList}
      pagination={{
        defaultCurrent: 1,
        defaultPageSize: 10,
        total: params.total,
        showJumper: true,
        onChange(pageInfo) {
          console.log(pageInfo, 'onChange pageInfo');
        },
        onCurrentChange(current, pageInfo) {
          console.log(current, pageInfo, 'onCurrentChange current');
        },
        onPageSizeChange(size, pageInfo) {
          console.log(size, pageInfo, 'onPageSizeChange size');
        },
      }}
      onRowClick={({ row, index, e }) => {
        console.log('onRowClick', { row, index, e });
      }}
    />
  )
}

export default memo(TableEncapsulation)