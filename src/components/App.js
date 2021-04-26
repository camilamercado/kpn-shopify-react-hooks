import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
// import CustomProducts from "./CustomProducts"
import CustomProducts from "./Custom2"
import CollectionProducts from "./CollectionProducts"
import Cart from "./Cart"
import Tray from "./Tray"
import Contact from "./Contact"
import Header from "./Header"
import Archive from "./Archive"
import { useShopify } from "../hooks"

export default (props) => {
	const {
		createShop,
		createCheckout,
		fetchProducts,
		// fetchCollection,
	} = useShopify()

	useEffect(() => {
		createShop()
		fetchProducts()
		createCheckout()
		// fetchCollection()
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
