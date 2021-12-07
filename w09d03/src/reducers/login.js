const insitialState = {
  user: null,
  token: "",
};

const signIn = (state = insitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      // eslint-disable-next-line
      const { user, token } = payload;
      localStorage.setItem("token", token);
      localStorage.setItem("user", payload.user._id);

      return { user: payload.user, token: payload.token };

    case "LOGOUT":
      localStorage.clear();
      return { user: null, token: "" };
    default:
      const tokenStorage = localStorage.getItem("token");
      if (tokenStorage) {
        return { token: tokenStorage };
      } else {
        return state;
      }
  }
};

export default signIn;

export const login = (data) => {
  return {
    type: "LOGIN",
    payload: data.data,
  };
};

export const logout = (data) => {
  return {
    type: "LOGOUT",
    payload: data,
  };
};
