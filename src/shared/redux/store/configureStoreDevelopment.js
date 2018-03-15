
// Dependencies
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

export default middleware => composeWithDevTools(applyMiddleware(...middleware));
