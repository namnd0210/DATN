import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducer';
import rootSaga from './saga';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(
  persistConfig,
  persistReducer(persistConfig, reducers),
);

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

let enhancers = [composeWithDevTools(applyMiddleware(...middlewares))];

// if (process.env.NODE_ENV !== 'production') {
//   enhancers.push(
//     (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
//       (window as any)?.__REDUX_DEVTOOLS_EXTENSION__(),
//   );
// }

const store = createStore(persistedReducer, compose(...enhancers));

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { persistor, store };
