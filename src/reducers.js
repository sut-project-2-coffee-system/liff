import { combineReducers } from 'redux'



function menuList(state = [], action) {
    switch (action.type) {
        case 'menuList':
            return action.payload
        case 'RESET_MENU_LIST_AMOUNT':
            return state
        default:
            return state
    }
}


const reducers = combineReducers({
    menuList: menuList,
})

export default reducers