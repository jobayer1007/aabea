import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import Sidebar from './components/sidebar';

const App = () => {
  // const HideSidebar = window.location.pathname === '/home' ? null : <Sidebar />;
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Sidebar />
          {/* {HideSidebar} */}
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/dashboardScreen' component={DashboardScreen} />
          <Route path='/dashboard' component={UserListScreen} />
          <Route path='/users/:id/edit' component={UserEditScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
