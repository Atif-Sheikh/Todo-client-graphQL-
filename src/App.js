import React, { Component } from 'react';
import TodoList from './components/todoList';
import AddTodo from './components/addTodo';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:2000/graphiql',
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h1>Todo With GraphQL</h1>
          <AddTodo />
          <TodoList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
