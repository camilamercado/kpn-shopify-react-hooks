import React from "react"
import { useUX, useShopify } from "../hooks"

export default (props) => {
	const { custom, fetchProduct } = useShopify()
	const {
		openLoop,
		addToTray
	} = useUX()

	const featured = custom.data

	function handleClick(e, product_id) {
		e.preventDefault()
		openLoop()
		const id = product_id
		fetchProduct(id).then((res) => {
			props.history.push(`/Custom/${res.id}`)
		})
	}

	// const id = props.id
	// const description = product.description && product.description.split(".")

	function addItemsToTray(product){
		console.log('adding to tray', product)
		addToTray(product)
	}

	return (
		<div className="Product-wrapper">
			{featured.products &&
				featured.products.map((product, i) => {
					const image = product.images[0]
					return (
						<div className="Product" key={product.id + i} onClick={(e) => handleClick(e, product.id)}>
							{image ? (
								<img src={image.src} alt={`${product.title} product shot`} />
							) : null}
							<div className="Product__info">
								<h2 className="Product__title">{product.title}</h2>

									<button
										className="prodBuy button"
										onClick={(e) => addItemsToTray(product)}
									>
										Add to Tray +
									</button>
									<div className="Product__description">
										{product.description}
									</div>
								</div>
						</div>
					)
				})}
		</div>
	)
}
