import React from "react"
import { useShopify, useUX } from "../hooks"
import { NavLink } from "react-router-dom"
import "./Home.scss"

export default (props) => {
	const { toggleCart } = useShopify()
	const { MenuState, toggleMenu, closeMenu } = useUX()
	let path = props.location.pathname.replace(/\//g, '')
	return (
		<header className="App__header" id={path}>
			<button
				className="menu-toggle material-icons-round"
				onClick={(e) => toggleMenu()}>menu
			</button>
			<NavLink 
				className="Header__Link" 
				to={"/Home"} 
				activeClassName="active"
				onClick={(e) => closeMenu()}
			>
				{/* <h2>{shopDetails.name}</h2> */}
				<h2>Kiwi Phong Nguyễn</h2>
			</NavLink>
			<NavLink 
				className="Header__Link desktop" 
				to={"/Custom"} 
				activeClassName="active"
			>
				<div></div>
				<div></div>
				<h2>Custom</h2>
			</NavLink>
			<NavLink 
				className="Header__Link desktop" 
				to={"/Collection"} 
				activeClassName="active"
			>
				<div></div>
				<div></div>
				<h2>Collection</h2>
			</NavLink>
			<NavLink 
				className="Header__Link desktop" 
				to={"/Archive"} 
				activeClassName="active"
			>
				<div></div>
				<div></div>
				<h2>Archive</h2>
			</NavLink>
			<NavLink 
				className="Header__Link desktop" 
				to={"/Contact"} 
				activeClassName="active"
			>
				<div></div>
				<div></div>
				<h2>CONTACT</h2>
			</NavLink>
			<ul className={`mobile-nav Open__${MenuState}`}>
				<li>
					<NavLink 
						className="Header__Link" 
						to={"/Custom"} 
						activeClassName="active"
						onClick={(e) => closeMenu()}
					>
						Custom
					</NavLink>
				</li>
				<li>
					<NavLink 
						className="Header__Link" 
						to={"/Collection"} 
						activeClassName="active"
						onClick={(e) => closeMenu()}
					>
						Collection
					</NavLink>
				</li>
				<li>
					<NavLink 
						className="Header__Link" 
						to={"/Archive"} 
						activeClassName="active"
						onClick={(e) => closeMenu()}
					>
						Archive
					</NavLink>
				</li>
				<li>
					<NavLink 
						className="Header__Link" 
						to={"/Contact"} 
						activeClassName="active"
						onClick={(e) => closeMenu()}
					>
						CONTACT
					</NavLink>
				</li>
			</ul>
			<button
				className="material-icons-round"
				onClick={(e) => toggleCart()}>shopping_cart
			</button>
		</header>
	)
}
