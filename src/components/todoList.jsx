import React from 'react';
import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';
import { getTodosQuery, removeTodoMutation } from '../queries/queries';
import NestedList from './nestedList';

class TodoList extends React.Component {
    displayTodos = () => {
        let data = this.props.getTodosQuery;
        console.log(data, "dataaaa");
        if (data && data.loading) {
            return <h1>Loading Todos...</h1>;
        } else {
            return data.todos && data.todos.map((todo, ind) => 
                // <li key={todo.id}>
                //     {todo.name}
                //     <button onClick={() => this.setState({ selectedTodo: todo, edit: true })}>Edit</button>
                //     <button onClick={() => this.deleteTodo(todo.id)}>x</button>
                // </li>
                <NestedList key={todo.id} todo={todo} />
            );
        }
    };
    render() {
        return (
            <div>
                <ul id="todo-list">
                    {this.displayTodos()}
                </ul>
            </div>
        );
    };
};

export default compose(
    graphql(removeTodoMutation, { name: 'removeTodoMutation' }),
    graphql(getTodosQuery, { name: 'getTodosQuery' }),
)(TodoList);