import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import {  Input, Select, Button, Layout, Table, Tree, Icon, Breadcrumb, TreeSelect, Dropdown, Row, Col, Card, Popconfirm, Upload } from 'antd';
import Nav from '../common/pc_nav';
import * as config from 'config/app.config.js';
import AddOrg from './AddOrg'
import { getOrgList, getDeviceUserName } from 'actions/index';
import './table2.css';
const { Content, Sider } = Layout;

var dataEnd = [];
class TopHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // data:data,
    }
  }
  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>设备管理</Breadcrumb.Item>
          <Breadcrumb.Item>设备组</Breadcrumb.Item>
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


  } // end of constructor



  render() {
    return (
      <div>
        <TopHeader />
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Nav />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>


          <table id="tb1" className="left" display="none">
          <tr>
            <th ondrop="drop(event)" ondragover="allowDrop(event)">s1</th>
            <th>s2</th>
            <th>s3</th>
          </tr>
          <tr>
            <td id="11" className='grid' ondrop="drop(event)" ondragover="allowDrop(event)"></td>
            <td id="12" className='grid' ondrop="drop(event)" ondragover="allowDrop(event)"></td>
            <td id="13" className='grid' ondrop="drop(event)" ondragover="allowDrop(event)"></td>
          </tr>
          <tr>
            <td id="21" className='grid' ondrop="drop(event)" ondragover="allowDrop(event)"></td>
            <td id="22" className='grid' ondrop="drop(event)" ondragover="allowDrop(event)"></td>
            <td id="23" className='grid' ondrop="drop(event)" ondragover="allowDrop(event)"></td>
          </tr>
        </table>

          </Content>

        </Layout>
      </div>
    );
  }

  
 allowDrop(ev) {
    // 不允许放置更多设备
    let c = $('#' + ev.target.id).attr('class');

     if (c == "grid" && ($('#' + ev.target.id).children().length > 0)) {

    } else if (c == "device") {
    } else {
      ev.preventDefault();
    }
  }

 drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }

 

  




}
export default Org;