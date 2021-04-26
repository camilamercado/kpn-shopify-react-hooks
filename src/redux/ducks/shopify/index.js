import { useSelector, useDispatch } from "react-redux"
import Client from "shopify-buy"

const client = Client.buildClient({
	storefrontAccessToken: process.env.REACT_APP_STOREFRONT_ACCESS_TOKEN,
  domain: process.env.REACT_APP_STOREFRONT_DOMAIN,
})

const PRODUCTS_FOUND = "shopify/PRODUCTS_FOUND"
const PRODUCT_FOUND = "shopify/PRODUCT_FOUND"

const COLLECTION_REQUESTED = "shopify/COLLECTION_REQUESTED"
const COLLECTION_FOUND = "shopify/COLLECTION_FOUND"
const CONTACT_REQUESTED = "shopify/CONTACT_REQUESTED"
const CONTACT_FOUND = "shopify/CONTACT_FOUND"
const CUSTOM_COLLECTION_REQUESTED = "shopify/CUSTOM_COLLECTION_REQUESTED"
const CUSTOM_COLLECTION_FOUND = "shopify/CUSTOM_COLLECTION_FOUND"
const ARCHIVE_COLLECTION_REQUESTED = "shopify/ARCHIVE_COLLECTION_REQUESTED"
const ARCHIVE_COLLECTION_FOUND = "shopify/ARCHIVE_COLLECTION_FOUND"

const CHECKOUT_FOUND = "shopify/CHECKOUT_FOUND"
const SHOP_FOUND = "shopify/SHOP_FOUND"
const ADD_VARIANT_TO_CART = "shopify/ADD_VARIANT_TO_CART"
const UPDATE_QUANTITY_IN_CART = "shopify/UPDATE_QUANTITY_IN_CART"
const REMOVE_LINE_ITEM_IN_CART = "shopify/REMOVE_LINE_ITEM_IN_CART"
const UPDATE_CHECKOUT_ATTRIBUTES = 'shopify/UPDATE_CHECKOUT_ATTRIBUTES'
const OPEN_CART = "shopify/OPEN_CART"
const CLOSE_CART = "shopify/CLOSE_CART"
const TOGGLE_CART = "shopify/TOGGLE_CART"
const CART_COUNT = "shopify/CART_COUNT"

const initialState = {
	isCartOpen: false,
	cartCount: 0,
	checkout: {},
	products: [],
	custom: {
		status: null,
		data: {},
		error: {}
	},
	collection: {
		status: null,
		data: {},
		error: {}
	},
	archive: {
		status: null,
		data: {},
		error: {}
	},
	contact: {
		status: null,
		data: {},
		error: {}
	},
	product: {},
	shop: {},
}

export default (state = initialState, action) => {
	switch (action.type) {
		case PRODUCTS_FOUND:
			return { ...state, products: action.payload }
		case PRODUCT_FOUND:
			return { ...state, product: action.payload }
		case CUSTOM_COLLECTION_REQUESTED:
			return { 
				...state, 
				custom: {
					status: 'loading',
					data: {},
					error: {} 
				}
			}
		case CUSTOM_COLLECTION_FOUND:
			return { 
				...state, 
				custom: {
					status: 'fulfilled',
					data: action.payload,
					error: {} 
				}
			}
		case CONTACT_REQUESTED:
			return { 
				...state, 
				contact: {
					status: 'loading',
					data: {},
					error: {} 
				}
			}
		case CONTACT_FOUND:
			return { 
				...state, 
				contact: {
					status: 'fulfilled',
					data: action.payload,
					error: {} 
				}
			}
		case COLLECTION_REQUESTED:
			return { 
				...state, 
				collection: {
					status: 'loading',
					data: {},
					error: {} 
				}
			}
		case COLLECTION_FOUND:
			return { 
				...state, 
				collection: {
					status: 'fulfilled',
					data: action.payload,
					error: {} 
				}
			}
		case ARCHIVE_COLLECTION_REQUESTED:
			return { 
				...state, 
				archive: {
					status: 'loading',
					data: {},
					error: {} 
				}
			}
		case ARCHIVE_COLLECTION_FOUND:
			return { 
				...state, 
				archive: {
					status: 'fulfilled',
					data: action.payload,
					error: {} 
				}
			}
		case CHECKOUT_FOUND:
			return { ...state, checkout: action.payload }
		case SHOP_FOUND:
			return { ...state, shop: action.payload }
		case ADD_VARIANT_TO_CART:
			return { ...state, checkout: action.payload }
		case UPDATE_QUANTITY_IN_CART:
			return { ...state, checkout: action.payload }
		case REMOVE_LINE_ITEM_IN_CART:
			return { ...state, checkout: action.payload }
		case UPDATE_CHECKOUT_ATTRIBUTES:
				return { ...state, checkout: action.payload }
		case OPEN_CART:
			return { ...state, isCartOpen: true }
		case TOGGLE_CART:
			return { ...state, isCartOpen: !state.isCartOpen }
		case CLOSE_CART:
			return { ...state, isCartOpen: false }
		case CART_COUNT:
			return { ...state, cartCount: action.payload }
		default:
			return state
	}
}

// Gets all the products from Shopify
function getProducts() {
	return (dispatch) => {
		client.product.fetchAll().then((resp) => {
			dispatch({
				type: PRODUCTS_FOUND,
				payload: resp,
			})
		})
	}
}

// Gets individual item based on id
function getProduct(id) {
	return async (dispatch) => {
		const resp = await client.product.fetch(id)
		dispatch({
			type: PRODUCT_FOUND,
			payload: resp,
		})
		return resp
	}
}

// Gets a  collection based on that collection's id

function getCollection(type, id) {
	const collectionId = id
	return (dispatch) => {
		if (type === 'collection'){
			dispatch({ type: COLLECTION_REQUESTED })
		} if (type === 'custom'){
			dispatch({ type: CUSTOM_COLLECTION_REQUESTED })
		} if (type === 'archive'){
			dispatch({ type: ARCHIVE_COLLECTION_REQUESTED })
		} if (type === 'contact'){
			dispatch({ type: CONTACT_REQUESTED })
		}
		client.collection.fetchWithProducts(collectionId, {productsFirst: 75}).then((resp) => {
			if (type === 'collection'){
				dispatch({
					type: COLLECTION_FOUND,
					payload: resp,
				})
			} if (type === 'custom'){
				dispatch({
					type: CUSTOM_COLLECTION_FOUND,
					payload: resp,
				})
			} if (type === 'archive'){
				dispatch({
					type: ARCHIVE_COLLECTION_FOUND,
					payload: resp,
				})
			} if (type === 'contact'){
				dispatch({
					type: CONTACT_FOUND,
					payload: resp,
				})
			}
		})
	}
}

// Creates initial checkout state from Shopify
function checkout() {
	return (dispatch) => {
		client.checkout.create().then((resp) => {
			dispatch({
				type: CHECKOUT_FOUND,
				payload: resp,
			})
		})
	}
}

// Gets Shopify store information
function shopInfo() {
	return (dispatch) => {
		client.shop.fetchInfo().then((resp) => {
			dispatch({
				type: SHOP_FOUND,
				payload: resp,
			})
		})
	}
}

// Adds variants to cart/checkout
function addVariantToCart(checkoutId, lineItemsToAdd) {
	return async (dispatch) => {
		console.log('ADDING LINE ITEMs', lineItemsToAdd)
		const response = await client.checkout.addLineItems(
			checkoutId,
			lineItemsToAdd
		)
		dispatch({
			type: ADD_VARIANT_TO_CART,
			payload: response,
		})
		console.log('ADDed LINE ITEM', response)
		return response
	}
}

// Updates quantity of line items in cart and in checkout state
function updateQuantityInCart(lineItemId, quantity, checkoutId) {
	const lineItemsToUpdate = [
		{ id: lineItemId, quantity: parseInt(quantity, 10) },
	]

	return async (dispatch) => {
		const resp = await client.checkout.updateLineItems(
			checkoutId,
			lineItemsToUpdate
		)
		dispatch({
			type: UPDATE_QUANTITY_IN_CART,
			payload: resp,
		})
		return resp
	}
}

// Removes line item from cart and checkout state
function removeLineItemInCart(checkoutId, lineItemId) {
	return (dispatch) => {
		client.checkout.removeLineItems(checkoutId, [lineItemId]).then((resp) => {
			dispatch({
				type: REMOVE_LINE_ITEM_IN_CART,
				payload: resp,
			})
		})
	}
}

// Removes line item from cart and checkout state
function updateCheckoutAttributes(checkoutId, input) {
	console.log('CALLING ATTR ACTION')
	return (dispatch) => {
		client.checkout.updateAttributes(checkoutId, input).then((resp) => {
			dispatch({
				type: UPDATE_CHECKOUT_ATTRIBUTES,
				payload: resp,
			})
		})
	}
}

// To close the cart
function handleCartClose() {
	return {
		type: CLOSE_CART,
	}
}

// To open the cart
function handleCartOpen() {
	return {
		type: OPEN_CART,
	}
}

function handleCartToggle() {
	return {
		type: TOGGLE_CART,
	}
}

// Set the count of items in the cart
function handleSetCount(count) {
	return {
		type: CART_COUNT,
		payload: count,
	}
}

export function useShopify() {
	const dispatch = useDispatch()
	const cartStatus = useSelector((appState) => appState.shopifyState.isCartOpen)
	const cartCount = useSelector((appState) => appState.shopifyState.cartCount)
	const products = useSelector((appState) => appState.shopifyState.products)
	const product = useSelector((appState) => appState.shopifyState.product)
	const collection = useSelector((appState) => appState.shopifyState.collection)
	const custom = useSelector((appState) => appState.shopifyState.custom)
	const archive = useSelector((appState) => appState.shopifyState.archive)
	const contact = useSelector((appState) => appState.shopifyState.contact)

	const checkoutState = useSelector(
		(appState) => appState.shopifyState.checkout
	)
	const shopDetails = useSelector((appState) => appState.shopifyState.shop)
	const fetchProducts = () => dispatch(getProducts())
	const fetchProduct = (id) => dispatch(getProduct(id))
	const fetchCollection = (type, id) => dispatch(getCollection(type, id))
	const createCheckout = () => dispatch(checkout())
	const createShop = () => dispatch(shopInfo())
	const closeCart = () => dispatch(handleCartClose())
	const openCart = () => dispatch(handleCartOpen())
	const toggleCart = () => dispatch(handleCartToggle())
	const setCount = (count) => dispatch(handleSetCount(count))

	const addVariant = (checkoutId, lineItemsToAdd) =>
		dispatch(addVariantToCart(checkoutId, lineItemsToAdd))
	const updateQuantity = (lineItemId, quantity, checkoutID) =>
		dispatch(updateQuantityInCart(lineItemId, quantity, checkoutID))
	const removeLineItem = (checkoutId, lineItemId) =>
		dispatch(removeLineItemInCart(checkoutId, lineItemId))
	const updateAttributes = (checkoutId, input) =>
		dispatch(updateCheckoutAttributes(checkoutId, input))
		
	return {
		products,
		product,
		collection,
		custom,
		archive,
		contact,
		cartStatus,
		checkoutState,
		cartCount,
		shopDetails,
		addVariant,
		fetchProducts,
		fetchProduct,
	  fetchCollection,
		createCheckout,
		createShop,
		closeCart,
		openCart,
		toggleCart,
		updateQuantity,
		updateAttributes,
		removeLineItem,
		setCount,
	}
}
