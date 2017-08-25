import React, { Component } from 'react';
import { Link } from 'react-router';
import { Input, Select, Button, Layout, Table, Icon, Breadcrumb, TreeSelect, Dropdown, Row, Col, Card, Popconfirm } from 'antd';
import Nav from '../common/pc_nav';
import * as config from 'config/app.config.js';
import AddTopic from './addtopic';
import { getDevicekinds } from 'actions/index';

const { Content, Sider } = Layout;

class TopHeader extends React.Component {
  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>设备管理</Breadcrumb.Item>
          <Breadcrumb.Item>管理设备主题</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}


class EditableCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      editable: this.props.editable || false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.editable !== this.state.editable) {
      this.setState({ editable: nextProps.editable });
      if (nextProps.editable) {
        this.cacheValue = this.state.value;
      }
    }
    if (nextProps.status && nextProps.status !== this.props.status) {
      if (nextProps.status === 'save') {
        this.props.onChange(this.state.value);
      } else if (nextProps.status === 'cancel') {
        this.setState({ value: this.cacheValue });
        this.props.onChange(this.cacheValue);
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.editable !== this.state.editable ||
      nextState.value !== this.state.value;
  }
  handleChange(e) {
    const value = e.target.value;
    this.setState({ value });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div>
        {
          editable ?
            <div>
              <Input
                value={value}
                onChange={e => this.handleChange(e)}
              />
            </div>
            :
            <div className="editable-row-text">
              {value.toString() || ' '}
            </div>
        }
      </div>
    );
  }
}


class ManageTopic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [{
        id: 'a',
        key: '1',
        type: 'TYPE-100',
        topic: '2.4G',
        description: '每一类设备，共用一组用户名密码',
        username: { editable: false, value: 'device_kin' },
        password: { editable: false, value: 'abcde****vb' },
      }, {
        id: 'b',
        key: '2',
        type: 'TYPE-600',
        topic: '433MHz',
        description: '用户名密码，对应一个主题',
        username: { editable: false, value: 'device_222' },
        password: { editable: false, value: '2****vb' },
      }, {
        id: 'c',
        key: '3',
        type: 'TYPE-800',
        topic: 'EPC-128',
        description: '每次连接成功，发送一个主题',
        username: { editable: false, value: 'device_888' },
        password: { editable: false, value: '***' },
      }],
      index: '',
      record: '',
      queryInfo: {
        pageSize: 10
      },
      filteredInfo: null,
      sortedInfo: null,
      pagination: {
        current: 1
      },
    };

    this.columns = [{
      title: '设备类型',
      dataIndex: 'type',
    }, {
      title: '用户名',
      dataIndex: 'username',
      render: (text, record, index) => this.renderColumns(this.state.dataSource, index, 'username', text),
    }, {
      title: '密码',
      dataIndex: 'password',
      render: (text, record, index) => this.renderColumns(this.state.dataSource, index, 'password', text),
    }, {
      title: '主题名称',
      dataIndex: 'topic',
    }, {
      title: '描述',
      dataIndex: 'description',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record, index) => {
        let { pagination, queryInfo } = this.state;
        let Index = index;
        if (pagination.current > 1) {
          Index = index + queryInfo.pageSize
        }
        const { editable } = this.state.dataSource[Index].username;
        return (
          <div>
            <span>
              <a href="#">查看</a>
            </span>
            <span className="ant-divider" />
            {
              editable ?
                <span>
                  <a onClick={this.editDone.bind(this, Index, 'save')}>保存</a>--
                                      <Popconfirm title="确定取消吗？" onConfirm={this.editDone.bind(this, Index, 'cancel')}>
                    <a>取消</a>
                  </Popconfirm>

                </span>
                :
                <span>
                  <a onClick={this.edit.bind(this, Index)}>编辑</a>
                </span>
            }

          </div>
        );
      }
    }];

    this.addTopic = this.addTopic.bind(this);
  }
  //edit 
  renderColumns(data, index, key, text) {

    let { pagination, queryInfo } = this.state;

    let Index = index;
    if (pagination.current > 1) {
      Index = index + queryInfo.pageSize * (pagination.current - 1)
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
      Index = index + queryInfo.pageSize * (pagination.current - 1)
    }
    let dataSource = this.state.dataSource;
    dataSource[Index][key].value = value;
    this.setState({ dataSource });
  }

  edit(index) {

    let dataSource = this.state.dataSource;
    if (dataSource[index].username.editable === false) {

      return dataSource[index].username.editable = true;
    }
 
    this.setState({ dataSource });
  }

  editDone(index, type) {
    let dataSource = [...this.state.dataSource];
    if (dataSource[index].username.editable === true) {
      dataSource[index].username.editable = false;
      dataSource[index].username.statuss = type
    }
    this.setState({ dataSource }, () => {
      Object.keys(dataSource[index]).forEach((item) => {
        if (dataSource[index][item] && typeof dataSource[index][item].editable !== 'undefined') {
          delete dataSource[index][item].statuss;
        }
      });
    });
  }


  //点击分页数
  handChange(pagination, filters, sorter) {
    const dataSource = this.state.dataSource;
    console.log('Various parameters', pagination, filters, sorter);

    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
      pagination: pagination,
      dataSource: dataSource
    });
  };
  //选择每页显示数量
  onSelChange(value) {
    this.setState({ queryInfo: { pageSize: value } });
    console.log(value)
  }

  addTopic(comment) {
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
            <h2 style={{ paddingBottom: 20, fontWeight: 500 }}>添加设备类型</h2>

            <AddTopic addTopic={this.addTopic} />
            <Table columns={this.columns} 
              dataSource={this.state.dataSource}
              onChange={this.handChange.bind(this)}
              pagination={{ pageSize: this.state.queryInfo.pageSize }}
            />
          </Content>
        </Layout>
      </div>
    );
  }
}


export default ManageTopic