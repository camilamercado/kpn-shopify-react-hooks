import React, { useEffect } from "react"
import Product from "./Product"
import ProductView from "./ProductView"
import "./Products.scss"
import "./Loop.scss"
import { useUX, useShopify, } from "../hooks"

export default (props) => {
	const {
		LoopState,
		closeLoop,
		trayItems
	} = useUX()

	const {
		product,
		custom,
		fetchCollection,
	} = useShopify()

	const id = props.match.params.productId
	const collectionID = process.env.REACT_APP_COLLECTION_CUSTOM_ID;
	useEffect(() => {
		if (custom.status !== 'fulfilled'){
			fetchCollection('custom', collectionID)
		}
	}, ['custom', collectionID])

	function handleClose(e) {
		e.preventDefault()
		closeLoop()
	}
	return (
		<div className={`Products-wrapper custom ${trayItems.length === 3 ? "inactive" : ""}`}>
			<Product history={props.history} />
			<div className={`Loop Object__Image Open__${LoopState}`}>
				<figure>
					{product.images &&
						product.images.map((image, i) => {
							return (
								<img
									key={image.id + i}
									src={image.src}
									alt={`${product.title} product shot`}
								/>
							)
						})}
				</figure>
				<div className="instructions">
					<h2>Commission<br></br>a Custom Piece</h2>
					<p>Add up to three objects to the tray</p>
					<p>Write a note for reference</p>
				</div>
			</div>
			<div className={`Loop Object__Text Open__${LoopState}`} onClick={(e) => handleClose(e)}>
				<ProductView history={props.history} id={id} />
			</div>
		</div>
	)
}
