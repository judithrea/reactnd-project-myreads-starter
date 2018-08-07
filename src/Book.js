import React from 'react'
import noCover from './icons/no-cover.png'

class Book extends React.Component {
  render() {
    const {book, shelfChange} = this.props
    const coverImg = book.imageLinks && book.imageLinks.smallThumbnail ? book.imageLinks.smallThumbnail : noCover

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" 
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${coverImg})`}}>
          </div>
          <div className="book-shelf-changer">
            {/*Control to allow user to change books from one shelf to another*/}
            <select value={book.shelf} onChange={event => shelfChange(book, event.target.value)} >
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>   
    )
  }
}

export default Book