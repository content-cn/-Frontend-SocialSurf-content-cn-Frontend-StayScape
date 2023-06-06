import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("currentUser")) || null,
  isLoading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isLoading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isLoading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isLoading: false,
        error: action.payload,
      };
    case "REGISTER_FAILURE":
      return {
        user: null,
        isLoading: false,
        error: action.payload,
      };

    case "LOGOUT":
      localStorage.removeItem("currentUser");
      return {
        user: null,
        isLoading: false,
        error: null,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoading: state.isLoading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
