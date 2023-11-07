import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  isLoading: true,
  TaxSlotRes: {},
  TaxSlotaddRes:{},
  prodctDetailsRes:{},
   vendorRes:{},
   getVendorRes:{},
   getProductByBarcodeRes:{},
   getProductDetailsRes:{},
   purchaseOrderRes:{},
   createpurchaseOrderRes:{},
   getBatchRes:{},
   addToCartRes:{}

};

const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
   
    //Signup page
    TaxSlotRequest(state, action) {
      state.status = action.type;
    },
    TaxSlotSuccess(state, action) {
      // console.log(action.payload,"Ffffffffff")
      state. TaxSlotRes = action.payload;
      state.status = action.type;
    },
    TaxSlotFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

  //Signup page
  TaxSlotaddRequest(state, action) {
    state.status = action.type;
  },
  TaxSlotaddSuccess(state, action) {
    // console.log(action.payload,"Ffffffffff")
    state. TaxSlotaddRes = action.payload;
    state.status = action.type;
  },
  TaxSlotaddFailure(state, action) {
    state.error = action.error;
    state.status = action.type;
  },

   //Signup page
   ProductDetailsRequest(state, action) {
    state.status = action.type;
  },
  ProductDetailsSuccess(state, action) {
    // console.log(action.payload,"Ffffffffff")
    state.prodctDetailsRes = action.payload;
    state.status = action.type;
  },
  ProductDetailsFailure(state, action) {
    state.error = action.error;
    state.status = action.type;
  },
    
   //Signup page
   VendorAddRequest(state, action) {
    state.status = action.type;
  },
  VendorAddSuccess(state, action) {
    // console.log(action.payload,"Ffffffffff")
    state.vendorRes = action.payload;
    state.status = action.type;
  },
  VendorAddFailure(state, action) {
    state.error = action.error;
    state.status = action.type;
  },
  
  //Signup page
   VendorListRequest(state, action) {
    state.status = action.type;
  },
  VendorListSuccess(state, action) {
    // console.log(action.payload,"Ffffffffff")
    state.getVendorRes = action.payload;
    state.status = action.type;
  },
  VendorListFailure(state, action) {
    state.error = action.error;
    state.status = action.type;
  },

  
  getProductByBarcodeRequest(state, action) {
    state.status = action.type;
  },
  getProductByBarcodeSuccess(state, action) {
    // console.log(action.payload,"Ffffffffff")
    state.getProductByBarcodeRes = action.payload;
    state.status = action.type;
  },
  getProductByBarcodeFailure(state, action) {
    state.error = action.error;
    state.status = action.type;
  },


  getProductDetailsRequest(state, action) {
    state.status = action.type;
  },
  getProductDetailsSuccess(state, action) {
    // console.log(action.payload,"Ffffffffff")
    state.getProductDetailsRes = action.payload;
    state.status = action.type;
  },
  getProductDetailsFailure(state, action) {
    state.error = action.error;
    state.status = action.type;
  },

  purchaseOrderRequest(state, action) {
    state.status = action.type;
  },
  purchaseOrderSuccess(state, action) {
    // console.log(action.payload,"Ffffffffff")
    state.purchaseOrderRes = action.payload;
    state.status = action.type;
  },
  purchaseOrderFailure(state, action) {
    state.error = action.error;
    state.status = action.type;
  },

 
 
 
  CreateurchaseOrderRequest(state, action) {
    state.status = action.type;
  },
  CreateurchaseOrderSuccess(state, action) {
    // console.log(action.payload,"Ffffffffff")
    state.createpurchaseOrderRes = action.payload;
    state.status = action.type;
  },
  CreateurchaseOrderFailure(state, action) {
    state.error = action.error;
    state.status = action.type;
  },

 
 
  getBatchRequest(state, action) {
    state.status = action.type;
  },
  getBatchSuccess(state, action) {
    // console.log(action.payload,"Ffffffffff")
    state.getBatchRes = action.payload;
    state.status = action.type;
  },
  getBatchFailure(state, action) {
    state.error = action.error;
    state.status = action.type;
  },

  
  
  addtoCartRequest(state, action) {
    state.status = action.type;
  },
  addtoCartSuccess(state, action) {
    // console.log(action.payload,"Ffffffffff")
    state.addToCartRes = action.payload;
    state.status = action.type;
  },
  addtoCartFailure(state, action) {
    state.error = action.error;
    state.status = action.type;
  },

  },
  clearProductStatus(state, action) {
    state.status = '';
  },
});

export const {
    TaxSlotRequest,
    TaxSlotSuccess,
    TaxSlotFailure,

    TaxSlotaddRequest,
    TaxSlotaddSuccess,
    TaxSlotaddFailure,

    ProductDetailsRequest,
    ProductDetailsSuccess,
    ProductDetailsFailure,

    VendorAddRequest,
    VendorAddSuccess,
    VendorAddFailure,

    VendorListRequest,
    VendorListSuccess,
    VendorListFailure,

    getProductByBarcodeRequest,
    getProductByBarcodeSuccess,
    getProductByBarcodeFailure,

    getProductDetailsRequest,
    getProductDetailsSuccess,
    getProductDetailsFailure,


    purchaseOrderRequest,
    purchaseOrderSuccess,
    purchaseOrderFailure,


    CreateurchaseOrderSuccess,
    CreateurchaseOrderRequest,
    CreateurchaseOrderFailure,


    getBatchRequest,
    getBatchSuccess,
    getBatchFailure,


    addtoCartRequest,
    addtoCartSuccess,
    addtoCartFailure,


  
    clearProductStatus

 
} = ProductSlice.actions;

export default ProductSlice.reducer;
