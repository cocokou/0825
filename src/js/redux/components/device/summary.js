import React from 'react';
import { Link } from 'react-router';
import { Input, Select, Button, Layout, Table, Icon, Breadcrumb, TreeSelect, Dropdown, Row, Col, Card } from 'antd';
import Nav from '../common/pc_nav';
import * as config from 'config/app.config.js';

const { Content, Sider } = Layout;
const Search = Input.Search;

const Option = Select.Option;
class TopHeader extends React.Component {
  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>设备管理</Breadcrumb.Item>
          <Breadcrumb.Item>Summary</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}


export default class Summary extends React.Component {
    onClickFrist(){
        this.props.searchBySelect("正常")
    }
    onClickTwo(){
        this.props.searchBySelect("不正常")
    }
    onClickThree(){
        this.props.searchBySelect("未登记")
    }
  render() {
    return (
      <div style={{ width: '100%', padding: '30px'}}>
          <Card title="Summary" style={{ width: '100%', minHeight: 240, marginBottom:20}}>
          <Row gutter={32} style={{ maxWidth: 1500, fontSize: 22, marginTop: 20 }}>
          
            <Col span={8}>
              <div className="gutter-box" style={{ height: 80, backgroundColor: '#98d87d', color: "#fff", borderRadius: 5 }}  >
                <div style={{ padding: '20px' }} onClick={this.onClickFrist.bind(this)}><a style={{ color: "#fff" }}><Icon type="check-circle" /> 活跃设备： {this.props.normal}</a></div>
              </div>
            </Col>

            <Col span={8}>
              <div className="gutter-box" style={{ height: 80, backgroundColor: '#f27b71', color: "#fff", borderRadius: 5 }}  >

                <div style={{ padding: '20px' }} onClick={this.onClickTwo.bind(this)}><a style={{ color: "#fff" }}><Icon type="close-circle" /> 异常设备： {this.props.unNormal}</a></div>
              </div>
            </Col>

            <Col className="gutter-row" span={8}>
              <div className="gutter-box" style={{ height: 80, backgroundColor: '#49a9ee', color: "#fff", borderRadius: 5 }}  >
                <div style={{ padding: '20px' }} onClick={this.onClickThree.bind(this)}> <a style={{ color: "#fff" }}><Icon type="info-circle" /> 未配置设备：{this.props.unKnow}</a></div>
              </div>
            </Col>
          </Row>
        </Card>

{/*        <Row gutter={16} style={{marginBottom:20}}>
          <Col span={8}>
            <Card title="设备分级展示" bordered={true} style={{height:220}}>
            1，  对于设备要有层级管理，例如，集团公司/分公司/一号工厂/设备，对这些层级分布给予展示。
            </Card>
          </Col>
          <Col span={8}>
            <Card title="设备位置" bordered={true} style={{height:220}}>
            2，  需要有对于设备所在位置的虚拟分布给予展示。
            </Card>
          </Col>
          <Col span={8}>
            <Card title="当前活跃设备" bordered={true} style={{height:220}}>
             3，  对当前活跃的设备进行展示。（这个你第一个图就类似）
            </Card>
          </Col>
        </Row>

       <Reports />*/}

      </div>
    )
  }
}
function Reports() {
  return (
              <Card title="统计报表" style={{ width: '100%', minHeight: 240, marginBottom:20}}>
         <Row gutter={16} >
          <Col span={8}>
            <Card title="区域统计" bordered={false} style={{height:220}}>
            pie chart
            </Card>
          </Col>
          <Col span={8}>
            <Card title="位置统计" bordered={false} style={{height:220}}>
            Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="故障统计" bordered={false} style={{height:220}}>
             Card content
            </Card>
          </Col>
        </Row>
        </Card>
  )
}

 class DeviceSummary extends React.Component {

  render() {

    return (
      <div>
        <TopHeader />
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Nav />
          </Sider>
          
            <Summary />
    
        </Layout>
      </div>
    )
  }
  /*  componentDidMount(){
          var options = config.default.fetchOptions('POST', 'GetProductList', {})
          fetch(config.default.product_info, options)
          .then(res => res.json())
          .then(json => {
            var data = json.data.map( m => {m.key=m.id; return m})
            this.setState({list: data})
          })
          .catch(ex => {console.warn("parsed err: " + ex)})
    }*/
}