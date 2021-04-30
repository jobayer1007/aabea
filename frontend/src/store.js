import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userApproveReducer,
  userCreateAdminReducer,
  userDeleteAdminReducer,
  userDeleteReducer,
  userDetailsByIdReducer,
  userDetailsReducer,
  userDonateReducer,
  userDonationDetailsReducer,
  userEmailVerificationReducer,
  userListReducer,
  userLoginReducer,
  userPasswordResetReducer,
  userPasswordUpdateReducer,
  userPaymentDetailsReducer,
  userPayReducer,
  userPendingDeleteReducer,
  userPendingDetailsReducer,
  userPendingListReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUptadeReducer,
  userVerificationEmailResendReducer,
} from './reducers/userReducers';
import {
  chapterDeleteReducer,
  chapterListReducer,
  chapterRegisterReducer,
} from './reducers/chapterReducers';
import {
  paymentTypeDeleteReducer,
  paymentTypeListReducer,
  paymentTypeRegisterReducer,
} from './reducers/paymentTypeReducers';
import {
  announcementAllReducer,
  announcementByIdReducer,
  announcementDeleteReducer,
  announcementNewReducer,
  announcementUpdateReducer,
} from './reducers/announcementReducers';
import {
  missionAllReducer,
  missionByIdReducer,
  missionDeleteReducer,
  missionNewReducer,
  missionUpdateReducer,
} from './reducers/missionReducers';
import {
  vissionAllReducer,
  vissionByIdReducer,
  vissionDeleteReducer,
  vissionNewReducer,
  vissionUpdateReducer,
} from './reducers/vissionReducers';
import {
  historyAllReducer,
  historyByIdReducer,
  historyDeleteReducer,
  historyNewReducer,
  historyUpdateReducer,
} from './reducers/historyReducers';
import {
  imageAllReducer,
  imageByIdReducer,
  imageDeleteReducer,
  imageHomeScreenReducer,
  imageNavbarReducer,
  imageNewReducer,
} from './reducers/imageReducers';
import {
  cMemberAllReducer,
  cMemberByIdReducer,
  cMemberDeleteReducer,
  cMemberNewReducer,
  cMemberUpdateReducer,
} from './reducers/committeeReducers';
import {
  eventAllReducer,
  eventByIdReducer,
  eventContactAllReducer,
  eventContactByIdReducer,
  eventContactDeleteReducer,
  eventContactNewReducer,
  eventContactUpdateReducer,
  eventDeleteReducer,
  eventNewReducer,
  eventPublishReducer,
  eventRegisterReducer,
  eventUnpublishReducer,
  eventUpdateReducer,
} from './reducers/eventReducers';

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userEmailVerify: userEmailVerificationReducer,
  userVerifyEmailResend: userVerificationEmailResendReducer,

  userLogin: userLoginReducer,
  userPasswordReset: userPasswordResetReducer,
  userPasswordUpdate: userPasswordUpdateReducer,

  userDetails: userDetailsReducer,
  userDetailsById: userDetailsByIdReducer,
  userUpdateProfile: userUpdateProfileReducer,

  userList: userListReducer,

  userPendingList: userPendingListReducer,
  userPendingDetails: userPendingDetailsReducer,
  userApprove: userApproveReducer,
  userPendingDelete: userPendingDeleteReducer,

  userCreateAdmin: userCreateAdminReducer,
  userDeleteAdmin: userDeleteAdminReducer,

  userDelete: userDeleteReducer,
  userUpdate: userUptadeReducer,

  userPaymentDetails: userPaymentDetailsReducer,
  userPay: userPayReducer,
  userDonate: userDonateReducer,
  userDonateDetails: userDonationDetailsReducer,

  chapterRegister: chapterRegisterReducer,
  chapterList: chapterListReducer,
  chapterDelete: chapterDeleteReducer,

  announcementNew: announcementNewReducer,
  announcementAll: announcementAllReducer,
  announcementById: announcementByIdReducer,
  announcementUpdate: announcementUpdateReducer,
  announcementDelete: announcementDeleteReducer,

  missionNew: missionNewReducer,
  missionAll: missionAllReducer,
  missionById: missionByIdReducer,
  missionUpdate: missionUpdateReducer,
  missionDelete: missionDeleteReducer,

  vissionNew: vissionNewReducer,
  vissionAll: vissionAllReducer,
  vissionById: vissionByIdReducer,
  vissionUpdate: vissionUpdateReducer,
  vissionDelete: vissionDeleteReducer,

  historyNew: historyNewReducer,
  historyAll: historyAllReducer,
  historyById: historyByIdReducer,
  historyUpdate: historyUpdateReducer,
  historyDelete: historyDeleteReducer,

  imageNew: imageNewReducer,
  imageById: imageByIdReducer,
  imageNavbar: imageNavbarReducer,
  imageHomeScreen: imageHomeScreenReducer,
  imageAll: imageAllReducer,
  imageDelete: imageDeleteReducer,

  paymentTypeRegister: paymentTypeRegisterReducer,
  paymentTypeList: paymentTypeListReducer,
  paymentTypeDelete: paymentTypeDeleteReducer,

  cMemberNew: cMemberNewReducer,
  cMemberAll: cMemberAllReducer,
  cMemberById: cMemberByIdReducer,
  cMemberUpdate: cMemberUpdateReducer,
  cMemberDelete: cMemberDeleteReducer,

  eventNew: eventNewReducer,
  eventAll: eventAllReducer,
  eventById: eventByIdReducer,
  eventUpdate: eventUpdateReducer,
  eventDelete: eventDeleteReducer,

  eventContactNew: eventContactNewReducer,
  eventContactAll: eventContactAllReducer,
  eventContactById: eventContactByIdReducer,
  eventContactUpdate: eventContactUpdateReducer,
  eventContactDelete: eventContactDeleteReducer,

  eventPublish: eventPublishReducer,
  eventUnpublish: eventUnpublishReducer,

  eventRegister: eventRegisterReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
