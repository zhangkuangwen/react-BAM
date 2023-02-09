import React, { memo, useState, useEffect } from "react";
import { Card, Table, Input, Button, Space } from 'tdesign-react';
import Style from "./index.module.less"
function TableEncapsulation() {
  const [loading, setloading] = useState<boolean>(false)
  const [contractList, setcontractList] = useState([])
  const [total, settotal] = useState(0)
  const [searchName, onsearchName] = useState('');
  
  return (
    <div className={Style.h_full}>
      <Card className={Style.h_full}>
        <div className={`${Style.flex_between} ${Style.margin_tottom_20}`}>
          <div className={Style.flex}>
            <Input value={searchName} onChange={(value) => {

            }} />
            <Button>搜索</Button>
          </div>
          <div>
            <Space>
              <Button theme="primary">新增</Button>
              <Button theme="warning">批量删除</Button>
            </Space>
          </div>
        </div>
        <Table bordered height="calc(100% - 66.8px)" columns={[
          {
            colKey: 'row-select',
            fixed: 'left',
            type: 'multiple',
            width: 50,
          },
          {
            align: 'center',
            ellipsis: true,
            colKey: 'username',
            title: '用户名',
          }, {
            align: 'center',
            ellipsis: true,
            colKey: 'name',
            title: '邮箱',
          }, {
            align: 'center',
            ellipsis: true,
            colKey: 'createTime',
            title: '创建时间',
          }, {
            align: 'center',
            ellipsis: true,
            colKey: 'roleName',
            title: '角色',
          }, {
            align: 'center',
            fixed: 'right',
            colKey: 'op',
            title: '操作',
            cell() {
              return (
                <>
                  <Button theme='primary' variant='text'>
                    编辑
                  </Button>
                  <Button theme='primary' variant='text'>
                    分配角色
                  </Button>
                  <Button theme='primary' variant='text'>
                    删除
                  </Button>
                </>
              );
            },
          },
        ]}
          rowKey={"id"} loading={loading}
          data={contractList}
          pagination={{
            defaultCurrent: 1,
            defaultPageSize: 10,
            total,
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
      </Card>
    </div>
  )
}

export default memo(TableEncapsulation)