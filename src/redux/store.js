import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Reducers/authReducer'
import todosReducer from './Reducers/todosReducer'

const reducer = {
    todos: todosReducer,
    auth: authReducer
  }

export default configureStore({
    reducer,
})