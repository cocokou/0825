import React from 'react';
import {Link} from 'react-router';
import {
    Input,
    Select,
    Button,
    Layout,
    Table,
    Tree,
    Icon,
    Breadcrumb,
    TreeSelect,
    Dropdown,
    Row,
    Col,
    Card,
    Popconfirm,
    Upload
} from 'antd';
import Nav from '../common/pc_nav';
import * as config from 'config/app.config.js';
import AddOrg from './AddOrg'
import {getOrgList,getDeviceUserName} from 'actions/index';
import './table.css';
const {Content, Sider} = Layout;

var dataEnd = [];
class TopHeader extends React.Component {
    constructor(props){
        super(props);
        this.state={
            data:data,
        }
    }
    render() {
        return (
            <div>
                <Breadcrumb style={{margin: '12px 0'}}>
                    <Breadcrumb.Item>设备管理</Breadcrumb.Item>
                    <Breadcrumb.Item>设备组</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        )
    }
}

const data=[{
    key:'1',
    name:'',
    age:'',
    address:'',
},{
    key:'2',
    name:'',
    age:'',
    address:'',
},{
    key:'3',
    name:'',
    age:'',
    address:'',
}];
/*class TableTest extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:data,
        };
        this.columns=[{
            title:'one',
            key:'one',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'one', text),
            fixed:"true"

        },{
            title:'two',
            key:"two",
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'two', text),
            fixed:"true"
        },{
            title:'three',
            key:'three',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'three', text),
            fixed:"true"
        }];
    }
    render(){
        return(
            <div>
                <Table columns={this.columns} dataSource={data} bordered />
            </div>
        )
    }
    componentWillMount(){

    }
    renderColumns(data,index,key,text){
        const value=index;
        return(
            <div id="target" style={{width:"100px",height:"20px"}}></div>
        )
    }
}*/

//area
const TreeNode = Tree.TreeNode;
class Demo extends React.Component {
    onSelect (selectedKeys, info){
        console.log('selected', selectedKeys, info);
        console.log(info.selectedNodes[0].props.title)
    }
    render() {
        return (
            <Tree
                showLine
                defaultExpandedKeys={['0-0-0']}
                onSelect={this.onSelect.bind(this)}
            >
                <TreeNode title="深圳" key="0-0">
                    <TreeNode title="商场1" key="0-0-0">
                        <TreeNode title="楼层1" key="0-0-0-0" />
                        <TreeNode title="楼层2" key="0-0-0-1" />
                        <TreeNode title="楼层3" key="0-0-0-2" />
                    </TreeNode>
                    <TreeNode title="parent 1-1" key="0-0-1">
                        <TreeNode title="leaf" key="0-0-1-0" />
                    </TreeNode>
                    <TreeNode title="parent 1-2" key="0-0-2">
                        <TreeNode title="leaf" key="0-0-2-0" />
                        <TreeNode title="leaf" key="0-0-2-1" />
                    </TreeNode>
                </TreeNode>
            </Tree>
        );
    }
}
class Org extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            index: '',
            record: ''
        };
        // this.columns = [{
        //     title: '编号(id)',
        //     dataIndex: 'id',
        //     key: 'id',
        //     render: id => <a href="#">{id}</a>,
        // }, {
        //     title: '部门名称',
        //     dataIndex: 'name',
        //     key: 'name',
        // }, {
        //     title: '包含设备数',
        //     dataIndex: 'device_qty',
        //     key: 'device_qty'
        // }, {
        //     title: '操作',
        //     key: 'action',
        //     render: (record, index) => (
        //         <Popconfirm title="确定要删除设备组吗？" onConfirm={this.onDelete.bind(this, index)} placement="leftBottom"
        //                     okText="删除" cancelText="取消">
        //             <a href="javascript:;">删除</a>
        //         </Popconfirm>
        //     ), props
        // }];


    } // end of constructor

    onDelete(index) {
        const dataSource = [...this.state.dataSource];
        dataSource.splice(index, 1);//index为获取的索引，后面的 1 是删除几行
        this.setState({dataSource});
    }

    //增加设备组
    addOrg(comment) {
        const dataSource = [...this.state.dataSource];
        dataSource.unshift(comment);
        this.setState({dataSource})
    }
    render() {
        return (
            <div>
                <TopHeader />
                <Layout style={{padding: '24px 0', background: '#fff'}}>
                    <Sider width={200} style={{background: '#fff'}}>
                        <Nav />
                    </Sider>
                    <Content style={{padding: '0 24px', minHeight: 280}}>
                 
{                        // <Table columns={this.columns} rowKey="id"
                        //        dataSource={this.state.dataSource}
                        // />
}                        {/*<TableTest/>*/}
                        <table>
                            <div>
{                                // <Button type="primary" onClick={this.handConfirm.bind(this)}>确定</Button>
}                                <Button type="danger"  style={{marginLeft:"10px"}}>
                                    <Popconfirm title="确定要全部清除吗？"  okText="删除" cancelText="取消" onConfirm={this.handCancel.bind(this)}>
                                        清除
                                    </Popconfirm>
                                </Button>
                            </div>
                            <tr>
                                <td>
                                    <select id="sel1">
                                        <option>深圳市</option>
                                        <option>武汉市</option>
                                    </select>

                                    <select className="sub">
                                        <option>深圳商城1</option>
                                        <option>深圳商城2</option>
                                    </select>
                                    <select className="sub">
                                        <option>商场1</option>
                                        <option>商场2</option>
                                    </select>
                                </td>
                                <td className="table">
                                    {/*"确定"和"全部取消"的按钮*/}
                                    <table className="aa">
                                        <tr style={{height:"40px"}}>
                                            <td >一区</td>
                                            <td >二区</td>
                                            <td >三区</td>
                                            <td >四区</td>
                                        </tr>
                                        <tr>
                                            <td  id="target11"></td>
                                            <td  id="target12"></td>
                                            <td  id="target13"></td>
                                            <td  id="target14"></td>
                                        </tr>
                                        <tr >
                                            <td  id="target21"></td>
                                            <td  id="target21"></td>
                                            <td  id="target21"></td>
                                            <td  id="target21"></td>
                                        </tr>
                                        <tr >
                                            <td  id="target31"></td>
                                            <td  id="target31"></td>
                                            <td  id="target31"></td>
                                            <td  id="target31"></td>
                                        </tr>
                                        <tr >
                                            <td  id="target41"></td>
                                            <td  id="target41"></td>
                                            <td  id="target41"></td>
                                            <td  id="target41"></td>
                                        </tr>
                                        <tr >
                                            <td  id="target51"></td>
                                            <td  id="target51"></td>
                                            <td  id="target51"></td>
                                            <td  id="target51"></td>
                                        </tr>
                                        <tr >
                                            <td  id="target61"></td>
                                            <td  id="target61"></td>
                                            <td  id="target61"></td>
                                            <td  id="target61"></td>
                                        </tr>
                                        <tr >
                                            <td  id="target71"></td>
                                            <td  id="target71"></td>
                                            <td  id="target71"></td>
                                            <td  id="target71"></td>
                                        </tr>
                                        <tr >
                                            <td  id="target81"></td>
                                            <td  id="target81"></td>
                                            <td  id="target81"></td>
                                            <td  id="target81"></td>
                                        </tr>
                                    </table>
                                  
                                </td>
                                <td className="table wuhan">
                                    <table>
                                        <tr style={{height:"40px"}}>
                                            <td >一区</td>
                                            <td >二区</td>
                                            <td >三区</td>
                                            <td >四区</td>
                                        </tr>
                                        <tr>
                                            <td  id="target11"></td>
                                            <td  id="target12"></td>
                                            <td  id="target13"></td>
                                            <td  id="target14"></td>
                                        </tr>
                                        <tr >
                                            <td  id="target21"></td>
                                            <td  id="target21"></td>
                                            <td  id="target21"></td>
                                            <td  id="target21"></td>
                                        </tr>
                                        <tr >
                                            <td  id="target31"></td>
                                            <td  id="target31"></td>
                                            <td  id="target31"></td>
                                            <td  id="target31"></td>
                                        </tr>
                                        <tr >
                                            <td  id="target41"></td>
                                            <td  id="target41"></td>
                                            <td  id="target41"></td>
                                            <td  id="target41"></td>
                                        </tr>
                                        <tr >
                                            <td  id="target51"></td>
                                            <td  id="target51"></td>
                                            <td  id="target51"></td>
                                            <td  id="target51"></td>
                                        </tr>
                                    </table>

                                </td>
                                <td>

                                    <table className="tableList">
                                        <tr style={{height:"40px"}}>
                                            <td id="draggable5" style={{width : "150",height:"30px",background:"lightGreen"}}>入口设备_01</td>
                                        </tr>
                                        <tr style={{height:"40px"}}>
                                            <td id="draggable6" style={{width : "150",height:"30px",background:"lightGreen"}}>入口设备_02</td>
                                        </tr>
                                        <tr style={{height:"40px"}}>
                                            <td id="draggable7" style={{width : "150",height:"30px", background:"#f28860"}}>出口_003</td>
                                        </tr>
                                        <tr style={{height:"40px"}}>
                                            <td id="draggable8" style={{width : "150",height:"30px",background:"#f28860"}}>出口_004</td>
                                        </tr> 
                                
                                        <tr style={{height:"40px"}}>
                                            <td id="draggable9" style={{width : "150",height:"30px", background:"#f1ccb8"}}>设备-005</td>
                                        </tr>
                                        <tr style={{height:"40px"}}>
                                            <td id="draggable10" style={{width : "150",height:"30px",background:"#f1ccb8"}}>设备-006</td>
                                        </tr>
                                        <tr style={{height:"40px"}}>
                                            <td id="draggable11" style={{width : "150",height:"30px", background:"#f1ccb8"}}>设备-007</td>
                                        </tr>
                                        <tr style={{height:"40px"}}>
                                            <td id="draggable12" style={{width : "150",height:"30px",background:"#f1ccb8"}}>设备-008</td>
                                        </tr>
                                    </table>

                                    <table className="tableList">
                                        <tr style={{height:"40px"}}>
                                            <td id="draggable1" style={{width : "150",height:"30px",background:"#108ee9"}}>设备001</td>
                                        </tr>
                                        <tr style={{height:"40px"}}>
                                            <td id="draggable2" style={{width : "150",height:"30px",background:"lightGreen"}}>设备002</td>
                                        </tr>
                                        <tr style={{height:"40px"}}>
                                            <td id="draggable3" style={{width : "150",height:"30px", background:"salmon"}}>设备003</td>
                                        </tr>
                                        <tr style={{height:"40px"}}>
                                            <td id="draggable4" style={{width : "150",height:"30px",background:"#ea1"}}>设备006</td>
                                        </tr>
                                    </table>


                                </td>
                            </tr>
                        </table>
      
                    </Content>

                </Layout>
            </div>
        );
    }
    //确定、清除、返回上一步的事件操作
    handConfirm() {
        $('td[id^="target"]').find("img").remove();
    }
    handCancel(){
        $('td[id^="target"]').children().remove()
    };


    componentDidMount() {
        $().ready(function() {
            //拖拽复制体
            $('td[id^="draggable"]').draggable({
                helper:"clone",
                cursor: "crosshair",
                revert:true,
            });
            //释放后
            $('td[id^="target"]').droppable({
                drop:function(event,ui){
                    console.log(ui);
                    $(this).children().remove();
                    let source = ui.draggable.clone();
                    console.log(source);
                    /*console.log(source.context.innerText);*/
                    $('<img/>', {
                        src: '/src/images/btn_delete.png',
                        style:'display:none;padding-left:10%;vertical-align:middle;',
                        click: function() {
                            source.remove();
                        }
                    }).appendTo(source);
                    source.mouseenter(function () {
                        $(this).find("img").show();
                    });
                    source.mouseleave(function () {
                        $(this).find("img").hide();
                    });
                    $(this).append(source);
                    /*console.log($(this)["context"].innerText);*/
                    console.log($(this)[0].innerText);
                    console.log("获得的值是 "+$('td[id="target12"]')[0].innerText);
                }
            });
            $("#sel1").change(function(){
                $("#sel1 option").each(function(i,o){
                    if($(this).prop("selected")){
                        $(".sub").hide();
                        let subSelect=$(".sub").eq(i);
                        let tableSelect=$(".table").eq(i);
                        $(".tableList").hide();
                        $(".tableList").eq(i).show();
                        subSelect.show().change(function(){
                            subSelect.children().each(function(j,o){
                                if($(this).prop("selected")){
                                    $(".table").hide();
                                    tableSelect.show();

                                }
                            })
                        });
                        $(".sub").eq(i).change();
                    }
                });

            });
            $("#sel1").change();
        });

    }
}
export default Org;

