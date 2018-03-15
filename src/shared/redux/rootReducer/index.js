// Dependencies
import { combineReducers } from "redux";

// Devices Reducers
import devices from "./deviceReducer";

// Views Reducers
import home from "../../../app/views/Home/reducer";

export default function rootReducer() {
  return combineReducers({
    devices,
    home,
    realtime: true
  });
}
