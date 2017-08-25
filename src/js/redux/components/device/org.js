import React from 'react';
import { Link } from 'react-router';
import { Input, Select, Button, Layout, Table, Icon, Breadcrumb, TreeSelect, Dropdown, Row, Col, Card, Popconfirm, Upload } from 'antd';
import Nav from '../common/pc_nav';
import * as config from 'config/app.config.js';
import AddOrg from './AddOrg'
import { getOrgList } from 'actions/index';


const { Content, Sider } = Layout;

var data1 = [];
class TopHeader extends React.Component {
  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>设备管理</Breadcrumb.Item>
          <Breadcrumb.Item>查看部门</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
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

    this.columns = [{
      title: '编号(id)',
      dataIndex: 'id',
      key: 'id',
      render: id => <a href="#">{id}</a>,
    }, {
      title: '部门名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '包含设备数',
      dataIndex: 'device_qty',
      key: 'device_qty'
    }, {
      title: '操作',
      key: 'action',
      render: (record, index) => (
        <Popconfirm title="确定要删除设备组吗？" onConfirm={this.onDelete.bind(this, index)} placement="leftBottom" okText="删除" cancelText="取消">
          <a href="javascript:;" >删除</a>
        </Popconfirm>
      ), props
    }];


    this.onDelete = this.onDelete.bind(this);
    this.addOrg = this.addOrg.bind(this);

  } // end of constructor


  onDelete(index) {
    const dataSource = [...this.state.dataSource]
    dataSource.splice(index, 1);//index为获取的索引，后面的 1 是删除几行
    this.setState({ dataSource });
  }


  //增加设备组
  addOrg(comment) {
    const dataSource = [...this.state.dataSource]
    dataSource.unshift(comment);
    this.setState({ dataSource })
  }


  render() {

    return (

      <div>
        <TopHeader />

        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Nav />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {     // <Row gutter={60}>
              //   <Col span={4}>
              //     <AddOrg addOrg={this.addOrg} />
              //     </Col>
              //   <Col span={4}>
              //     <Link to="/dm/test/add"><Button type="primary">Add Org</Button></Link>
              //   </Col>
              // </Row>
            }
            <Table columns={this.columns} rowKey="id"
              dataSource={this.state.dataSource}
            />
         <Button><Link to="/dm/org2">查看模拟</Link></Button>
          </Content>
        </Layout>

      </div>

    );
  }


  componentDidMount() {


    getOrgList()
      //data
      .done((data) => {
        function findRoot(lst) {
          // root: 没有father
          //
          for (let i = 0; i < lst.length; i++) {
            let now = lst[i];
            let findfather = false;
            for (let j = 0; j < lst.length; j++) {
              if (now.parent_id === lst[j].id) {
                findfather = true;
                break;
              }
            }
            if (findfather !== true) { // find the root of lst
              return lst[i];
            }
          }
          return null;
        }

        function addSon(father, son) {
          if (father === null || son === null) {
            return null;
          }
          if (father.hasOwnProperty('children')) {
            father.children.push(son)
          } else {
            father.children = [];
            father.children.push(son)
          }
          return father;
        }

        function findSons(me, lst) {
          lst.forEach(val => {
            if (me.id === val.parent_id) {
              addSon(me, val);
            }
          });
          return true;
        }

        function makeTree(lst) {
          let root = findRoot(lst);
          for (let i = 0; i < lst.length; i++) {
            findSons(lst[i], lst);
          }
          return root;
        }

        var dataEnd = makeTree(data)
        this.setState({ dataSource: [dataEnd] })
      })
      .fail(msg => {
        message(msg || '网络异常，请稍后再试')
      })
  }
}

export default Org;

