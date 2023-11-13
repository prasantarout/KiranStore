import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  isLoading: true,
  TaxSlotRes: {},
  TaxSlotaddRes: {},
  prodctDetailsRes: {},
  vendorRes: {},
  getVendorRes: {},
  getProductByBarcodeRes: {},
  getProductDetailsRes: [],
  purchaseOrderRes: {},
  createpurchaseOrderRes: {},
  getBatchRes: {},
  addToCartRes: {},
  getProductRes: {},
  scannedProducts: [],
  getPurchaseProduct:[],
  getProductByBarcodeSaleRes:{},
  getCartDetailsRes:{},
  gettingProductSalesRes:[],
  finalSaleRes:{},
  updateCartProductQunatityRes:{},
  deleteCartProductQuantityRes:{}



};

const ProductSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    //Signup page
    TaxSlotRequest(state, action) {
      state.status = action.type;
    },
    TaxSlotSuccess(state, action) {
      // console.log(action.payload,"Ffffffffff")
      state.TaxSlotRes = action.payload;
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
      state.TaxSlotaddRes = action.payload;
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

    getProductByBarcodeSaleRequest(state, action) {
      state.status = action.type;
    },
    getProductByBarcodeSaleSuccess(state, action) {
      // console.log(action.payload,"Ffffffffff")
      // let tempArr=[];
      // gettingProductSalesRes
      state.getProductByBarcodeSaleRes = action.payload;
      state.status = action.type;
    },
    
    getProductByBarcodeSaleFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

   
   
    getSaleCartDetailsRequest(state, action) {
      state.status = action.type;
    },
    getSaleCartDetailsSuccess(state, action) {
      // console.log(action.payload,"Ffffffffff")
      state.getCartDetailsRes = action.payload;
      state.status = action.type;
    },
    getSaleCartDetailsFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

   
   
    getProductDetailsRequest(state, action) {
      state.status = action.type;
    },
    getProductDetailsSuccess(state, action) {
      // ...state,
      const updatedProductDetails = [...state.getProductDetailsRes, action.payload];
      console.log(updatedProductDetails,"csfkjsfsfxCn");
      return {
        ...state,
        getProductDetailsRes: updatedProductDetails,
        status: action.type,
      };
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

    createurchaseOrderRequest(state, action) {
      state.status = action.type;
    },
    createurchaseOrderSuccess(state, action) {
      // console.log(action.payload,"Ffffffffff")
      state.createpurchaseOrderRes = action.payload;
      state.status = action.type;
    },
    createurchaseOrderFailure(state, action) {
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

    getProductRequest(state, action) {
      state.status = action.type;
    },
    getProductSuccess(state, action) {
      // console.log(action.payload,"Ffffffffff")
      state.getProductRes = action.payload;
      state.status = action.type;
    },
    getProductFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
   
    
    
    finalSaleRequest(state, action) {
      state.status = action.type;
    },
    finalSaleSuccess(state, action) {
      // console.log(action.payload,"Ffffffffff")
      state.finalSaleRes = action.payload;
      state.status = action.type;
    },
    finalSaleFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },


    updateProductQuantityRequest(state, action) {
      state.status = action.type;
    },
    updateProductQuantitySuccess(state, action) {
      // console.log(action.payload,"Ffffffffff")
      state.updateCartProductQunatityRes = action.payload;
      state.status = action.type;
    },
    updateProductQuantityFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },


    deleteCartRequest(state, action) {
      state.status = action.type;
    },
    deleteCartSuccess(state, action) {
      // console.log(action.payload,"Ffffffffff")
      state.deleteCartProductQuantityRes = action.payload;
      state.status = action.type;
    },
    deleteCartFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

     mergeProductsReq(state, action) {
      const scannedProduct = action.payload;
      // Check if the scanned product is not already in the scannedProducts array
      if (
        !state.scannedProducts.some(product => product.id === scannedProduct.id)
      ) {
        // Merge the scanned product into getProductRes
        state.getProductRes = [...state.getProductRes, scannedProduct];
        // Add the scanned product to the scannedProducts array
        state.scannedProducts = [...state.scannedProducts, scannedProduct];
      }
    },

  // getPurchaseProductRequest(state, action) {
  //   let purchaseProductRes = action.payload;
  //   state.getPurchaseProduct=[...state.getProductDetailsRes,...purchaseProductRes];
  //   console.log()
  // },
   clearBarcodeDetails(state, action) {
    state.status = action.type;
   },

   clearProductDetails(state, action) {
    state.status = action.type;
   },
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

  createurchaseOrderSuccess,
  createurchaseOrderRequest,
  createurchaseOrderFailure,

  getBatchRequest,
  getBatchSuccess,
  getBatchFailure,

  addtoCartRequest,
  addtoCartSuccess,
  addtoCartFailure,

  getProductRequest,
  getProductSuccess,
  getProductFailure,
  
  mergeProductsReq,
  clearBarcodeDetails,
  clearProductDetails,

  getProductByBarcodeSaleRequest,
  getProductByBarcodeSaleSuccess,
  getProductByBarcodeSaleFailure,


  getSaleCartDetailsRequest,
  getSaleCartDetailsSuccess,
  getSaleCartDetailsFailure,


  finalSaleRequest,
  finalSaleSuccess,
  finalSaleFailure,

  deleteCartRequest,
  deleteCartSuccess,
  deleteCartFailure,

  updateProductQuantityRequest,
  updateProductQuantitySuccess,
  updateProductQuantityFailure,

  getPurchaseProductRequest
} = ProductSlice.actions;

export default ProductSlice.reducer;
