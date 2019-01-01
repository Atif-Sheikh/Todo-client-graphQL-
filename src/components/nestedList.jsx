import React from 'react';
import { gql } from 'apollo-boost';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import Edit from '@material-ui/icons/Edit';
import Done from '@material-ui/icons/Done';
import Cancel from '@material-ui/icons/Cancel';
import { graphql, compose } from 'react-apollo';
import { getTodosQuery, removeTodoMutation, updateTodoMutation } from '../queries/queries';

class NestedList extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedTodo: {},
            edit: false
        };
    };
    
    updateTodo = () => {
        var { id, name, type, priority } = this.state.selectedTodo;
        // if(JSON.stringify(this.props.todo) === JSON.stringify(this.state.selectedTodo)){
        //     alert('Already Updated');
        // }
        // else{
        this.setState({ selectedTodo: '', edit: false }, () => {
            this.props.updateTodoMutation({
                variables: {
                    id,
                    name,
                    type,
                    priority
                },
                refetchQueries: [{ query: getTodosQuery }]
            });
        });
        // }
    };

    deleteTodo = (id) => {
        let confirm = window.confirm('Delete this todo ?');
        if (confirm) {
            this.props.removeTodoMutation({
                variables: {
                    id: id,
                },
                refetchQueries: [{ query: getTodosQuery }]
            });
        }
    };

    render(){
        console.log(this.state.selectedTodo, "thiss")
        const { todo } = this.props;
        if(!!this.state.edit){
            return <li>
                <form onSubmit={this.updateTodo}>
                    <input type='text' value={this.state.selectedTodo.name} onChange={(e) => {
                        let todoName = this.state.selectedTodo;
                        todoName.name = e.target.value;
                        this.setState({ selectedTodo: todoName });
                    }} />
                </form> 
                    <Done onClick={this.updateTodo} />
                    <Cancel onClick={() => this.setState({ selectedTodo: {}, edit: false })} />
            </li>
        } 
        else {
            return(
                <li>
                    {todo.name}
                    <Edit onClick={() => this.setState({ selectedTodo: todo, edit: true })} />
                    <DeleteForeverOutlinedIcon onClick={() => this.deleteTodo(todo.id)} />
                </li>
            );
        }
    };
};

export default compose(
    graphql(removeTodoMutation, { name: 'removeTodoMutation' }),
    graphql(getTodosQuery, { name: 'getTodosQuery' }),
    graphql(updateTodoMutation, { name: 'updateTodoMutation' })
)(NestedList);