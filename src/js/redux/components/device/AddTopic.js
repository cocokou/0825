import React, { Component } from 'react';
import Nav from '../common/pc_nav';
import { Steps, Form, Input, Tooltip, Layout, Icon, Breadcrumb, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Modal, DatePicker } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const { Content, Sider } = Layout;


class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            loading: false,
            visible: false,
        };
    }

    // 模态框相关函数
    showModal() {
        this.setState({
            visible: true,
        })
    }
    handleOk() {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    }
    handleCancel() {
        this.setState({ visible: false })
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                let  comment = {
                    key: values.type,
                    type: values.type,
                    topic: values.topic,
                    username: values.username,
                    password: values.password,
                    description: values.description
                }

                this.props.addTopic(comment)
                
            }
        });
            this.setState({ loading: false, visible: false });
            this.props.form.resetFields()
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { current, visible } = this.state;
        const config = {
            rules: [{ type: 'object', required: true, message: '请选择时间' }],
        };
        const formItemLayout = {
            labelCol: {
                xs: { span: 4 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };


        return (
            <div>
                <Button type="primary" onClick={this.showModal.bind(this)}>添加</Button>
                <Modal
                    visible={visible}
                    title="添加设备类型"
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    footer={[
                        <div className="steps-action">
                            <Button type="default" onClick={this.handleCancel.bind(this)}>取消</Button>
                            <Button type="primary" onClick={this.handleSubmit.bind(this)}>确认</Button>

                        </div>
                    ]}
                >

                        <Form>

                            <FormItem
                                {...formItemLayout}
                                label="设备类型"
                                hasFeedback

                            >
                                {getFieldDecorator('type', {
                                    rules: [{ required: true, message: 'Please input device type' }],
                                })(
                                    <Input />
                                    )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="主题"
                                hasFeedback
                            >
                                {getFieldDecorator('topic', {
                                    rules: [{ required: true, message: 'Please input the topic!' }],
                                })(
                                    <Input />
                                    )}
                            </FormItem>


                            <FormItem
                                {...formItemLayout}
                                label="Username"
                                hasFeedback
                            >
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input username' }],
                                })(
                                    <Input />
                                    )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="Password"
                                hasFeedback
                            >
                                {getFieldDecorator('password', {
                                    rules: [{
                                        required: true, message: 'Please input password!',
                                    }, {
                                        validator: this.checkConfirm,
                                    }],
                                })(
                                    <Input />
                                    )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="描述"
                                hasFeedback
                            >
                                {getFieldDecorator('description', {
                                    rules: [{
                                        required: true, message: 'Please input description',
                                    }, {
                                        validator: this.checkConfirm,
                                    }],
                                })(
                                    <Input type="textarea" />
                                    )}
                            </FormItem>

                        </Form>

                </Modal>
            </div>
        );
    }
}


const WrappedRegistrationForm = Form.create()(RegistrationForm);
class AddTopic extends React.Component {

    render() {
        return (

            <WrappedRegistrationForm addTopic={this.props.addTopic} />
        )
    }
}

export default AddTopic