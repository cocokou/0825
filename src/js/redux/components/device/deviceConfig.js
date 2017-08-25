import React from 'react';
import { Input, Select, Checkbox, Button, Table, Icon, Layout, Breadcrumb, Modal } from 'antd';
const { Content } = Layout;
const CheckboxGroup = Checkbox.Group;
import { Link } from 'react-router';

export default class DeviceConfigForm extends React.Component {
    render() {
        const plainOptions = ['操作员', '产品经理', '人资经理']
        return (
            <div style={{ marginLeft: '26px', }}>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>设备管理</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/dm/device">设备管理</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>设备配置</Breadcrumb.Item>
                </Breadcrumb>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Content style={{ padding: '0 0px', minHeight: 280 }}>
                        <div class="form-panel">
                            <div class="panel-body">
                                <div class="form-group form-inline">
                                    <label>{'　name：'}</label>
                                    <Input type="text" style={{ width: 200 }} />
                                </div>
                                <div class="form-group form-inline">
                                    <label>{'　type：'}</label>
                                    <Input type="password" style={{ width: 200 }} />
                                </div>
                                <div class="form-group form-inline">
                                    <label>Role：</label>
                                    <Input type="text" style={{ width: 200 }} />
                                </div>
                                <div class="form-group form-inline">
                                    <label>{'app_group_id：'}</label>
                                    <Input type="text" style={{ width: 200 }} />
                                </div>

                                <div class="form-group form-inline">
                                    <label>{'　　　point：'}</label>
                                    <Select style={{ width: 200 }} />
                                </div>

                

                            </div>
                            <Button style={{ float: 'right' }} type='primary'>提交</Button>
                            <Button style={{ float: 'right' }} class="space-right" >取消</Button>
                        </div>
                    </Content>
                </Layout>
            </div>
        )
    }
}