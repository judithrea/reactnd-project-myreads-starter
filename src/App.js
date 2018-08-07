import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'
import {Route} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: [],
    query: ''
  }

  // Get books from API to main page shelves
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    });

    this.shelfChange = this.shelfChange.bind(this);
  }

  // Handle change of shelf in Book component
  shelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState({books})
      });
    })
  }


     
  render() {
    const {books} = this.state

    return (
      <div className="app">
        <Route exact path='/search' render={() => (
            <SearchBooks books={books} shelfChange={this.shelfChange} />
          
        )}/> 
        <Route exact path='/' render={() => (
          <ListBooks books={books} shelfChange={this.shelfChange} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
