import { createSlice } from "@reduxjs/toolkit";
import { request, setToken as _setToken, getToken } from "@/utils";

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
  },
});

const { setToken, setUerInfo } = userStore.actions;
const userReducer = userStore.reducer;

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await request.post("authorizations", loginForm);
    console.log("res", res);
    dispatch(setToken(res.data.data.token));
  };
};

const fetchUserInfo = (loginForm) => {
  return async (dispatch) => {
    const res = await request.get("/user/profile");
    console.log("fetchUserInfo-res", res);
    dispatch(setUerInfo(res.data.data));
  };
};

export { fetchLogin, fetchUserInfo, setToken };
export default userReducer;
