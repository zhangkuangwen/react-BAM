import React, { memo, useState, useEffect } from "react";
import { PageInfo, PrimaryTableCol, Table, TableRowData } from 'tdesign-react';
import Style from "./index.module.less"
function TableEncapsulation(params: { setSelectedRowKeys: (arg0: any) => void; selectedRowKeys: (string | number)[] | undefined; columns: PrimaryTableCol<TableRowData>[] | undefined; tabLoading: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; contractList: TableRowData[] | undefined; params: { pageNo: any; pageSize: any; }; total: any;  onPageChange: (arg0: PageInfo) => void; }) {
  function onSelectChange(value: any, selectOptions: any) {
    console.log('onSelectChange', value, selectOptions);
    params.setSelectedRowKeys(value);
  }
  return (
    <Table bordered height="calc(100% - 66.8px)" selectedRowKeys={params.selectedRowKeys} onSelectChange={onSelectChange} columns={params.columns}
      rowKey={"id"} loading={params.tabLoading}
      data={params.contractList}
      pagination={{
        current:params.params.pageNo,
        pageSize:params.params.pageSize,
        total: params.total,
        showJumper: true,
        onChange(pageInfo) {
          params.onPageChange(pageInfo)
        },
      }}
      onRowClick={({ row, index, e }) => {
        console.log('onRowClick', { row, index, e });
      }}
    />
  )
}

export default memo(TableEncapsulation)