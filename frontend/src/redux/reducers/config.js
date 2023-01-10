import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'config',
  initialState: {
    value: "",
  },
  reducers: {
    modify_token: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { modify_token } = counterSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const get_token = (state) => state.config.value

export default counterSlice.reducer
