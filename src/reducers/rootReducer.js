import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { calendarReducer } from "./calendarReducer";
import { uiReducer } from "./uireducer";


export const rootReducer=combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    //TODO: AuthReducer
    auth: authReducer,
    //TODO: CalenderReducer
})
