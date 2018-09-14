const React    = require('react');
const ReactDOM = require('react-dom');

const RB      = require('react-bootstrap');
const Navbar  = RB.Navbar;
const Nav     = RB.Nav;
const NavItem = RB.NavItem;
const Modal   = RB.Modal;
const Button  = RB.Button;
const FormControl  = RB.FormControl;

const BookRequestFormModal = require('./bookRequestFormModal.jsx')

class MyNav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal:false,
      search: '',
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.close = this.close.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  close() {
    this.setState({showModal:false});
  }

  handleSelect(key) {
    console.log('handleSelect',key)
    if (key == 1) {
      this.setState({showModal:true});
    } else if (key == 2) {
      this.props.dispatch('ShowComments');
    } else if (key == 3) {
      this.props.dispatch('ShowBookRequestFormModal');
    } else if (key == 4) {
      this.props.dispatch('ShowPendingBooks');
    }
  }

  handleSearchChange(e) {
    this.setState({search:e.target.value})
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/top/index">Plott Libraly </a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav onSelect={this.handleSelect}>
          <NavItem eventKey={1}>Search</NavItem>
          <NavItem eventKey={2}>Comments</NavItem>
          <NavItem eventKey={3}>Request</NavItem>
          <NavItem eventKey={4}>Pending</NavItem>
        </Nav>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            Book search
          </Modal.Header>
          <Modal.Body>
          <FormControl
            type="text"
            placeholder="Enter title"
            onChange={this.handleSearchChange}
            onKeyPress={(e) => {
              if (e.key == 'Enter') {
                // TODO Search　ボタンのonClickのコピペなのでまとめる
                this.props.dispatch('BookSearch', this.state.search);
                this.setState({search:''});
                this.close();
                return
              }
            }}
          />
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={() => {
              this.props.dispatch('BookSearch', this.state.search);
              this.setState({search:''});
              this.close();
             }} >Search</Button>
          </Modal.Footer>
        </Modal>
        <BookRequestFormModal {...this.props} dispatch={this.props.dispatch}/>
      </Navbar>

    );
 }
}

module.exports = MyNav;
