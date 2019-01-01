import React from 'react';
import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';
import { getTodosQuery, addTodoMutation } from '../queries/queries';

class AddTodo extends React.Component {
    constructor(){
        super();
        this.state = {
            todo: '',
            priority: '',
            type: ''
        }
    };
    addTodo = (e) => {
        e.preventDefault();
        const { todo, priority, type } = this.state;
        if(todo.trim() && priority.trim() && type.trim()){
            this.setState({todo: '', priority: '', type: ''});
            this.props.addTodoMutation({
                variables: {
                    name: todo,
                    type,
                    priority
                },
                refetchQueries: [{ query: getTodosQuery }],
            });
        }else {
            alert('Please Enter Todo!');
        }
    };
    render(){
        const { todo, priority, type } = this.state;
        return(
            <form className='mainForm' onSubmit={this.addTodo}>
                <div className='field'>
                    <label>Todo</label>
                    <input value={todo} onChange={(e) => this.setState({ todo:  e.target.value})} type='text' />
                </div>
                <div className='field'>
                    <label>Priority</label>
                    <input value={priority} onChange={(e) => this.setState({ priority:  e.target.value})} type='text' />
                </div>
                <div className='field'>
                    <label>Type</label>
                    <input value={type} onChange={(e) => this.setState({ type:  e.target.value})} type='text' />
                </div>
                <button onClick={this.addTodo}>+</button>
            </form>
        );
    };
};

export default compose(
    graphql(getTodosQuery, { name: "getTodosQuery" }),
    graphql(addTodoMutation, { name: "addTodoMutation" }),
)(AddTodo);