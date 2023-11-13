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
  getProductSuccess,
  getProductFailure,
  getProductByBarcodeSaleSuccess,
  getProductByBarcodeSaleFailure,
  createurchaseOrderSuccess,
  createurchaseOrderFailure,
  finalSaleSuccess,
  finalSaleFailure,
  updateProductQuantitySuccess,
  updateProductQuantityFailure,
  deleteCartSuccess,
  deleteCartFailure,
  getSaleCartDetailsSuccess,
  getSaleCartDetailsFailure,
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
  // debugger;
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
  // debugger;
  let header = {
    Accept: 'application/json',
    // contenttype: "application/json",
  };
  try {
    let response = yield call(getApiWithParam,'new_api/vendors',action?.payload,header);
    console.log(response?.data?.response[0], 'Fsfjkfkhello');
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
    let response = yield call(postApi,'new_api/get-product-by-barcode',action?.payload,header);
    console.log(response?.response[0], 'Fsfjkfk>>>>>');
    if (response?.response[0]?.status == "Valid") {
      yield put(getProductByBarcodeSuccess(response?.response));
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


export function* GetProductByBarcodeSaleSaga(action) {
  let header = {
    Accept: 'application/json',
    // contenttype: "application/json",
  };
  try {
    let response = yield call(postApi,'new_api/get-product-by-barcode-sale',action?.payload,header);
    console.log(response?.response[0], 'Fsfjkfk>>>>>');
    if (response?.response[0]?.status == "Valid") {
      yield put(getProductByBarcodeSaleSuccess(response?.response));
    } else {
      yield put(getProductByBarcodeSaleFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(getProductByBarcodeSaleFailure(error));
    // showErrorAlert(error?.response?.data?.message);
  }
}

export function* GetProductDetailsSaga(action) {
  // debugger;
  let header = {
    Accept: 'application/json',
    // contenttype: "application/json",
  };
  try {
    let response = yield call(postApi, 'new_api/get-product-details',action?.payload,header);
    console.log(response?.response, '==========hello');
    if (response?.response[0]?.status == "Valid") {
      yield put(getProductDetailsSuccess(response?.response));
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
  debugger;
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
    console.log(response?.response[0], 'Purchasse>>>>>>>>>>>>>>>>>');
    if (response?.response[0]?.status == "Valid") {
      yield put(purchaseOrderSuccess(response?.data?.response[0]));
    } else {
      yield put(purchaseOrderFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
   
    yield put(purchaseOrderFailure(error));
    console.log(error);
    // showErrorAlert(error?.response?.data?.message);
  }
}

export function* CreatePurchaseOrderSaga(action) {
  debugger;
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
    // console.log(response?.response[0], 'Fsfjkfk');
    if (response?.response[0]?.status == "Valid") {
      yield put(createurchaseOrderSuccess(response?.data?.response[0]));
    } else {
      yield put(createurchaseOrderFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
   
     yield put(createurchaseOrderFailure(response?.data))
     console.log(error);
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
    console.log(response?.response[0]?.message, '++++++++++++++++++addtocart');
    if (response?.response[0]?.status == "Valid") {
      yield put(addtoCartSuccess(response?.data?.response[0]));
      showErrorAlert(response?.response[0]?.message);
    } else {
      yield put(addtoCartFailure(response?.data));
      showErrorAlert(response?.response[0]?.message);
    }
  } catch (error) {
    console.log(error);
     yield put(addtoCartFailure(response?.data))
    // showErrorAlert(error?.response?.data?.message);
  }
}

export function* GetCartDetailsSaga(action) {
  // debugger;
  let header = {
    Accept: 'application/json',
    // contenttype: "application/json",
  };
  try {
    let response = yield call(postApi, 'new_api/getCartDetails',action?.payload,header);
    console.log(response?.response, '==========hello');
    if (response?.response[0]?.status == "Valid") {
      yield put(getSaleCartDetailsSuccess(response?.response));
    } else {
      yield put(getSaleCartDetailsFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(getSaleCartDetailsFailure(error));
    // showErrorAlert(error?.response?.data?.message);
  }
}

export function*  finalSaleSaga(action) {
  let header = {
    Accept: 'application/json',
    // contenttype: "application/json",
  };
  try {
    let response = yield call(
      postApi,
      'new_api/final-sale',
      action?.payload,
      header,
    );
    console.log(response?.response[0], '++++++++++++++++++addtocart');
    if (response?.response[0]?.status == "Valid") {
      yield put(finalSaleSuccess(response?.data?.response[0]));
    } else {
      yield put(finalSaleFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
     yield put(finalSaleFailure(response?.data))
    // showErrorAlert(error?.response?.data?.message);
  }
}

export function* updateProductQuantitySaga(action) {
  let header = {
    Accept: 'application/json',
    // contenttype: "application/json",
  };
  try {
    let response = yield call(
      postApi,
      'new_api/updatecartProductQty',
      action?.payload,
      header,
    );
    console.log(response?.response[0], '++++++++++++++++++addtocart');
    if (response?.response[0]?.status == "Valid") {
      yield put(updateProductQuantitySuccess(response?.data?.response[0]));
    } else {
      yield put(updateProductQuantityFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
     yield put(updateProductQuantityFailure(response?.data))
    // showErrorAlert(error?.response?.data?.message);
  }
}

export function* deletSaleCartSaga(action) {
  let header = {
    Accept: 'application/json',
    // contenttype: "application/json",
  };
  try {
    let response = yield call(
      postApi,
      'new_api/deletecartProduct',
      action?.payload,
      header,
    );
    console.log(response?.response[0], '++++++++++++++++++addtocart');
    if (response?.response[0]?.status == "Valid") {
      yield put(deleteCartSuccess(response?.data?.response[0]));
    } else {
      yield put(deleteCartFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
     yield put(deleteCartFailure(response?.data))
    // showErrorAlert(error?.response?.data?.message);
  }
}


export function*  getProductSaga(action) {
  let header = {
    Accept: 'application/json',
    // contenttype: "application/json",
  };
  try {
    let response = yield call(
      postApi,
      'new_api/products',
      action?.payload,
      header,
    );
    console.log(response?.response[0]?.status, '++++++++++++++++++');
    if (response?.response[0]?.status =='Valid') {
      yield put(getProductSuccess(response?.response[0]?.products));
    } else {
      yield put(getProductFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
     yield put(getProductFailure(response?.data))
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
    yield takeLatest('Product/createurchaseOrderRequest',CreatePurchaseOrderSaga);
  })(),
  (function* () {
    yield takeLatest('Product/getBatchRequest',GetBatchSaga);
  })(),
  (function* () {
    yield takeLatest('Product/addtoCartRequest',AddToCartSaga);
  })(),
  (function* () {
    yield takeLatest("Product/getProductRequest", getProductSaga);
  })(),
  (function* () {
    yield takeLatest("Product/getProductByBarcodeSaleRequest", GetProductByBarcodeSaleSaga);
  })(),
  (function* () {
    yield takeLatest("Product/finalSaleRequest", finalSaleSaga);
  })(),
  (function* () {
    yield takeLatest("Product/updateProductQuantityRequest", updateProductQuantitySaga);
  })(),

  (function* () {
    yield takeLatest("Product/deleteCartRequest",deletSaleCartSaga);
  })(),
  (function* () {
    yield takeLatest("Product/getSaleCartDetailsRequest",GetCartDetailsSaga);
  })(),
];

export default watchFunction;
