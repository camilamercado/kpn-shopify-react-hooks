import React from "react"
import Product from "./Product"
import "./Loop.scss"


export default (props) => {
	return (
		<div className="Loop">
			<div className="Object__Image">
				<figure></figure>
				<div className="instrucutions">
				*Select up to three objects*
				*Upload any image* 
				(for reference / inclusion)
				</div>
			</div>
			<div className="Object__Text">
				<p></p>
			</div>
		</div>
	)
}
