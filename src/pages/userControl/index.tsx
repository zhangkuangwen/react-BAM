import React, { memo, useState, useEffect, createRef } from "react";
import { Dialog, Button, Form, Input, Radio, Select, Textarea, Card, Space, MessagePlugin, DialogPlugin, Message } from 'tdesign-react';
import Style from "./index.module.less"
import Table from "@/components/table"
const { FormItem } = Form;
import http from "@/network/requestApl"
/* 
function 搜索
*/
function UserControl() {
  const [total, settotal] = useState(0)
  const [form] = Form.useForm();
  const [changeFrom] = Form.useForm()
  const [params, setparams] = useState({
    name: "",
    pageNo: 1,
    pageSize: 10
  })
  const [contractList, setcontractList] = useState([])
  const [addViewBool, setaddViewBool] = useState(false)
  const [changeViewBool, setchangeViewBool] = useState(false)
  const [searchName, onsearchName] = useState('');
  const [tabLoading, settabloading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  /* 
  function 用户删除
  */
  function searchByName() {
    params.name = searchName
    setparams({
      ...params,
      pageNo: 1
    })
    queryUserlist()
  }
  /* 
  function 打开修改页面
  */
  function openEditingView(row: any) {
    setchangeViewBool(true)
    changeFrom.setFieldsValue({
      name: row.name,
      gender: row.gender,
      email: row.email,
      phone: row.phone,
      roleName: row.roleName,
      description: row.description
    })
  }
  /* 
  function 修改用户信息
  */
  function updatetUserInfo() {
    http.updatetUserInfo(changeFrom.getFieldsValue?.(true)).then((res:any)=>{
      if(res.code===500){
        MessagePlugin.error(res.msg)
      }else{
        MessagePlugin.success('修改成功')
        queryUserlist()
      }
    },rej=>{
      MessagePlugin.error("修改失败")
    })
  }
  /* 
  function 删除
  */
  function deletes(row: any) {
    const confirmDia = DialogPlugin.confirm({
      header: '批量删除',
      body: '你是否要删除当前用户',
      confirmBtn: '是',
      cancelBtn: '否',
      onConfirm: ({ e }) => {
        http.delectUserInfo({ id: row.id }).then((res: any) => {
          if (res.code === 500) {
            MessagePlugin.error(res.msg)
          } else {
            MessagePlugin.success("删除成功")
          }
        }, rej => {
          MessagePlugin.error(rej)
        })
        confirmDia.hide();
      },
      onClose: ({ e, trigger }) => {
        MessagePlugin.info("放弃删除")
        confirmDia.hide();
      },
    });
  }

  /* 
  function 打开新增页面
  */
  function openAddView() {
    setaddViewBool(true)
    form.clearValidate()
  }
  /* 
  function 批量删除
  */
  function deletesSelect() {
    const confirmDia = DialogPlugin.confirm({
      header: '批量删除',
      body: '你是否要删除当前选中的用户',
      confirmBtn: '是',
      cancelBtn: '否',
      onConfirm: ({ e }) => {
        http.delectUserInfo({ id: selectedRowKeys.toString() }).then((res: any) => {
          if (res.code === 500) {
            MessagePlugin.error(res.msg)
          } else {
            MessagePlugin.success("删除成功")
          }
        }, rej => {
          MessagePlugin.error(rej)
        })
        confirmDia.hide();
      },
      onClose: ({ e, trigger }) => {
        MessagePlugin.info("放弃删除")
        confirmDia.hide();
      },
    });
  }

  /* 
  function 获取用户列表
  */
  function queryUserlist() {
    settabloading(true)
    http.queryUserlist({
      ...params
    }).then((res) => {
      settabloading(false)
      let { list, total } = res.data
      setcontractList(list)
      settotal(total)
    }, rej => {
      settabloading(false)
      setcontractList([])
      settotal(0)
    })
  }
  /* 
  function 添加用户
  */
  function addUser() {
    form.validateOnly().then(res => {
      if (res === true) {
        http.addUserInfo(form.getFieldsValue?.(true)).then((res: any) => {
          if (res.code === 500) {
            MessagePlugin.error(res.msg)
          } else {
            MessagePlugin.success('添加成功')
            queryUserlist()
          }
        })
      } else {
        let errMsg = Object.values(res)[0]
        MessagePlugin.error(errMsg[0].message)
      }
    }, rej => {
      MessagePlugin.error(rej)
    })
  }
  /* 
  function 页码 发生改变
  */
  function onPageChange(pageInfo: { pageSize: any; current: any; }) {
    setparams((res)=>({
      ...res,pageSize:pageInfo.pageSize,pageNo:pageInfo.current
    }))
  }
  useEffect(() => {
    queryUserlist()
  }, [])

  return (
    <div className={Style.h_full}>
      <Card className={Style.h_full}>
        <div className={`${Style.flex_between} ${Style.margin_tottom_20}`}>
          <div className={Style.flex}>
            <Input value={searchName} onChange={(value) => {
              onsearchName(value);
            }} />
            <Button onClick={() => searchByName()}>搜索</Button>
          </div>
          <div>
            <Space>
              <Button theme="primary" onClick={openAddView}>新增</Button>
              <Button theme="warning" onClick={() => deletesSelect()}>批量删除</Button>
            </Space>
          </div>
        </div>
        <Table params={params}  columns={[
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
            colKey: 'email',
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
            cell(scope: any) {
              return (
                <>
                  <Button theme='primary' variant='text' onClick={() => openEditingView(scope.row)}>
                    编辑
                  </Button>

                  <Button theme='primary' variant='text' onClick={() => deletes(scope.row)}>
                    删除
                  </Button>
                </>
              );
            },
          },
        ]} contractList={contractList} total={total} tabLoading={tabLoading} selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} onPageChange={onPageChange} />
      </Card>
      <Dialog visible={addViewBool} header='添加用户' onConfirm={() => addUser()} onCancel={() => setaddViewBool(false)} placement='center'>
        <Form form={form} rules={{
          name: [{ required: true, message: '请输入用户名', type: 'error' }],
          password: [{ required: true, message: '请输入密码', type: 'error' }],
          rePassword: [
            // 自定义校验规则
            { required: true, message: '请输入确认密码', type: 'error' },
            { validator: (val: any) => new Promise((reslove) => setTimeout(() => reslove(form.getFieldValue('password') == val))), message: '两次密码不一致' },
          ],
          gender: [{ required: true, message: '请选择性别', type: 'error' }],
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
          <FormItem label="角色" name="roleName">
            {/* <Select options={{}} clearable></Select> */}
          </FormItem>
          <FormItem label="简介" name="description" initialData="">
            <Textarea />
          </FormItem>
        </Form>
      </Dialog>
      <Dialog visible={changeViewBool} header='修改用户信息' onConfirm={() => updatetUserInfo()} onCancel={() => setchangeViewBool(false)} placement='center'>
        <Form form={changeFrom} rules={{
          name: [{ required: true, message: '请输入用户名', type: 'error' }],
          gender: [{ required: true, message: '请选择性别', type: 'error' }],
          phone: [{
            validator: (val: string) => /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(val), message: "手机号格式不对"
          }]
        }}>
          <FormItem label="账号" name="name" initialData="" >
            <Input disabled />
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
          <FormItem label="角色" name="roleName">
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