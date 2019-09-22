import React  from 'react';
import { connect } from 'react-redux'
import 'antd/dist/antd.css';
import { Route, Switch } from 'react-router-dom'
import Menu from './page/Menu'
import User from './page/User'

function App(props) {

  // useEffect(() => {


  // }, []);

  return (
      <Switch>
      <Route exact path="/" component={User} />
      <Route exact path="/user" component={User} />
      <Route exact path="/menu" component={Menu} />
      <Route component={User} />
    </Switch>
  );
}

function mapStatetoProps(state) {
  return {
    menuList: state.menuList,
  }
}

export default connect(mapStatetoProps)(App)
