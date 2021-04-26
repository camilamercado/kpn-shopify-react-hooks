import React from "react"
import { useShopify } from "../hooks"
import { NavLink } from "react-router-dom"
import "./Home.scss"

export default (props) => {
	const { shopDetails, toggleCart } = useShopify()

	
	return (
		<ul id="Home">
			<li><h2>Kiwi Phong Nguyen</h2></li>
			<li><h2>Custom<br></br>Commissions</h2></li>
			<li><h2>Shop<br></br>Jewelry</h2></li>
			<li><h2>Contact</h2></li>
			<li><h2>Objects</h2></li>
		</ul>
	)
}
