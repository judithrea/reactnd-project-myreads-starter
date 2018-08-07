import React from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends React.Component {
  state = {
      query: '',
      searchResults: []
  }

  componentDidMount() {
    this.WAIT_INTERVAL = 1000; // milliseconds
    this.timer = null;
  }

  //Handle search input
  updateQuery = (query) => {
    this.setState({query})
    clearInterval(this.timer);

    this.timer = setTimeout(() => {
      if (query) {
        BooksAPI.search(query).then((books) => {
          if(books.length) {
            console.log('Query:', query);
            console.log('Books:', books);
            this.setState({searchResults: books});
          } 
        })
      } else if (query === '' || query === undefined) {
          this.setState({searchResults: []})
          console.log(this.state.searchResults)
      }
    }, this.WAIT_INTERVAL); 
  }

  render() {
    const {query, searchResults} = this.state
    const {books, shelfChange} = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
    
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              (searchResults) && (searchResults.length) ? (searchResults.map(book => {
                const myBook = books.find(b => b.id === book.id);
                
                if (myBook) {
                  book.shelf = myBook.shelf;
                } else {
                  book.shelf = 'none';
                }

                return (<li key={book.id}><Book book={book} shelfChange={shelfChange} /></li>)
            })) : null}
          </ol>
        </div>
      </div>
    )
  }
}
export default SearchBooks