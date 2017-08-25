import React,{PropTypes,Component} from 'react';
import Nav from '../common/pc_nav';
import { Steps,Form, Input, Tooltip, Layout,Icon,Breadcrumb, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,Modal,DatePicker } from 'antd'; ///////////////////////////
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { Content, Sider } = Layout;
//部门选择数据


//进度条数据

class RegistrationForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            loading:false,
            visible:false,
            username:'',

        };
    }



    // 模态框相关函数
    showModal(){
        this.setState({
            visible:true,
        })
    }
    handleOk() {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    }
    handleCancel(){
        this.setState({visible:false})
    }

    handleSubmit(e){
        e.preventDefault();
/*        const comment={

            key: count,
            name: this.props.form.getFieldValue('userName'),
            type: '桌面式读写器',
            status: '正常',
            last_update_time: '2017-01-01 12:00',
            org: 'A部门',
            location: '* * *',
            placeholder:"请输入设备名称"
        }*/
        console.log(this.props.form.getFieldsValue());

        this.props.form.validateFieldsAndScroll((err, value) => {
            if (!err) {

/*                this.props.formAdd(comment)*/
                /*this.setState({current:0,visible:false,count:count})*/
                console.log(value);

            }
        });

    }
    onPull(){
        this.setState({placeholder:this.props.form.getFieldValue('userName')})
    }

    render() {
        const { getFieldDecorator,getFieldProps } = this.props.form;
        const { visible} = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };

        return (
            <div>
                <a type="primary" onClick={this.showModal.bind(this)}>编辑</a>
                <Modal
                    visible={visible}
                    title="新增设备"
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    footer={[
                        <div className="steps-action">
                            <Button type="primary" onClick={this.handleSubmit.bind(this)}>确认</Button>

                            <Button type="default" onClick={this.handleCancel.bind(this)}>取消</Button>

                        </div>
                    ]}
                >
                    <div className="steps-content">
                        <Form>

                            <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>设备名称&nbsp;</span>
                                )}
                                hasFeedback
                            >
                                {getFieldDecorator('nickname', {
                                    rules: [{required: true, message: '请输入合适的名称', whitespace: true, min: 2}],
                                })(
                                    <Input {...getFieldProps('userName')} placeholder={this.state.placeholder}
                                           onChange={this.onPull.bind(this)} value={this.props.name}/>
                                )}

                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>设备类型&nbsp;</span>
                                )}
                                hasFeedback
                            >
                                {getFieldDecorator('nicktype', {
                                    rules: [{required: true, message: '请输入合适的类型', whitespace: true, min: 2}],
                                })(
                                    <Input defaultValue="0571"/>
                                )}
                            </FormItem>

                        </Form>
                    </div>
                </Modal>
            </div>
        );
    }
}


const WrappedRegistrationForm = Form.create()(RegistrationForm);
class WatchManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            operate_modal_visible: false,
        }
    }
    render(){
        return(
            <WrappedRegistrationForm formAdd={this. props.formAdd}/>
        )
    }
}
WatchManage.propTypes={
    formAdd:React.PropTypes.func
}
export default WatchManage