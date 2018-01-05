import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import firebase from 'firebase';
// import { connect } from 'react-redux';
import LoginForm from './components/LoginForm';
import WelcomePage from './components/WelcomePage';
// import { logoutUserSuccess } from './actions';
// import EmployeeList from './components/EmployeeList';
// import EmployeeCreate from './components/EmployeeCreate';
// import EmployeeEdit from './components/EmployeeEdit';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="main" hideNavBar>
        <Scene key="auth" initial titleStyle={{ alignSelf: 'center' }}>
          <Scene key="login" component={LoginForm} initial hideNavBar />
        </Scene>
        <Scene key="core">
          <Scene
            key="welcomePage"
            component={WelcomePage}
            title="Welcome"
            titleStyle={{ alignSelf: 'center' }}
            rightTitle="Log Out"
            onRight={() => { firebase.auth().signOut(); Actions.login(); }}
          />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
