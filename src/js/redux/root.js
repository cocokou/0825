import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory } from 'history';
import history from 'history_instance';
/*import PCIndex from './components/pc_index';
import ProductManage from './components/product/product_manage';*/
import MobileIndex from './components/mobile_index';


import { Entry, NoPermission } from './components/common/pc_body';
import { MobileEntry } from './components/common/mobile_body';
import MediaQuery from 'react-responsive';

import config from 'config/app.config';
import authList from 'config/auth.config';
let components = {};

/**
 * 有无该权限
 * @param  {String} auth 权限名
 */
export default function validate(auth) {
  var role = sessionStorage.getItem("role");
  var login = sessionStorage.getItem("Y");
  var m = config;
  //特殊情况
  if (true) {
    return true;
  }
  var permissions = authList.auth[role];
  return permissions.some(n => n === auth);
}
/**
 * 注意，路由的权限控制存在于两部分，一部分在react-router当中，一部分在nav当中;
 * 该方法用于react-router当中，进行权限控制
 * @param  {String} auth 权限名
 */
export function onEnter(auth) {
  return function (state, replace) {
    //登录成功之后，才有必要进行validate
    if (sessionStorage.getItem("login") == 'Y') {
      if (!validate(auth)) {
        // replace({}, '/403', null);
        return true;
      }
    }
    return true;
  }
}

const getComponents = (routePath, accessControl) => (nexState, replace, callback) => {
  if (accessControl && !accessControl(nexState, replace)) {
    return;
  }

  switch (routePath) {
    case 'dm':
      require.ensure([], require => {
        components.SummaryPannel = require('./components/device/summary.js').default;
        components.OrgPannel = require('./components/device/org.js').default;
        components.testPannel = require('./components/device/test.js').default;
        components.positionPannel = require('./components/device/position.js').default;
        components.DeviceConfigPannel = require('./components/device/deviceConfig.js').default;
        components.org2Pannel = require('./components/device/org2.js').default;
        components.DevicePannel = require('./components/device/device.js').default;
        components.Device2Pannel = require('./components/device/device2.js').default;
        callback();
      })
      break;
  }
}

const get = componentName => (location, callback) => {
  callback(undefined, components[componentName]);
}

/*export default class Root extends React.Component{
  render(){
    return (
      //这里替换了之前的Index,变成了程序的入口
      <div>
        <MediaQuery query='(min-device-width: 1224px)'>
          <Router history={hashHistory}>
            <Route path="/" component={Entry}>
              <Route path="pm" onEnter={getComponents('pm')}>
                <Route path="index" getComponent={get('ProductPannel')}>
                </Route>
              </Route>

            </Route>
          </Router>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)'>
          <Router history={hashHistory}>
            <Route path="/" component={MobileIndex}></Route>
            <Route path="/product/:id" component={MobileProduct}></Route> 
          </Router>
        </MediaQuery>
      </div>
    )
  }
}*/

const Root = () => (
  //这里替换了之前的Index,变成了程序的入口
  <div>
    <MediaQuery query='(min-device-width: 1224px)'>
      <Router history={history}>
        <Route path="/" component={Entry}>

          <Route path="dm" onEnter={getComponents('dm')}>
            <Route path="summary" getComponents={get('SummaryPannel')} />
            <Route path="test" getComponents={get('testPannel')} />
            <Route path="org" getComponents={get('OrgPannel')} />
            <Route path="org2" getComponents={get('org2Pannel')} />
           <Route path="position">           
              <IndexRoute getComponents={get('positionPannel')} />
              <Route path="config" getComponent={get('DeviceConfigPannel')} />
           </Route>
{          //  <Route path="test" getComponents={get('testPannel')} />
}           <Route path="device" getComponents={get('DevicePannel')} />
           <Route path="device2" getComponents={get('Device2Pannel')} />
          </Route>

       
          <Route path="403" component={NoPermission} />

        </Route>
      </Router>
    </MediaQuery>
    <MediaQuery query='(max-device-width: 1224px)'>
      <Router history={history}>
        {/*<Route path="/" component={MobileEntry}>
              <Route path="pm" onEnter={getComponents('pm')}>
                <Route path="product/:id" getComponent={get('ProductDetailPannel')} />
              </Route>
            </Route>*/}
        <Route path="/" component={MobileIndex} />
   
      </Router>
    </MediaQuery>
  </div>
)

ReactDOM.render(<Root />, document.getElementById('mainContainer'));