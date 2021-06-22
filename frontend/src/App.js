import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header/Header';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegistrationScreen/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen/DashboardScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';

import PaymentScreen from './screens/PaymentScreen/PaymentScreen';
import DonateScreen from './screens/DonateScreen/DonateScreen';
import TrainingScreen from './screens/TrainingScreen/TrainingScreen';
import CommittieesScreen from './screens/CommitteesScreen/CommitteesScreen';
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
import EventScreen from './screens/EventScreen/EventScreen';
import SettingScreen from './screens/SettingScreen/SettingScreen';
import EventNewScreen from './screens/EventScreen/EventNewScreen';
import EventByIdScreen from './screens/EventScreen/EventByIdScreen';
import EventRegisterScreen from './screens/EventScreen/EventRegistrationScreen';
import EmailScreen from './screens/EmailScreen/EmailScreen';
import BlogScreen from './screens/BlogScreen/BlogScreen';
import CreateBlogScreen from './screens/BlogScreen/CreateBlogScreen';
import BlogScreenById from './screens/BlogScreen/BlogScreenById';
import DonationTypeScreen from './screens/DonationTypeScreen/DonationTypeScreen';
import ImageByEventScreen from './screens/ImageByEventScreen/ImageByEventScreen';
import HelpContactScreen from './screens/HelpContactScreen/HelpContactScreen';
import QuickLinkScreen from './screens/QuickLinkScreen/QuickLinkScreen';
import ImageByIdScreen from './screens/ImagesScreen/ImageByIdScreen';
import EventRegistrationPayment from './screens/EventScreen/EventRegistrationPayment';
import UploadScreen from './screens/UploadScreen/UploadScreen';
import Document from './screens/UploadScreen/Document';

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
            <Route path='/blog' component={BlogScreen} exact />
            <Route path='/blog/new' component={CreateBlogScreen} exact />
            <Route path='/blogs/:id' component={BlogScreenById} />
            <Route path='/systemAdmin' component={SystemAdminScreen} />
            <Route path='/chapter' component={ChapterScreen} />
            <Route path='/mission' component={MissionScreen} />
            <Route path='/chapters/mission/:id' component={Mission} />
            <Route path='/announcement' component={AnnouncementScreen} />
            <Route path='/help' component={HelpContactScreen} />
            <Route path='/links' component={QuickLinkScreen} />
            <Route path='/announcements/:id' component={Announcement} />
            <Route path='/vission' component={VissionScreen} />
            <Route path='/chapters/vission/:id' component={Vission} />
            <Route path='/history' component={HistoryScreen} />
            <Route path='/chapters/history/:id' component={History} />
            <Route path='/paymentType' component={PaymentTypeScreen} />
            <Route path='/donationType' component={DonationTypeScreen} />
            <Route path='/images' component={ImagesScreen} />
            <Route path='/image/event' component={ImageByEventScreen} />
            <Route path='/image/:id' component={ImageByIdScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/donate' component={DonateScreen} />
            <Route path='/training' component={TrainingScreen} />
            <Route path='/committiees' component={CommittieesScreen} />
            <Route path='/committee/:id' component={CommitteeMemberScreen} />
            <Route path='/documents' component={UploadScreen} />
            <Route path='/doc/:id' component={Document} />
            <Route path='/members' component={MembersScreen} />
            <Route path='/emails' component={EmailScreen} />
            <Route path='/events' component={EventScreen} />
            <Route path='/event/register/:id' component={EventRegisterScreen} />
            <Route
              path='/event/registration/payment'
              component={EventRegistrationPayment}
            />
            <Route path='/eventsnew' component={EventNewScreen} />
            <Route path='/event/:id' component={EventByIdScreen} exact />
            <Route path='/settings' component={SettingScreen} />
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
