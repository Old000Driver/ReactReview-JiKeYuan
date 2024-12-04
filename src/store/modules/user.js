import { createSlice } from "@reduxjs/toolkit";
import { request, setToken as _setToken, getToken, removeToken } from "@/utils";
import { loginAPI, getProfileAPI } from "@/apis/user";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || "",
    userInfo: {},
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      // console.log("test222", action.payload, action);
      // localStorage.setItem("token_key", JSON.stringify(action.payload));
      _setToken(action.payload);
    },
    setUerInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.token = "";
      state.userInfo = {};
      removeToken();
    },
  },
});

const { setToken, setUerInfo, clearUserInfo } = userStore.actions;
const userReducer = userStore.reducer;

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await loginAPI(loginForm);
    console.log("res", res);
    dispatch(setToken(res.data.data.token));
  };
};

const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await getProfileAPI();
    console.log("fetchUserInfo-res", res);
    dispatch(setUerInfo(res.data.data));
  };
};

export { fetchLogin, fetchUserInfo, setToken, clearUserInfo };
export default userReducer;
