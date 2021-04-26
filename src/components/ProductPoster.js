import React, {useState} from "react"
import { useUX, useShopify } from "../hooks"

export default (props) => {
	// const { featured, fetchProduct, addVariant } = useShopify()
	const {
		featured,
		product,
		fetchProduct,
		openCart,
		checkoutState,
		addVariant,
	} = useShopify()
	// function handleClick(e, product_id) {
	// 	e.preventDefault()
	// 	openLoop()
	// 	const id = product_id
	// 	fetchProduct(id).then((res) => {
	// 		props.history.push(`/Custom/${res.id}`)
	// 	})
	// }

	const id = props.id
	const defaultSize = product.variants && product.variants[0].id.toString()
	const [size, setSize] = useState("")
	const [quantity, setQuantity] = useState(1)

	const description = product.description && product.description.split(".")

	function changeSize(sizeId, quantity) {
		openCart()
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
		<div className="Product-poster">
			{featured.products &&
				featured.products.map((product, i) => {
					const image = product.images[0]
					return (
						<div className="Product" key={product.id + i}>
							{image ? (
								<img src={image.src} alt={`${product.title} product shot`} />
							) : null}
							<div>
								<h4 className="Product__title">{product.title}</h4>
								<p className="Product__price">${product.variants[0].price}</p>
							</div>
							<div id="individualProduct">
							<div className="Product__info">
								<button
									className="prodBuy button"
									onClick={(e) => changeSize(size, quantity)}
								>
									Add to Cart
								</button>
								<ul className="Product__description">
									{description &&
										description.map((each, i) => {
											return <li key={`line-description +${i}`}>{each}</li>
										})}
								</ul>
							</div>
						</div>
						</div>
					)
				})}
		</div>
	)
}
