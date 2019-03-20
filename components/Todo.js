import React from "react";

export default (props) =>(
	<li style={{
		textDecoration: props.todo.complete? 'line-through': ''
	}}>{props.todo.text}
 	<button onClick = {props.toggleComplete}>Done</button>
 	<button onClick={props.deleteTodo}>Delete</button>
	</li>
);