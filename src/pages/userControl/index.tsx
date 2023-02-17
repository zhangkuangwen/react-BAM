import React, { memo, useState, useEffect,createRef } from "react";
import { Dialog, Button, Form, Input, Radio, Select, Textarea, Card, Space } from 'tdesign-react';
import Style from "./index.module.less"
import Table from "@/components/table"
const { FormItem } = Form;


function UserControl() {
  function searchByName(searchName: string) {

  }
  function openEditingView(row: any) {

  }
  function openCastView(row: any) {

  }
  function deletes(row: any) {

  }
  function openAddView() {
    setaddViewBool(true)
    console.log(addForm.current)
    console.log(form)
    // addForm.current.clearValidate()
  }
  function deletesSelect() {

  }
  const [form] = Form.useForm();
  const addForm = React.useRef<any>()
  const [total, settotal] = useState(0)
  const [contractList, setcontractList] = useState([])
  const [addViewBool, setaddViewBool] = useState(false)
  const [searchName, onsearchName] = useState('');

  const columns = [
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
      cell(scope:any) {
        return (
          <>
            <Button theme='primary' variant='text' onClick={() => openEditingView(scope.row)}>
              编辑
            </Button>
            <Button theme='primary' variant='text' onClick={() => openCastView(scope.row)}>
              分配角色
            </Button>
            <Button theme='primary' variant='text' onClick={() => deletes(scope.row)}>
              删除
            </Button>
          </>
        );
      },
    },
  ]
  function addUser(){
    console.log(form.getFieldsValue?.(true))
    console.log(addForm.current.getFieldsValue())
  }
  return (
    <div className={Style.h_full}>
      <Card className={Style.h_full}>
        <div className={`${Style.flex_between} ${Style.margin_tottom_20}`}>
          <div className={Style.flex}>
            <Input value={searchName} />
            <Button onClick={() => searchByName(searchName)}>搜索</Button>
          </div>
          <div>
            <Space>
              <Button theme="primary" onClick={openAddView}>新增</Button>
              <Button theme="warning" onClick={() => deletesSelect()}>批量删除</Button>
            </Space>
          </div>
        </div>
        <Table columns={columns} contractList={contractList} total={total} />
      </Card>
      <Dialog visible={addViewBool} header='添加角色' onConfirm={()=>addUser()}  onCancel={()=>setaddViewBool(false)}>
        <Form ref={addForm} form={form} rules={{
          name: [{ required: true, message: '必填', type: 'error' }],
          password: [{ required: true, message: '必填', type: 'error' }],
          rePassword: [
            // 自定义校验规则
            { required: true, message: '密码必填', type: 'error' },
            { validator: (val: any) => new Promise((reslove) => setTimeout(() => reslove(addForm.current.getFieldValue('password') == val))), message: '两次密码不一致' },
          ],
          gender: [{ required: true, message: '必填', type: 'error' }],
          phone: [{
            validator: (val: string) => /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(val), message: "手机号格式不对"
          }]
        }}>
          <FormItem label="账号" name="name" initialData="">
            <Input />
          </FormItem>
          <FormItem label="密码" name="password" initialData="">
            <Input type="password" />
          </FormItem>
          <FormItem label="确认密码" name="rePassword" initialData="">
            <Input type="password" />
          </FormItem>
          <FormItem label="性别" name="gender" initialData="1">
            <Radio.Group>
              <Radio value="1">男</Radio>
              <Radio value="2">女</Radio>
            </Radio.Group>
          </FormItem>
          <FormItem label="邮箱" name="email" initialData="">
            <Input />
          </FormItem>
          <FormItem label="手机号" name="phone" initialData="">
            <Input />
          </FormItem>
          <FormItem label="角色" name="role">
            {/* <Select options={{}} clearable></Select> */}
          </FormItem>
          <FormItem label="简介" name="description" initialData="">
            <Textarea />
          </FormItem>
        </Form>
      </Dialog>
    </div>
  )
}

export default memo(UserControl)