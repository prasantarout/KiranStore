import { all } from "redux-saga/effects";
import AuthSaga from "./AuthSaga";
import ProductSaga from "./ProductSaga";

const combinedSaga = [
  ...AuthSaga,
  ...ProductSaga,

];

export default function* RootSaga() {
  yield all(combinedSaga);
}
