import React, { useEffect, useState } from "react"
import ProductPoster from "./ProductPoster"
import ProductView from "./ProductView"
import "./Products.scss"
import "./Loop.scss"
import { useUX, useShopify, } from "../hooks"

export default (props) => {

	const {
		product,
		collection,
		fetchCollection,
		fetchProduct,
		openCart,
		checkoutState,
		addVariant,
	} = useShopify()

	const id = props.match.params.productId
	const collectionID = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI2MDgyOTYxMDA2NQ==';
	useEffect(() => {
		if (collection.status != 'fulfilled'){
			fetchCollection('collection', collectionID)
		}
	}, ['collection', collectionID])
	

	// const defaultSize = product.variants && product.variants[0].id.toString()
	const [size, setSize] = useState("")
	const [quantity, setQuantity] = useState(1)
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
