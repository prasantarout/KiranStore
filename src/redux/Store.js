import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import AuthReducer from "./reducer/AuthReducer";
import ProductReducer from "./reducer/ProductReducer";
import { logger } from "redux-logger";
import RootSaga from "./reduxSaga/RootSaga";

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, logger];

export default configureStore({
  reducer: {
    AuthReducer,
    ProductReducer
   
  },
  middleware,
});

sagaMiddleware.run(RootSaga);
