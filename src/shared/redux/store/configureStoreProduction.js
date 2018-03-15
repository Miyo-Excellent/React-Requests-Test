// Dependencies
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";

export default middleware => composeWithDevTools(applyMiddleware(...middleware));

