import React, { useEffect } from "react"
import Product from "./Product"
import ProductView from "./ProductView"
import "./Products.scss"
import "./Loop.scss"
import { useUX, useShopify, } from "../hooks"
import Tray from "./Tray"

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
	const collectionID = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI2MDgyOTU3NzI5Nw==';
	useEffect(() => {
		if (custom.status !== 'fulfilled'){
			fetchCollection('custom', collectionID)
		}
	}, [collectionID])

	function handleClose(e) {
		e.preventDefault()
		closeLoop()
	}
	return (
		<div className="custom-products-page">
			<div className="instructions header">
				<h2>Commission a Custom Piece</h2>
				<p>Add up to three objects from my collection to the tray</p>
				<p>✸</p>
				<p>Once you have selected your peices, write me a note describing your personal style, budget and what type of piece you want– earings, necklace, harness, or something entirely custom</p>
				<p>✸</p>
				<p>Click "Commission" to add your peices and note to the cart, you can continue to checkout, or continue exploring</p>
				<p>✸</p>
				<p>Once I recieve the commision I will reach out to your provided email within a few days to discuss timeline, details and cost</p>
				<p>⇊</p>
			</div>
		<Tray />
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
					<p>Add up to three objects to the tray</p><p>✸</p>
					<p>Write a note for reference</p>
					<p>✸</p>
					<p>Click "Commission" and checkout, or continue exploring</p>
					<p>✸</p>
				</div>
			</div>
			<div className={`Loop Object__Text Open__${LoopState}`} onClick={(e) => handleClose(e)}>
				<ProductView history={props.history} id={id} />
			</div>
		</div>
		</div>
	)
}
