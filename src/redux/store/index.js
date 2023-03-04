import { applyMiddleware, createStore, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunkMiddleware from "redux-thunk";

import rootReducer from "../reducers/root";

const loggerMiddleware = createLogger();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth",'sideMenu'], //Persist Reducers
  blacklist: [], //Add Other Reducers
};
const enhancers = compose(applyMiddleware(thunkMiddleware, loggerMiddleware));
const store = createStore(
  persistReducer(persistConfig, rootReducer),
  composeWithDevTools(enhancers)
);
const persistor = persistStore(store);

export { rootReducer, store, persistor };

export default store;
