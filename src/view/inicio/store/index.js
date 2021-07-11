import { configureStore } from '@reduxjs/toolkit'
import globalSlice from './slice'

import { DEVELOPMENT } from '../../../utils/globalConst'

import dotenv from 'dotenv'
dotenv.config()

const NODE_ENV = process.env.REACT_APP_NODE_ENV || DEVELOPMENT

export default configureStore({
  reducer: {
      global: globalSlice
  },
  devTools: (NODE_ENV === DEVELOPMENT)
})
