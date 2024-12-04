const TOKENKEY = "token_key";

function setToken(token) {
  localStorage.setItem(TOKENKEY, JSON.stringify(token));
}

function getToken() {
  return JSON.parse(localStorage.getItem(TOKENKEY));
}

function removeToken() {
  localStorage.removeItem(TOKENKEY);
}

export { setToken, getToken, removeToken };
