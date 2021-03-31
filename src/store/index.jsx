import { compose, createStore, applyMiddleware } from "redux"
import { createWrapper } from "next-redux-wrapper"
import { devToolsEnhancer } from "redux-devtools-extension"
import createSagaMiddleware from 'redux-saga'
import reducers from "./reducers"
import sagas from './sagas'

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// Create a makeStore function
const makeStore = (context) => {
  const store = createStore(
    reducers,
    compose(
      // Apply Redux Saga as middleware
      applyMiddleware(sagaMiddleware),
      // Apply Redux Dev Tools
      devToolsEnhancer()
    )
  )

  // Run Redux Saga
  sagaMiddleware.run(sagas)
  return store
}

// Export an assembled wrapper
export const wrapper = createWrapper(makeStore)
