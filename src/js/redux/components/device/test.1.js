import React from 'react';
import { Link } from 'react-router';
import { Input, Select, Button, Layout, Table, Icon, Breadcrumb, TreeSelect, Dropdown, Row, Col, Popconfirm, Cascader, InputNumber,Tree } from 'antd';
import Nav from '../common/pc_nav';
import * as config from 'config/app.config.js';
import EditableCell from './edit'
/*import { getDeviceList, getDevicekinds,getDeviceList } from 'actions/index';*/
import Summary from './summary'

const { Content, Sider } = Layout;
const Search = Input.Search;
const treeData = [];
const TreeNode = Tree.TreeNode;
var orgText='';
const statusData = [{
  label: "全选",
  value: '',
  key: '0-0-0'
}, {
  label: '正常',
  value: '正常',
  key: '0-0-1',
}, {
  label: '不正常',
  value: '不正常',
  key: '0-0-2',
}, {
  label: '未登记',
  value: '未登记',
  key: '0-0-3',
}];
const typeData = [{
  label: "全选",
  value: '',
  key: '0-0-4',
}, {
  label: "桌面式",
  value: '桌面式',
  key: '0-0-5',
}, {
  label: "固定式",
  value: '固定式',
  key: '0-0-6',
}, {
  label: "多通道",
  value: '多通道',
  key: '0-0-7',
}];

const  orgData = [{
  label: '',
  value: '深圳',disabled:true,
  key: '0-0',
  children: [{
    label: '',
    value: '科技园',disabled:true,
    key: '0-0-1',
    children: [{
      label: '',
      value: '研发部',disabled:true,
      key: '0-0-0-1',
    }, {
      label: '',
      value: '生产部',disabled:true,
      key: '0-0-0-2',
    }, {
      label: '',
      value: '销售部',disabled:true,
      key: '0-0-0-3',
    }]
  }, {
    label: '',
    value: '海岸城',disabled:true,
    key: '0-0-2',
  }]
}, {
  label: '',
  value: '北京',disabled:true,
  key: '0-1',
  children: [{
    label: '',
    value: '科技园',disabled:true,
    key: '0-2-2',
    children: [{
      label: '',
      value: '研发部',disabled:true,
      key: '0-2-2-1',
    }, {
      label: '',
      value: '生产部',disabled:true,
      key: '0-2-2-2',
    }, {
      label: '',
      value: '销售部',disabled:true,
      key: '0-2-2-3',
    }]
  }, {
    label: '',
    value: 'A部门',disabled:true,
    key: '0-1-1',
  },
  {
    label: '',
    value: 'B部门',disabled:true,
    key: '0-2-3',
  }]
}];

const deviceData = [{
  id: '1',
  key: '1',
  name: { editable: false, value: 'R2001' },
  type: '桌面式',
  status: '正常',
  last_update_time: '2017-01-01 12:00',
  org: '深圳科技园研发部',
  location: '* * *',
}, {
  id: '2',
  key: '2',
  name: { editable: false, value: 'F5002' },
  type: '固定式',
  status: '正常',
  last_update_time: '2017-01-01 12:00',
  org: '深圳科技园生产部',
  location: '* * *',
}, {
  id: '3',
  key: '3',
  name: { editable: false, value: 'F5803' },
  type: '多通道',
  status: '未登记',
  last_update_time: '2017-01-01 12:00',
  org: '深圳科技园销售部',
  location: '* * *',
}, {
  id: '4',
  key: '4',
  name: { editable: false, value: 'R2004' },
  type: '桌面式',
  status: '正常',
  last_update_time: '2017-01-01 12:00',
  org: '深圳科技园研发部',
  location: '* * *',
}, {
  id: '5',
  key: '5',
  name: { editable: false, value: 'F5005' },
  type: '固定式',
  status: '正常',
  last_update_time: '2017-01-01 12:00',
  org: '北京科技园研发部',
  location: '* * *',
}, {
  id: '6',
  key: '6',
  name: { editable: false, value: 'F5806' },
  type: '多通道',
  status: '未登记',
  last_update_time: '2017-01-01 12:00',
  org: '北京科技园生产部',
  location: '* * *',
}, {
  id: '7',
  key: '7',
  name: { editable: false, value: 'R2007' },
  type: '多通道',
  status: '不正常',
  last_update_time: '2017-01-01 12:00',
  org: '北京科技园生产部',
  location: '* * *',
}, {
  id: '8',
  key: '8',
  name: { editable: false, value: 'R2008' },
  type: '多通道',
  status: '不正常',
  last_update_time: '2017-01-01 12:00',
  org: '北京科技园生产部',
  location: '* * *',
}, {
  id: '9',
  key: '9',
  name: { editable: false, value: 'F5809' },
  type: '固定式',
  status: '不正常',
  last_update_time: '2017-01-01 12:00',
  org: '北京科技园销售部',
  location: '* * *',
}, {
  id: '10',
  key: '10',
  name: { editable: false, value: 'F5810' },
  type: '固定式',
  status: '不正常',
  last_update_time: '2017-01-01 12:00',
  org: '北京A部门',
  location: '* * *',
}, {
  id: '11',
  key: '11',
  name: { editable: false, value: 'F5811' },
  type: '固定式',
  status: '正常',
  last_update_time: '2017-01-01 12:00',
  org: '北京A部门',
  location: '* * *',
}, {
  id: '12',
  key: '12',
  name: { editable: false, value: 'F5812' },
  type: '固定式',
  status: '未登记',
  last_update_time: '2017-01-01 12:00',
  org: '深圳科技园研发部',
  location: '* * *',
},];

/*const Option = Select.Option;*/
/*var normal=0,unNormal=0,unKnow=0;*/
class TopHeader extends React.Component {
  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>设备管理</Breadcrumb.Item>
          <Breadcrumb.Item>查看设备</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}


class ListDevices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: deviceData,
      figureSource: deviceData,
      index: '',
      selectedRowKeys: [],
      selectedRows: [],
      record: '',
      queryInfo: {
      pageSize: 10
      },
      filteredInfo: null,
      sortedInfo: null,
      pagination: {
        current: 1
      },
      selFirst:'',
      normal:0,
      unNormal:0,
      unKnow:0,
    };

    this.onDelete = this.onDelete.bind(this);
    this.handleSelectedDelete = this.handleSelectedDelete.bind(this);
    this.columns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      render: id => <a href="#">{id}</a>,
    }, {
      title: '设备名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record, index) => this.renderColumns(this.state.dataSource, index, 'name', text),
    }, {
      title: '设备状态',
      dataIndex: 'status',
      key: 'status',

      onFilter: null,
    }, {
      title: '所属部门',
      dataIndex: 'org',
      key: 'org'
    }, {
      title: '设备类型',
      dataIndex: 'type',
      key: 'type',

    }, {
      title: '状态更新时间',
      dataIndex: 'last_update_time',
      key: 'last_update_time'
    }, {
      title: '设备位置',
      dataIndex: 'location',
      key: 'location'
    }, {
      title: '操作',
      key: 'action',
      render: (text, record, index) => {
        let { pagination, queryInfo } = this.state;
        let Index = index;
        if (pagination.current > 1) {
          Index = index + queryInfo.pageSize*(pagination.current-1)
        }
        const { editable } = this.state.dataSource[Index].name;
        return (
          <div>
            <span>
            <Link to="/dm/position/config"><a href="#">config</a></Link>
            </span>
            <span className="ant-divider" />
            {
              editable ?
                <span>
                  <a onClick={this.editDone.bind(this, Index, 'save')}>保存 </a>
                                      <Popconfirm title="Sure to cancel?" onConfirm={this.editDone.bind(this, Index, 'cancel')}>
                    <a> 取消</a>
                  </Popconfirm>

                </span>
                :
                <span>
                  <a onClick={this.edit.bind(this, Index)}>编辑</a>
                </span>
            }
            <span className="ant-divider" />
            <span>
              <Popconfirm title="设备删除后不能恢复，确定要删除这台设备吗？" onConfirm={this.onDelete.bind(this, Index)} placement="leftBottom" okText="删除" cancelText="取消">
                <a href="javascript:;" >删除</a>
              </Popconfirm>
            </span>
          </div>
        );
      }
    }];
  }
    componentWillMount(){
        let {normal,unNormal,unKnow,dataSource}=this.state;
        dataSource.map(function(record){
            let status=record.status;
            if(status==="正常"){
                normal+=1;
            }
            if(status==="不正常"){
                unNormal+=1;
            }
            if(status==="未登记"){
                unKnow+=1;
            }
        });
        this.setState({normal,unNormal,unKnow});

    }

  renderColumns(data, index, key, text) {
    let { pagination, queryInfo } = this.state;

    let Index = index;
    if (pagination.current > 1) {
       Index = index + queryInfo.pageSize*(pagination.current-1)
    }
    const { editable, value, statuss } = data[Index][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    return (<EditableCell
      editable={editable}
      value={value}
      onChange={value => this.handleChange(key, index, value)}
      status={statuss}
    />);
  }

  handleChange(key, index, value) {
    let { pagination, queryInfo } = this.state;
    let Index = index;
    if (pagination.current > 1) {
       Index = index + queryInfo.pageSize*(pagination.current-1)
    }
    let dataSource = this.state.dataSource;
    dataSource[Index][key].value = value;
    this.setState({ dataSource });
    console.log(Index + " 值为 " + value)
  }
  edit(index) {
    let dataSource = this.state.dataSource;
    if (dataSource[index].name.editable === false) {

      return dataSource[index].name.editable = true;
    }

    console.log(dataSource[index].name.editable);
    this.setState({ dataSource });
  }
  editDone(index, type) {
    let dataSource = [...this.state.dataSource];
    console.log(dataSource[index].name.editable);
    if (dataSource[index].name.editable === true) {
      dataSource[index].name.editable = false;
      dataSource[index].name.statuss = type
    }
    this.setState({ dataSource }, () => {
      Object.keys(dataSource[index]).forEach((item) => {
        if (dataSource[index][item] && typeof dataSource[index][item].editable !== 'undefined') {
          delete dataSource[index][item].statuss;
        }
      });
    });
  }
    onDelete(index) {
/*        let { pagination, queryInfo } = this.state;
        let Index = index;
        if (pagination.current > 1) {
            Index = index + queryInfo.pageSize*(pagination.current-1)
        }*/
        let { pagination, queryInfo } = this.state;
        const dataSource = [...this.state.dataSource];
        dataSource.splice(index, 1);//index为获取的索引，后面的 1 是删除几行
        if(index%queryInfo.pageSize===0 ){
            pagination.current-=1
        }
        this.setState({ dataSource });

        let normal=0,unNormal=0,unKnow=0;
        dataSource.map(function(record){
            let status=record.status;
            console.log(status);
            if(status==="正常"){
                normal+=1;
            }
            if(status==="不正常"){
                unNormal+=1;
            }
            if(status==="未登记"){
                unKnow+=1;
            }
        });
        this.setState({normal:normal,unNormal:unNormal,unKnow:unKnow});
    }

    handleSelectedDelete() {
        if (this.state.selectedRowKeys.length > 0) {
            const dataSource = [...this.state.dataSource];
            dataSource.splice(this.state.selectedRows, this.state.selectedRows.length);
            this.setState({ dataSource });
        }
        else {

        }

    }

      //点击分页数
    handChange (pagination, filters, sorter){
        const dataSource = this.state.dataSource;
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
            pagination:pagination,
            dataSource:dataSource
        });
    };
    //选择每页显示数量
    onSelChange(value){
        this.setState({queryInfo:{pageSize:value}});
        console.log(value)
    }


  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys: selectedRowKeys,
          selectedRows: selectedRows
        })
      },
    };
    return (

      <div>


        <div style={{ margin: 20 }}>每页显示数量：
        <InputNumber min={5} defaultValue={this.state.queryInfo.pageSize}
            onChange={this.onSelChange.bind(this)} />
        </div>
        <Table columns={this.columns}
          dataSource={this.state.dataSource}
          rowSelection={rowSelection} rowKey='id'
          onChange={this.handChange.bind(this)}
          pagination={{ pageSize: this.state.queryInfo.pageSize }}
        />

      </div>
    );
  }



}


export default class ManageDevice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    }
  }
  render() {
    var { list } = this.state;

    return (
      <div>
        <TopHeader />
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Nav />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>

            <ListDevices />

          </Content>
        </Layout>
      </div>
    )
  }

}