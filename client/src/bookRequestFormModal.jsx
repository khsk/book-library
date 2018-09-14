const React    = require('react');

const RB           = require('react-bootstrap');
const Button       = RB.Button
const Modal        = RB.Modal;
const FormControl  = RB.FormControl;
const FormGroup    = RB.FormGroup;
const ControlLabel = RB.ControlLabel;



module.exports = class BookRequestFormModal extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      showBookRequestFormModal : false,

      purchaser:'',
      title:'',
      author :'',
      published_date:'',
      base:null,
      isbn:'',
    };
    console.log('BookRequestFormModal construcrot', this.props);


    this.requestFormClose = this.requestFormClose.bind(this);
    this.canPost = this.canPost.bind(this);

    this.handlePurchaserChange     = this.handlePurchaserChange.bind(this);
    this.handleTitleChange         = this.handleTitleChange.bind(this);
    this.handleAuthorChange        = this.handleAuthorChange.bind(this);
    this.handlePublishedDateChange = this.handlePublishedDateChange.bind(this);
    this.handleBaseChange          = this.handleBaseChange.bind(this);
    this.handleISBNChange          = this.handleISBNChange.bind(this);
  }

 componentWillReceiveProps(nextProps) {
    console.log('BookRequestFormModal nextProps', nextProps);
  }

  requestFormClose() {
    this.props.dispatch('CloseBookRequestFormModal');
  }


  handlePurchaserChange(e) {
    this.setState({purchaser:e.target.value});
  }

  handleTitleChange(e) {
    this.setState({title:e.target.value});
  }

  handleAuthorChange(e) {
    this.setState({author:e.target.value});
  }

  handlePublishedDateChange(e) {
    this.setState({published_date:e.target.value});
  }

  handleBaseChange(e) {
    this.setState({base:e.target.value});
  }

  handleISBNChange(e) {
    this.setState({isbn:e.target.value});
  }

  canPost() {
    return (
      this.state.purchaser &&
      this.state.title && 
      this.state.author && 
      this.state.published_date && 
      this.state.base && 
      this.state.isbn);
  }


  render() {
    return (
        <Modal show={this.props.showBookRequestFormModal} onHide={this.requestFormClose}>
          <Modal.Header closeButton>
            Book request
          </Modal.Header>
          <Modal.Body>
            <form ref="request">
  　　          <FormGroup >
                <ControlLabel>ISBN</ControlLabel>
                <div className='form-inline'>
                  <FormControl
                    type="text"
                    placeholder="Enter ISBN"
                    required="required"
                    pattern="[0-9-]{10,17}X?"
                    onChange={this.handleISBNChange}
                    value={this.state.isbn}
                  />
                 <div className="pull-right">
                   <Button bsStyle="info" onClick={() => {
                   this.props.dispatch('ISBNCompletion', this.state.isbn, this);
                   }}>Completion</Button>
                 </div>
               </div>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Your Name</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter your name"
                  required="required"
                  onChange={this.handlePurchaserChange}
                  value={this.state.purchaser}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter title"
                  required="required"
                  onChange={this.handleTitleChange}
                  value={this.state.title}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Author</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter author"
                  required="required"
                  onChange={this.handleAuthorChange}
                  value={this.state.author}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Published date</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter published date"
                  required="required"
                  onChange={this.handlePublishedDateChange}
                  value={this.state.published_date}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Base</ControlLabel>
                <FormControl
                  componentClass="select"
                  placeholder="Select base"
                  required="required"
                  onChange={this.handleBaseChange}
                >
                  <option value="">Select base</option>
                  <option value="Tokyo">Tokyo</option>
                  <option value="Nagoya">Nagoya</option>
                  <option value="Kyoto">Kyoto</option>
                  <option value="Osaka">Osaka</option>
                </FormControl>
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" disabled={!this.canPost()} onClick={() => {
              if (!this.refs.request.reportValidity()) {
                return;
              }
              this.props.dispatch('AddBookRequest', this.state);
              this.setState({
                purchaser:'',
                title:'',
                author :'',
                published_date:'',
                base:null,
                isbn:'',
              });
             }}>Request</Button>
          </Modal.Footer>
        </Modal>
        );
  }
}