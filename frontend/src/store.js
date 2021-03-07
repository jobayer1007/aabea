import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userApproveReducer,
  userCreateAdminReducer,
  userDeleteAdminReducer,
  userDeleteReducer,
  userDetailsReducer,
  userDonateReducer,
  userDonationDetailsReducer,
  userEmailVerificationReducer,
  userListReducer,
  userLoginReducer,
  userPaymentDetailsReducer,
  userPayReducer,
  userPendingDeleteReducer,
  userPendingDetailsReducer,
  userPendingListReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUptadeReducer,
} from './reducers/userReducers';
import {
  chapterDeleteReducer,
  chapterListReducer,
  chapterRegisterReducer,
} from './reducers/chapterReducers';
import {
  paymentTypeDeleteReducer,
  paymenttypeListReducer,
  paymentTypeRegisterReducer,
} from './reducers/paymentTypeReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  userRegister: userRegisterReducer,
  userEmailVerify: userEmailVerificationReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,

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

  paymentTypeRegister: paymentTypeRegisterReducer,
  paymentTypeList: paymenttypeListReducer,
  paymentTypeDelete: paymentTypeDeleteReducer,
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
