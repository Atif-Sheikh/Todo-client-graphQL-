import { gql } from 'apollo-boost';

const getTodosQuery = gql`
    {
        todos {
            id
            name
            priority
        }
    }
`;

const addTodoMutation = gql`
    mutation($name: String!, $type: String!, $priority: String!) {
        addTodo(name: $name, type: $type, priority: $priority){
            name
            priority
        }
    }
`;

const removeTodoMutation = gql`
    mutation($id: String!){
        removeTodo(id: $id){
            id
        }
    }
`;

const updateTodoMutation = gql`
    mutation($id: String!, $name: String!, $type: String!, $priority: String!){
        updateTodo(id: $id, name: $name, type: $type, priority: $priority){
            id
            name
            priority
            type
        }
    }
`;

export { getTodosQuery, addTodoMutation, removeTodoMutation, updateTodoMutation };