const React = require('react');
const ReactDOM = require('react-dom');
const request = require('superagent');
const BookList = require('./bookList.jsx')

module.exports = class BookBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data:[],
      _isMounted:null,
    }
  }
  componentDidMount() {
    console.log('this.props.url', this.props.url);
    console.log('this.props.param', this.props.param);
    request.get(this.props.url)
    .query(this.props.param)
    .end( function(err, res) {
      if (err) {
        console.error(this.props.url, res, err.toString());
      } else { 
        console.log('BookBox componentDidMount 1')
        this.setState({data: JSON.parse(res.text)});
        console.log('BookBox componentDidMount 2')
      }
    }.bind(this))
    .type('json')
    this.setState({_isMounted:true});
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps.url', nextProps.url);
    console.log('nextProps.param', nextProps.param);
    request.get(nextProps.url)
    .query(nextProps.param)
    .end(function(err, res) {
      if (err) {
        console.error(nextProps.url, res, err.toString());
      } else { 
        console.log('componentWillReceiveProps 1')
        console.log('this.state._isMounted', this.state._isMounted)
        // ここを止めないとunmount時のsetStateで警告でるんだけど、unmount時のsetStateがthisに反映されないから(bind時のthisの値を保持だから？)Promiseとかに書き換えるといいと思う。
        if (this.state._isMounted) {
          this.setState({data: JSON.parse(res.text)});
        }
        console.log('componentWillReceiveProps 2')
      }
    }.bind(this))
    .type('json')
  }

  componentWillUnmount() {
    console.log('componentWillUnmount',this.state._isMounted)
    this.setState({_isMounted:false});

    console.log('componentWillUnmount 2',this.state._isMounted)

  }

  render() {
    return (
      <div className="container">
        <BookList data={this.state.data} dispatch={this.props.dispatch} />
      </div>
    ); 
  }
}
