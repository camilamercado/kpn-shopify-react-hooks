import React, { useEffect } from "react"
import { useShopify } from "../hooks"
import { NavLink } from "react-router-dom"
// import Kiwi from '/assets/images/Kiwi.jpg';
import "./Contact.scss"

export default (props) => {

	const {
		contact,
		fetchCollection,
	} = useShopify()

	const collectionID = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzMwODg5Mjk5OA==';
	useEffect(() => {
		if (contact.status != 'fulfilled'){
			fetchCollection('contact', collectionID)
		}
	}, ['contact', collectionID])

	const featured = contact.data
	const imgUrl = featured.image ? featured.image.src : process.env.PUBLIC_URL + '/images/Kiwi.jpg'

	return (
		<section id="Contact">
			<figure><img src={imgUrl}></img></figure>
			<div className="Contact__details">
				<h2>{ featured.title }</h2>
				<p className="Product__description" dangerouslySetInnerHTML={{__html: featured.descriptionHtml}}></p>
			</div>
		</section>
	)
}
