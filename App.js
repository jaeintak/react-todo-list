import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoForm from "./components/TodoForm";
import Todo from "./components/Todo"

class App extends Component {

  state = {
    component: null,
    todos: [],
    todotoShow: 'all'

  };


  addTodo = (todo) => {
    //this.state.todos.push(todo); mutae is a bad idea
    const newTodos = [todo, ...this.state.todos];  //...is copying
    this.setState({
      todos: newTodos
    });
  };

  toggleComplete = (id) =>{
    this.setState({
      todos: this.state.todos.map(todo =>{
        if(todo.id === id){
          return {
            text: todo.text,
            complete: !todo.complete,
            id: todo.id
          }
        }
        else{
          return todo;
        }
      })
    })
  };

  updateTodoToShow = (s) =>{
    this.setState({
      todotoShow: s
    })

  };

  deleteTodo = (id) =>{
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)

    });
  };

  removeComplete = () =>{
    this.setState({
      todos: this.state.todos.filter(todo => !todo.complete)
    })
  }

  render() {
    let todos = [];
    if(this.state.todotoShow === "all"){
      todos = this.state.todos;
    }
    else if(this.state.todotoShow === "activate"){
      todos = this.state.todos.filter(todo =>!todo.complete);
    }
     else if(this.state.todotoShow === "complete"){
      todos = this.state.todos.filter(todo =>todo.complete);
    }

    if(this.state.component === null){
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Welcome to the ultimate todo-list.
            </p>
            <button onClick = {()=>{this.setState({component: "form"})}}>Start</button>
          </header>
        </div>
      )  
    }
    if(this.state.component === "form"){
      return(
        <div>
          <body className="App-body">
            <TodoForm onSubmit={this.addTodo} />
            <div>{this.state.todos.filter(todo =>todo.complete).length} completed and {this.state.todos.filter(todo =>!todo.complete).length} left to do!</div>
            <div>
              {this.state.todotoShow === "activate" || this.state.todotoShow ==="complete" ? <button onClick={() => this.updateTodoToShow("all")}>Show All</button> : null}
              <button onClick={() => this.updateTodoToShow("activate")}>Show To Do</button>
              <button onClick={() => this.updateTodoToShow("complete")}>Show Completed</button>
            </div>
            {todos.map(todo=>(
              <ul key={todo.id}>
                <Todo key={todo.id} 
                      todo = {todo}
                      toggleComplete={()=>this.toggleComplete(todo.id)}
                      deleteTodo = {()=>this.deleteTodo(todo.id)}
                />
              </ul>
              ))}
            {this.state.todos.some(todo=> todo.complete)? <button onClick={this.removeComplete}>Remove Completed</button>: null}
          </body>
        </div>
      );
    }
  }
}

export default App;
