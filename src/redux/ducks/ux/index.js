import { useSelector, useDispatch } from "react-redux"

const initialState = {
	LoopState: false,
	trayState: 0,
	trayItems: [],
	MenuState: false,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case OPEN_LOOP:
			return { ...state, LoopState: true }
		case CLOSE_LOOP:
			return { ...state, LoopState: false }
		case SET_TRAY_STATE:
			return { ...state, trayState: action.payload }
		case ADD_TO_TRAY:
			return { ...state, trayItems: [...state.trayItems, action.payload] }
		case REMOVE_FROM_TRAY:
			let newArray = state.trayItems.slice();
    	newArray.splice(action.payload, 1);
			return { 
				...state, 
				trayItems: newArray
			}
		case TOGGLE_MENU:
			return { ...state, MenuState: !state.MenuState }
		case CLOSE_MENU:
			return { ...state, MenuState: false }
		default:
			return state
	}
}

const OPEN_LOOP = "ux/OPEN_LOOP"
const CLOSE_LOOP = "ux/CLOSE_LOOP"
const ADD_TO_TRAY = "ux/ADD_TO_TRAY"
const SET_TRAY_STATE = "ux/SET_TRAY_STATE"
const REMOVE_FROM_TRAY = "ux/REMOVE_FROM_TRAY"
const TOGGLE_MENU = "ux/TOGGLE_MENU"
const CLOSE_MENU = "ux/CLOSE_MENU"

function addItemToTray(product){
	return {
		type: ADD_TO_TRAY,
		payload: product,
	}
}

function removeItemFromTray(index){
	return {
		type: REMOVE_FROM_TRAY,
		payload: index,
	}
}

function setNewTrayState(index){
	return {
		type: SET_TRAY_STATE,
		payload: index,
	}
}

// To close the Loop
function handleLoopClose() {
	return {
		type: CLOSE_LOOP,
	}
}

// To open the Loop
function handleLoopOpen() {
	return {
		type: OPEN_LOOP,
	}
}

// To open the Loop
function toggleMenuState() {
	return {
		type: TOGGLE_MENU
	}
}

// To open the Loop
function setMenuStateFalse() {
	return {
		type: CLOSE_MENU
	}
}

export function useUX() {
	const dispatch = useDispatch()
  const LoopState = useSelector((appState) => appState.uxState.LoopState)
	const TrayState = useSelector((appState) => appState.uxState.trayState)
	const trayItems = useSelector((appState) => appState.uxState.trayItems)
  const MenuState = useSelector((appState) => appState.uxState.MenuState)
	const addToTray = (product) => dispatch(addItemToTray(product))
	const removeFromTray = (index) => dispatch(removeItemFromTray(index))
	const setTrayState = (index) => dispatch(setNewTrayState(index))
	const closeLoop = () => dispatch(handleLoopClose())
	const openLoop = () => dispatch(handleLoopOpen())
	const toggleMenu = () => dispatch(toggleMenuState())
	const closeMenu = () => dispatch(setMenuStateFalse())

	return {
		LoopState,
	  TrayState,
    closeLoop,
    openLoop,
		trayItems,
		addToTray,
		removeFromTray,
		setTrayState,
		MenuState,
		toggleMenu,
		closeMenu
	}
}