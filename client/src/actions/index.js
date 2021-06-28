import axios from "axios";
import { FETCH_USER } from "./types.js";

// redux see that we returned a function
// Redux thunk will automatically call the function and pass the dispatch
// parameter on the function
// If you have the arrow function with a single expression inside
// you can remove the {} and the return keyword

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};
