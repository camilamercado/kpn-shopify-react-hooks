import React, { useEffect, useState } from "react"
import "./Products.scss"
import "./Loop.scss"
import { useShopify } from "../hooks"

export default (props) => {

	const {
		collection,
		fetchCollection,
		openCart,
		checkoutState,
		addVariant,
	} = useShopify()

	const collectionID = process.env.REACT_APP_COLLECTION_COLLECTION_ID

	useEffect(() => {
		if (collection.status !== 'fulfilled'){
			fetchCollection('collection', collectionID)
		}
	}, [collectionID])
	

	const [size] = useState("")
	const [quantity] = useState(1)
	const featured = collection.data
	
	function changeSize(sizeId, quantity, product) {
		openCart()
		console.log('product', product, 'sizeID', sizeId, 'quantity', quantity)
		const defaultSize = product.variants && product.variants[0].id.toString()
		if (sizeId === "") {
			sizeId = defaultSize
			const lineItemsToAdd = [
				{ variantId: sizeId, quantity: parseInt(quantity, 10) },
			]
			const checkoutId = checkoutState.id
			addVariant(checkoutId, lineItemsToAdd)
		} else {
			const lineItemsToAdd = [
				{ variantId: sizeId, quantity: parseInt(quantity, 10) },
			]
			const checkoutId = checkoutState.id
			addVariant(checkoutId, lineItemsToAdd)
		}
	}

	return (
		<div className="Products-wrapper collection">
			{featured.products &&
				featured.products.map((product, i) => {
					return (
						<div className="Product poster" key={product.id + i}>
							{product.images &&
								product.images.map((image, i) => {
									return (
										<figure>
											<img
												key={image.id + i}
												src={image.src}
												alt={`${product.title} product shot`}
											/>
										</figure>
									)
								})}
							<div className="Product__details">
								<h2 className="Product__title">{product.title}</h2>
								<span className="Product__price">${product.variants[0].price}</span>
								<div className="Product__info">
									<button
										className="prodBuy button"
										onClick={(e) => changeSize(size, quantity, product)}
									>
										Add to Cart +
									</button>
									<p className="Product__description">{product.description}</p>
								</div>
							</div>
						</div>
					)
				})}
		</div>
	)
}
