import { legacy_createStore as CreateStore, combineReducers } from "redux";

const DefaultState = {
    toogle_menu: false
};

const MenuReducer = (state = DefaultState, action) => {

    if (action.type === 'Toggle') {
        return {...state, toogle_menu: action.payload};
    }

    return state;
};

const root = combineReducers({MenuReducer});

const store = CreateStore(root);
export default store;