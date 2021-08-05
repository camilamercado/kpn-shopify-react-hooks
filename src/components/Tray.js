import React, { useState } from "react"
import { useUX, useShopify } from "../hooks"
import "./Cart.scss"

export default (props) => {
	const {
		openCart,
		checkoutState,
		addVariant,
		updateAttributes
	} = useShopify()

	const {
		trayItems,
		TrayState,
		setTrayState,
		removeFromTray
	} = useUX()

	const [formText, setText] = useState("")

	function handleChange(event) {
		setText(event.target.value)
  }

	function objectFormat(item){
		return { variantId: item, quantity: 1 }
	}

  function handleSubmit(event) {
    event.preventDefault();
		let lineItemsToAdd = trayItems.map(lineItem => objectFormat(lineItem.variants[0].id))
		const checkoutId = checkoutState.id
		addVariant(checkoutId, lineItemsToAdd)
		if (formText !== ""){
			updateCheckoutAttributes(formText)
		}
		openCart()
  }

	function removeItemsFromTray(e, lineItem, i){
		console.log('index no', lineItem)
		removeFromTray(lineItem)
	}

	function updateCheckoutAttributes(text) {
		console.log('update attributes')
		const checkoutId = checkoutState.id
		const input = {customAttributes: [{key: "Commission Description", value: text}]};
		updateAttributes(checkoutId, input)
	}

	return (
		<div id="cart-container" className={`tray-state_${TrayState}`}>
			<div className="Cart">
				<header className="Cart__header">
				<button
					className="state-1"
					onClick={(e) => setTrayState(0)}
				>➜</button>
					<h1>TRAY</h1>
				</header>
				<ul className="Tray__line-items">
				{trayItems && trayItems.map((lineItem, i) => {
						return (
							<li key={`${lineItem.title}` + i} 
									className="lineItem"
									onClick={(e) => removeItemsFromTray(lineItem, i)}>
									{lineItem.variants[0].image ? (
										<img
											src={lineItem.variants[0].image.src}
											alt={`${lineItem.title} product shot`}
										/>
									) : null}
								<div className="line-item__buttons">
									<button>REMOVE</button>
								</div>
							</li>
						)
					}
				)}
				</ul>
				<button
					className="state-0"
					onClick={(e) => setTrayState(1)}
				>➜</button>
				<footer className="Cart__footer">
				<form onSubmit={(e) => handleSubmit(e)}>
      		  <label>
      		    LEAVE A NOTE
      		  </label>
						<textarea value={formText} onChange={handleChange}>
						</textarea>
      		</form>
					<button
						className="Cart__checkout button"
						onClick={(e) => handleSubmit(e)}
					>
						COMMISSION
					</button>
				</footer>
			</div>
		</div>
	)
}
