import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: JSON.parse(localStorage.getItem("token_key")),
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      // console.log("test222", action.payload, action);
      localStorage.setItem("token_key", JSON.stringify(action.payload));
    },
  },
});

const { setToken } = userStore.actions;
const userReducer = userStore.reducer;

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await request.post("authorizations", loginForm);
    console.log("res", res);
    dispatch(setToken(res.data.data.token));
  };
};

export { fetchLogin };
export default userReducer;
