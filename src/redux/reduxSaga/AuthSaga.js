// import AsyncStorage from "@react-native-async-storage/async-storage";
import { call, put, select, takeLatest } from "redux-saga/effects";
import constants from "../../utils/helpers/constants";
import {
  signupSuccess,
  signupFailure,

 
  otpverificationSuccess,
  otpverificationFailure,
 
  splashScreenSuccess,
  splashScreenFailure,

  FaqScreenSuccess,
  FaqScreenFailure,
  EditProfileSuccess,
  EditProfileFailure
} from "../reducer/AuthReducer";
import showErrorAlert from "../../utils/helpers/Toast";
import { getApi, postApi } from "../../utils/helpers/ApiRequest";
import { navigate } from "../../utils/helpers/RootNavigation";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { debug } from "react-native-reanimated";

let getItem = (state) => state.AuthReducer;
let token = "";

//tokenSaga



export function* signupSaga(action) {
  // debugger;

  let header = {
    Accept: "application/json",
    // contenttype: "application/json",
  };
  try {
    let response = yield call(postApi, "new_api/login-with-otp", action?.payload, header);
    if (response?.response[0].status ==='Valid') {
      console.log(response.response[0],"Ffjksfx")
      yield put(signupSuccess(response?.response[0]));
  
      AsyncStorage.setItem('login', response?.response[0].token);
      AsyncStorage.setItem('user_id', response?.response[0].id);
        showErrorAlert(response?.response[0]?.message);
      // navigate("OtpScreen", { token: response?.response[0]?.token });
    } else {
      yield put(signupFailure(response?.data));
      // showErrorAlert(response?.data?.response[0]?.message);
    }
  } catch (error) {
    yield put(signupFailure(error));
    console.log(error,"fjdkfdf")
  }
}

//otpverification
export function* otpverificationSaga(action) {
  let header = {
    Accept: "application/json",
    // contenttype: "application/json",
  };
  try {
    let response = yield call(
      postApi,
      "new_api/verify-otp",
      action.payload,
      header
    );
    console.log(response);
    if (response?.response[0].status ==='Valid') {
      yield put(otpverificationSuccess(response?.response[0]));
      showErrorAlert(response?.response[0].message);
      // navigate("ChangePassword", { email: action?.payload?.email });
    } else {
      yield put(otpverificationFailure(response?.data));
      showErrorAlert(response?.response[0].message);
    }
  } catch (error) {
    console.log(error);
    yield put(otpverificationFailure(error));
    // showErrorAlert(error?.response?.data?.message);
  }
}

// Cms detalis saga
export function* FaqdetailsSaga(action) {
  let header = {
    Accept: "application/json",
    contenttype: "application/json",
  };
  try {
    let response = yield call(getApi, "new_api/faqs" + action.payload, header);
    if (response?.status == 200) {
      yield put(FaqScreenSuccess(response?.data?.data));
      //  showErrorAlert(response?.data?.message);
    } else {
      yield put(FaqScreenFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(FaqScreenFailure(error));
    // showErrorAlert(error?.response?.data?.message);
  }
}

// Cms detalis saga
export function* SplashScreenSaga(action) {
  let header = {
    Accept: "application/json",
    // contenttype: "application/json",
  };
  try {
    let response = yield call(getApi,"new_api/banners",header);
    console.log(response.data.response[0].banners,"Fsfjkfk")
    if (response?.status == 200) {
      yield put(splashScreenSuccess(response.data.response[0].banners));
      //  showErrorAlert(response?.data?.message);
    } else {
      yield put(splashScreenFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(splashScreenFailure(error));
    // showErrorAlert(error?.response?.data?.message);
  }
}

//otpverification
export function* editProfileSaga(action) {
 
  let header = {
    Accept: "application/json",
    // contenttype: "application/json",
  };
  try {
    let response = yield call(
      postApi,
      "new_api/edit-profile",
      action.payload,
      header
    );
    console.log(response);
    if (response?.response[0].status ==='Valid') {
      yield put(EditProfileSuccess(response?.response[0]));
      showErrorAlert(response?.response[0].message);
      // navigate("ChangePassword", { email: action?.payload?.email });
    } else {
      yield put(EditProfileFailure(response?.data));
      showErrorAlert(response?.response[0].message);
    }
  } catch (error) {
    console.log(error);
    yield put(EditProfileFailure(error));
    // showErrorAlert(error?.response?.data?.message);
  }
}




const watchFunction = [
  (function* () {
    yield takeLatest("Auth/signupRequest", signupSaga);
  })(),

  (function* () {
    yield takeLatest("Auth/otpverificationRequest", otpverificationSaga);
  })(),
  (function* () {
    yield takeLatest("Auth/FaqScreenRequest", FaqdetailsSaga);
  })(),
  (function* () {
    yield takeLatest("Auth/splashScreenRequest", SplashScreenSaga);
  })(),
  (function* () {
    yield takeLatest("Auth/EditProfileRequest", editProfileSaga);
  })(),
  // (function* () {
  //   yield takeLatest("Auth/refreshTokenRequest", refreshTokenSaga);
  // })(),
];

export default watchFunction;
