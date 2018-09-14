const React    = require('react');

const RB       = require('react-bootstrap');
const Button   = RB.Button
const Modal   = RB.Modal;
const FormControl  = RB.FormControl;
const FormGroup    = RB.FormGroup;
const ControlLabel = RB.ControlLabel;



module.exports = class CommentFormModal extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      showCommentFormModal : false,
      commentBookid:null,
      title:'',
      name :'',
      comment:'',
      evaluation:null,
    };
    this.commentFormClose = this.commentFormClose.bind(this);
    this.canPost = this.canPost.bind(this);

    this.handleTitleChange      = this.handleTitleChange.bind(this);
    this.handleNameChange       = this.handleNameChange.bind(this);
    this.handleCommentChange    = this.handleCommentChange.bind(this);
    this.handleEvaluationChange = this.handleEvaluationChange.bind(this);
  }


  commentFormClose() {
    this.setState({showCommentFormModal:false});
  }

  handleTitleChange(e) {
    this.setState({title:e.target.value})
  }

  handleNameChange(e) {
    this.setState({name:e.target.value})
  }

  handleCommentChange(e) {
    this.setState({comment:e.target.value})
  }

  handleEvaluationChange(e) {
    this.setState({evaluation:e.target.value})
  }

  canPost() {
    return (this.state.title && this.state.name && this.state.comment && this.state.evaluation);
  }


  render() {
    return (
      <Button onClick={ 
        ()=> {
            this.setState({showCommentFormModal:true});
        }}>
        Add Comment
        <Modal show={this.state.showCommentFormModal} onHide={this.commentFormClose}>
          <Modal.Header closeButton>
            Add Comment
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <ControlLabel>Title</ControlLabel>
              <FormControl
                type="text"
                placeholder="Enter title"
                required="required"
                onChange={this.handleTitleChange}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Name</ControlLabel>
              <FormControl
                type="text"
                placeholder="Enter your name"
                required="required"
                onChange={this.handleNameChange}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Comment</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder="Enter comment"
                required="required"
                onChange={this.handleCommentChange}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Evaluation</ControlLabel>
              <FormControl
                componentClass="select"
                placeholder="Select book evaluation"
                required="required"
                onChange={this.handleEvaluationChange}
              >
                <option value="">Select evaluation</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </FormControl>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" disabled={!this.canPost()} onClick={() => {
              this.props.dispatch('AddComment', {
                'book_id':this.props.book.id,
                'title':this.state.title,
                'name':this.state.name,
                'text':this.state.comment,
                'evaluation':this.state.evaluation,
              });
              this.setState({
                title:'',
                name:'',
                comment:'',
                evaluation:null,
              });
              this.commentFormClose();
             }}>Post</Button>
          </Modal.Footer>
        </Modal>
      </Button>

        );
  }
}