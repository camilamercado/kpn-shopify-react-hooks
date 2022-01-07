import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import CustomProducts from "./CustomProducts"
import CollectionProducts from "./CollectionProducts"
import Cart from "./Cart"
import Contact from "./Contact"
import Header from "./Header"
import Archive from "./Archive"
import { useShopify } from "../hooks"

export default (props) => {
	const {
		createShop,
		createCheckout,
		fetchProducts,
	} = useShopify()

	useEffect(() => {
		createShop()
		fetchProducts()
		createCheckout()
	}, [])

	// let path = props
	// console.log(path)

	return (
		<Router>
			<div id="App">
				<Route exact path="/" render={() => <Redirect to="/Home" />} />
				<Route path="/" component={Header} />
				<Route path="/Contact" component={Contact} />
				<Route path="/Custom" component={CustomProducts} />
				{/* <Route path="/Custom" component={Tray} /> */}
				<Route path="/Collection" component={CollectionProducts} />
				<Route path="/Archive" component={Archive} />
				<Route path="/" component={Cart} />
			</div>
		</Router>
	)
}
