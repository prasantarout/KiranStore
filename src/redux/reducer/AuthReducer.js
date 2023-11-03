import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  isLoading: true,
  signupResponse: {},
  loginResponse: {},
  splashScreenRes:{},
  // getTokenResponse: null,
  // forgotpasswordResponse: {},
  otpverificationResponse: {},
  FaqDeatailsResponse: {},
  editProfileResponse: {},
  // setupResponse: {},
  // craetenewpasswordResponse: {},
  // logoutResponse: {},
  // sendPasswordResetLinkResponse: {},
  // socialLoginResponse: {},
  // refreshTokenResponse:{},
  // fcmTokenResponse: {},
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    //token
 

    //refresh token


    //Signup page
    signupRequest(state, action) {
      state.status = action.type;
    },
    signupSuccess(state, action) {
      // console.log(action.payload,"Ffffffffff")
      state.signupResponse = action.payload;
      state.status = action.type;
    },
    signupFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //Sign in
    loginRequest(state, action) {
      state.status = action.type;
    },
    loginSuccess(state, action) {
      state.loginResponse = action.payload;
      state.status = action.type;
    },
    loginFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //otp verification
    otpverificationRequest(state, action) {
      state.status = action.type;
    },
    otpverificationSuccess(state, action) {
      state.otpverificationResponse = action.payload;
      state.status = action.type;
    },
    otpverificationFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },


    splashScreenRequest(state, action) {
      state.status = action.type;
    },
    splashScreenSuccess(state, action) {
      state.splashScreenRes = action.payload;
      state.status = action.type;
    },
    splashScreenFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },



    FaqScreenRequest(state, action) {
      state.status = action.type;
    },
    FaqScreenSuccess(state, action) {
      state.FaqDeatailsResponse = action.payload;
      state.status = action.type;
    },
    FaqScreenFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
  
    EditProfileRequest(state, action) {
      state.status = action.type;
    },
    EditProfileSuccess(state, action) {
      state.editProfileResponse = action.payload;
      state.status = action.type;
    },
    EditProfileFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
  },
});

export const {
  signupFailure,
  signupSuccess,
  signupRequest,

  
  loginRequest,
  loginSuccess,
  loginFailure,
  
  otpverificationRequest,
  otpverificationSuccess,
  otpverificationFailure,
  
 splashScreenRequest,
 splashScreenSuccess,
 splashScreenFailure,

 FaqScreenRequest,
 FaqScreenSuccess,
 FaqScreenFailure,
 
 EditProfileRequest,
 EditProfileSuccess,
 EditProfileFailure,
 
} = AuthSlice.actions;

export default AuthSlice.reducer;
