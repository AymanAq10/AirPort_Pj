import { legacy_createStore as CreateStore, combineReducers } from "redux";

const DefaultState = {
    toogle_menu: false, ToggleSignUp: false,Login:false
};

const MenuReducer = (state = DefaultState, action) => {

    if (action.type === 'Toggle') {
        return {...state, toogle_menu: action.payload};
    }

    return state;
};

const LoginReducer = (state = DefaultState,action)=>{
    if (action.type === 'Login') {
        return{...state,Login:action.payload};
    }
    return state;
}
const SignUpReducer = (state = DefaultState, action) => {

    if (action.type === 'Toggle_SingUp') {
        return { ...state, ToggleSignUp: action.payload };
    }

    return state;

};

const root = combineReducers({ MenuReducer, SignUpReducer,LoginReducer });

const store = CreateStore(root);
export default store;