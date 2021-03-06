import React, { useEffect } from "react"
import "./Products.scss"
import { useShopify, } from "../hooks"

export default (props) => {

	const {
		archive,
		fetchCollection,
	} = useShopify()

	const collectionID = process.env.REACT_APP_ARCHIVE_COLLECTION_ID
	useEffect(() => {
		if (archive.status !== 'fulfilled'){
			fetchCollection('archive', collectionID)
		}
	}, [collectionID])

	const featured = archive.data	

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
								<p className="Product__description" dangerouslySetInnerHTML={{__html: product.descriptionHtml}}></p>
							</div>
						</div>
					)
				})}
		</div>
	)
}
