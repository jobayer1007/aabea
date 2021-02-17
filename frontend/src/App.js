import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import * as S from './App.styles';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
// imort for sidebar experiment
import Sidebar from './components/Sidebar/Sidebar';
import MainScreen from './screens/MainScreen';
import PaymentScreen from './screens/PaymentScreen/PaymentScreen';
import DonateScreen from './screens/DonateScreen/DonateScreen';
import TrainingScreen from './screens/TrainingScreen/TrainingScreen';
import CommittieesScreen from './screens/CommitteesScreen/CommitteesScreen';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  const backgroundImage = 'images/mountain.jpg';
  const logoImage = 'images/logoImage.png';
  const sidebarHeader = {
    fullName: 'AABEA',
    shortName: 'aabea',
  };
  const menuItems = [
    {
      name: 'Payment',
      to: '/payment',
      icon: 'icons/home.svg',
      subMenuItems: [],
    },
    {
      name: 'Donate',
      to: '/donate',
      icon: 'icons/about.svg',
      subMenuItems: [],
    },
    {
      name: 'Training',
      to: '/training',
      icon: 'icons/blog.svg',
      subMenuItems: [],
    },
    {
      name: 'Committiees',
      to: '/committiees',
      icon: 'icons/services.svg',
      subMenuItems: [],
    },
    {
      name: 'Destinations',
      to: '/destinations',
      icon: 'icons/destinations.svg',
      subMenuItems: [
        { name: 'Canada', to: '/canada' },
        { name: 'Brazil', to: '/brazil' },
        { name: 'India', to: '/India' },
        { name: 'Aunstralia', to: '/australia' },
        { name: 'Bangladesh', to: '/bangladesh' },
        { name: 'china', to: '/china' },
      ],
    },
    {
      name: 'Contacts',
      to: '/contacts',
      icon: 'icons/contacts.svg',
      subMenuItems: [],
    },
  ];

  const fonts = {
    header: 'Reggae One',
    menu: 'Poppins',
  };

  return (
    <>
      <Router>
        {/* Experiment Start */}
        <S.App>
          <Navbar logoImage={logoImage} />
          <Sidebar
            backgroundImage={backgroundImage}
            sidebarHeader={sidebarHeader}
            menuItems={menuItems}
            fonts={fonts}
          />
          <MainScreen />
        </S.App>
        {/* Experiment above */}
        <Header />
        <main className='py-3'>
          <Container>
            {/* <Sidebar /> */}
            {/* {HideSidebar} */}
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/dashboardScreen' component={UserListScreen} />
            <Route path='/dashboard' component={DashboardScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/donate' component={DonateScreen} />
            <Route path='/training' component={TrainingScreen} />
            <Route path='/committiees' component={CommittieesScreen} />
            <Route path='/users/:id/edit' component={UserEditScreen} />
            <Route path='/' component={HomeScreen} exact />
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default App;
