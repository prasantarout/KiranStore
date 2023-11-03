// import AsyncStorage from "@react-native-async-storage/async-storage";
import {call, put, select, takeLatest} from 'redux-saga/effects';
import constants from '../../utils/helpers/constants';
import {
  TaxSlotRequest,
  TaxSlotSuccess,
  TaxSlotFailure,
  TaxSlotaddRequest,
  TaxSlotaddSuccess,
  TaxSlotaddFailure,
  ProductDetailsSuccess,
  ProductDetailsFailure,
  VendorAddSuccess,
  VendorAddFailure,
  VendorListSuccess,
  getProductByBarcodeSuccess,
  getProductByBarcodeFailure,
  getProductDetailsSuccess,
  getProductDetailsFailure,
  purchaseOrderSuccess,
  purchaseOrderFailure,
  purchaseOrderRequest,
  CreateurchaseOrderSuccess,
  CreateurchaseOrderFailure,
  getBatchSuccess,
  getBatchFailure,
  addtoCartSuccess,
  addtoCartFailure,
  VendorListFailure,
} from '../reducer/ProductReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import {getApi, getApiWithParam, postApi} from '../../utils/helpers/ApiRequest';
import {navigate} from '../../utils/helpers/RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { debug } from "react-native-reanimated";

let getItem = state => state.ProductReducer;
let token = '';

//tokenSaga

export function* ProductAddSaga(action) {
  let header = {
    Accept: 'application/json',
    // contenttype: "application/json",
  };
  try {
    let response = yield call(
      postApi,
      'new_api/add-product',
      action?.payload,
      header,
    );
    if (response?.response[0].status === 'Valid') {
      console.log(response.response[0], 'Ffjksfx');
      yield put(TaxSlotaddSuccess(response?.response[0]));

      // AsyncStorage.setItem('login', response?.response[0]);
      showErrorAlert(response?.response[0]?.message);
      // navigate("OtpScreen", { token: response?.response[0]?.token });
    } else {
      yield put(TaxSlotaddFailure(response?.data));
      // showErrorAlert(response?.data?.response[0]?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(TaxSlotaddFailure(error));
    // showErrorAlert(error?.response?.data?.message);
  }
}

export function* ProductDetailsSaga(action) {
  debugger;
  let header = {
    Accept: 'application/json',
    // contenttype: "application/json",
  };
  try {
    let response = yield call(
      postApi,
      'new_api/add-product-details',
      action?.payload,
      header,
    );
    if (response?.response[0].status === 'Valid') {
      console.log(response.response[0], 'Ffjksfx');
      yield put(ProductDetailsSuccess(response?.response[0]));

      // AsyncStorage.setItem('login', response?.response[0]);
      showErrorAlert(response?.response[0]?.message);
      // navigate("OtpScreen", { token: response?.response[0]?.token });
    } else {
      yield put(ProductDetailsFailure(response?.data));
      // showErrorAlert(response?.data?.response[0]?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(ProductDetailsFailure(error));
    // showErrorAlert(error?.response?.data?.message);
  }
}

//otpverification
// new_api/add-vendor
// Cms detalis saga
export function* TaxSlotSaga(action) {
  let header = {
    Accept: 'application/json',
    // contenttype: "application/json",
  };
  try {
    let response = yield call(getApi, 'new_api/tax-slots', header);
    console.log(response?.data?.response[0], 'Fsfjkfk');
    if (response?.status == 200) {
      yield put(TaxSlotSuccess(response?.data?.response[0]));
    } else {
      yield put(TaxSlotFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(TaxSlotFailure(error));
    // showErrorAlert(error?.response?.data?.message);
  }
}

export function* AddVendorSaga(action) {
  let header = {
    Accept: 'application/json',
    // contenttype: "application/json",
  };
  try {
    let response = yield call(
      postApi,
      'new_api/add-vendor',
      action?.payload,
      header,
    );
    console.log(response?.data?.response[0], 'Fsfjkfk');
    if (response?.response[0].status === 'Valid') {
      yield put(VendorAddSuccess(response?.data?.response[0]));
      showErrorAlert(response?.response[0]?.message);
    } else {
      yield put(VendorAddFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(VendorAddFailure(error));
    // showErrorAlert(error?.response?.data?.message);
  }
}

export function* VendorListSaga(action) {
  debugger;
  let header = {
    Accept: 'application/json',
    // contenttype: "application/json",
  };
  try {
    let response = yield call(getApiWithParam,'new_api/vendors',action?.payload,header);
    console.log(response?.data?.response[0], 'Fsfjkfk');
    if (response?.data?.response[0].status === 'Valid') {
      yield put(VendorListSuccess(response?.data?.response[0]));
    } else {
      yield put(VendorListFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(VendorListFailure(error));
    // showErrorAlert(error?.response?.data?.message);
  }
}

export function* GetProductByBarcodeSaga(action) {
  let header = {
    Accept: 'application/json',
    // contenttype: "application/json",
  };
  try {
    let response = yield call(postApi, 'new_api/get-product-by-barcode',action?.payload,header);
    console.log(response?.data?.response[0], 'Fsfjkfk');
    if (response?.status == 200) {
      yield put(getProductByBarcodeSuccess(response?.data?.response[0]));
    } else {
      yield put(getProductByBarcodeFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(getProductByBarcodeFailure(error));
    // showErrorAlert(error?.response?.data?.message);
  }
}

export function* GetProductDetailsSaga(action) {
  let header = {
    Accept: 'application/json',
    // contenttype: "application/json",
  };
  try {
    let response = yield call(getApi, 'new_api/get-product-details',action?.payload,header);
    console.log(response?.data?.response[0], 'Fsfjkfk');
    if (response?.status == 200) {
      yield put(getProductDetailsSuccess(response?.data?.response[0]));
    } else {
      yield put(getProductDetailsFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(getProductDetailsFailure(error));
    // showErrorAlert(error?.response?.data?.message);
  }
}


export function* PurchaseOrderSaga(action) {
  let header = {
    Accept: 'application/json',
    // contenttype: "application/json",
  };
  try {
    let response = yield call(
      postApi,
      'new_api/add-product-purchase-order',
      action?.payload,
      header,
    );
    console.log(response?.data?.response[0], 'Fsfjkfk');
    if (response?.status == 200) {
      yield put(purchaseOrderSuccess(response?.data?.response[0]));
    } else {
      yield put(purchaseOrderFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(purchaseOrderFailure(error));
    // showErrorAlert(error?.response?.data?.message);
  }
}

export function* CreatePurchaseOrderSaga(action) {
  let header = {
    Accept: 'application/json',
    // contenttype: "application/json",
  };
  try {
    let response = yield call(
      postApi,
      'new_api/create-purchase-order',
      action?.payload,
      header,
    );
    console.log(response?.data?.response[0], 'Fsfjkfk');
    if (response?.status == 200) {
      yield put(CreateurchaseOrderSuccess(response?.data?.response[0]));
    } else {
      yield put(CreateurchaseOrderFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
     yield put(CreateurchaseOrderFailure(response?.data))
    // showErrorAlert(error?.response?.data?.message);
  }
}

export function* GetBatchSaga(action) {
  let header = {
    Accept: 'application/json',
    // contenttype: "application/json",
  };
  try {
    let response = yield call(getApi,'new_api/get-batch',action?.payload,header);
    console.log(response?.data?.response[0], 'Fsfjkfk');
    if (response?.status == 200) {
      yield put(getBatchSuccess(response?.data?.response[0]));
    } else {
      yield put(getBatchFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(getBatchFailure(error));
    // showErrorAlert(error?.response?.data?.message);
  }
}

export function*  AddToCartSaga(action) {
  let header = {
    Accept: 'application/json',
    // contenttype: "application/json",
  };
  try {
    let response = yield call(
      postApi,
      'new_api/add-to-cart',
      action?.payload,
      header,
    );
    console.log(response?.data?.response[0], 'Fsfjkfk');
    if (response?.status == 200) {
      yield put(addtoCartSuccess(response?.data?.response[0]));
    } else {
      yield put(addtoCartFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
     yield put(addtoCartFailure(response?.data))
    // showErrorAlert(error?.response?.data?.message);
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest('Product/TaxSlotRequest', TaxSlotSaga);
  })(),
  (function* () {
    yield takeLatest('Product/TaxSlotaddRequest', ProductAddSaga);
  })(),
  (function* () {
    yield takeLatest('Product/ProductDetailsRequest', ProductDetailsSaga);
  })(),
  (function* () {
    yield takeLatest('Product/VendorAddRequest', AddVendorSaga);
  })(),
  (function* () {
    yield takeLatest('Product/VendorListRequest',VendorListSaga);
  })(),
  (function* () {
    yield takeLatest('Product/getProductByBarcodeRequest',GetProductByBarcodeSaga);
  })(),
  (function* () {
    yield takeLatest('Product/getProductDetailsRequest',GetProductDetailsSaga);
  })(),
  (function* () {
    yield takeLatest('Product/purchaseOrderRequest',PurchaseOrderSaga);
  })(),
  (function* () {
    yield takeLatest('Product/CreateurchaseOrderRequest',CreatePurchaseOrderSaga);
  })(),
  (function* () {
    yield takeLatest('Product/getBatchRequest',GetBatchSaga);
  })(),
  (function* () {
    yield takeLatest('Product/addtoCartRequest',AddToCartSaga);
  })(),
  // (function* () {
  //   yield takeLatest("Auth/refreshTokenRequest", refreshTokenSaga);
  // })(),
];

export default watchFunction;
