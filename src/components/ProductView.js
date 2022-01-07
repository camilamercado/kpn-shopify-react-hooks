import React, { useEffect } from "react"
import { useShopify, useUX } from "../hooks"

export default (props) => {
	const {
		product,
		fetchProduct,
	} = useShopify()

	const {
		addToTray
	} = useUX()

	const id = props.id
	
	function addItemsToTray(product){
		console.log('adding to tray', product)
		addToTray(product)
	}

	useEffect(() => {
		fetchProduct(id)
	}, [id, fetchProduct])

	return (
		<div id="individualProduct">
			<div className="Product__info">
				<h2 className="Product__title">{product.title}</h2>
				<button
					className="prodBuy button"
					onClick={(e) => addItemsToTray(product)}
				>
					Add to Tray +
				</button>
				{ product.description && 
					<div className="Product__description">
						{product.description}
					</div>
				}
			</div>
		</div>
	)
}
