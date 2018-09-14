const React = require('react');
const ReactDOM = require('react-dom');
const BookItem = require('./bookItem.jsx');

module.exports = class BookList extends React.Component {
  render() {
    var books = this.props.data.map(function(book) {
        return (
            <BookItem book={book} key={book.id} dispatch={this.props.dispatch}></BookItem>
            )
    }.bind(this))
    return (
      <div>
        {books}
      </div>
    ); 
  }
}
