const React          = require('react');
const ReactDOM       = require('react-dom');
const MicroContainer = require('react-micro-container').default;


const MyNav   = require('./navbar.jsx');
const BookBox = require('./bookBox.jsx')

console.log(MicroContainer)

class Main extends MicroContainer {
  constructor(props) {
    super(props);
    this.state = {
      url:'/books/list',
      param: {}
    };
  }

  componentDidMount() {
    this.subscribe({
      BookSearch: this.handleBookSearch,
    });
  }

  handleBookSearch(keyword) {
    console.log('handleBookSearch fire', keyword);
    // this.setState({
    //     url:'/books/search',
    //     param:{keyword:keyword}
    // });
    // うごいてないねー
    ReactDOM.render(
      <div />,
      document.getElementById('container')
    );
    console.log('render後');
  }

  render() {
    return (
      <div>
        <MyNav dispatch={this.dispatch} />
        <BookBox url={this.state.url} param={this.state.param} />
      </div>
  );}
}

ReactDOM.render(
  <Main />,
  document.getElementById('container')
);
