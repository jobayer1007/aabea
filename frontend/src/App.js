import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header/Header';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegistrationScreen/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen/DashboardScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
// imort for sidebar experiment
// import Sidebar from './components/Sidebar/Sidebar';
// import MainScreen from './screens/MainScreen';
import PaymentScreen from './screens/PaymentScreen/PaymentScreen';
import DonateScreen from './screens/DonateScreen/DonateScreen';
import TrainingScreen from './screens/TrainingScreen/TrainingScreen';
import CommittieesScreen from './screens/CommitteesScreen/CommitteesScreen';
// import Navbar from './components/Navbar/Navbar';
import EmailActivationScreen from './screens/EmailActivationScreen/EmailActivationScreen';
import SystemAdminScreen from './screens/SystemAdminScreen/SystemAdminScreen';
import UserPendingApproveScreen from './screens/UserPendingApproveScreen/UserPendingApproveScreen';
import ChapterScreen from './screens/ChapterScreen/ChapterScreen';
import PaymentTypeScreen from './screens/PaymentTypeScreen/PaymentTypeScreen';
import AnnouncementScreen from './screens/AnnouncementScreen/AnnouncementScreen';
import MissionScreen from './screens/MissionScreen/MissionScreen';
import VissionScreen from './screens/VissionScreen/VissionScreen';
import HistoryScreen from './screens/HistoryScreen/HistoryScreen';
import PasswordResetScreen from './screens/PasswordResetScreen/PasswordResetScreen';
import PasswordUpdateScreen from './screens/PasswordUpdateScreen/PasswordUpdateScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import EditProfileScreen from './screens/ProfileScreen/EditProfileScreen';
import ImagesScreen from './screens/ImagesScreen/ImagesScreen';
import MembersScreen from './screens/MembersScreen/MembersScreen';
import Announcement from './screens/AnnouncementScreen/Announcement';
import Mission from './screens/MissionScreen/Mission';
import Vission from './screens/VissionScreen/Vission';
import History from './screens/HistoryScreen/History';
import CommitteeMemberScreen from './screens/CommitteesScreen/CommitteeMemberScreens';
import About from './screens/AboutScreen/About';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className='py-3'>
          <Container>
            <Route path='/about' component={About} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/password/recover' component={PasswordResetScreen} />
            <Route
              path='/password/reset/:id/:token'
              component={PasswordUpdateScreen}
            />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/activate/:hash' component={EmailActivationScreen} />
            <Route path='/dashboardScreen' component={UserListScreen} />
            <Route path='/dashboard' component={DashboardScreen} />
            <Route path='/systemAdmin' component={SystemAdminScreen} />
            <Route path='/chapter' component={ChapterScreen} />
            <Route path='/mission' component={MissionScreen} />
            <Route path='/chapters/mission/:id' component={Mission} />
            <Route path='/announcement' component={AnnouncementScreen} />
            <Route path='/announcements/:id' component={Announcement} />
            <Route path='/vission' component={VissionScreen} />
            <Route path='/chapters/vission/:id' component={Vission} />
            <Route path='/history' component={HistoryScreen} />
            <Route path='/chapters/history/:id' component={History} />
            <Route path='/paymentType' component={PaymentTypeScreen} />
            <Route path='/images' component={ImagesScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/donate' component={DonateScreen} />
            <Route path='/training' component={TrainingScreen} />
            <Route path='/committiees' component={CommittieesScreen} />
            <Route path='/committee/:id' component={CommitteeMemberScreen} />
            <Route path='/members' component={MembersScreen} />
            <Route
              path='/users/:id/pending'
              component={UserPendingApproveScreen}
            />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/users/profile/edit' component={EditProfileScreen} />
            <Route path='/admin/users/:id/edit' component={UserEditScreen} />
            <Route path='/' component={HomeScreen} exact />
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default App;
