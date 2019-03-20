import React from "react";
import shortid from "shortid";

export default class TodoForm extends React.Component{
	state={
		text: "" 
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleSubmit = (event) =>{
		event.preventDefault();
		//console.log(this.state);
		this.props.onSubmit({
			text: this.state.text,
			complete: false,
			id: shortid.generate()
		});
		this.setState({text:""})
	}

	render (){
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<input 
						name = "text" 
						placeholder = "call mom" 
						value={this.state.text} 
						onChange={this.handleChange} />
					<button type="submit">Add</button>
				</form>
			</div>
		)
	}
}