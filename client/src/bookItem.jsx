
const React    = require('react');

const RB       = require('react-bootstrap');
const Button   = RB.Button
const Collapse = RB.Collapse
const Well     = RB.Well
const Grid     = RB.Grid
const Row      = RB.Row
const Col      = RB.Col
const Clearfix = RB.Clearfix
const DropdownButton = RB.DropdownButton
const MenuItem = RB.MenuItem


const CommentItem       = require('./commentItem.jsx');
const CommentFormModal       = require('./commentFormModal.jsx');

module.exports = class BookItem extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      comments :[],
      showCommentFormModal : false,
      commentBookid:null,
    };
  }


  render() {
    console.log('BookItem!!',this.props)

    var comments = this.state.comments.map(function(comment) {
        return (
            <CommentItem comment={comment} key={comment.id} />
            )
    }.bind(this))

    return (
      <div>
        <h1 className="text-center">{this.props.book.title}</h1>
        <Clearfix>
          <div className="pull-right">
            <Button onClick={ ()=> this.setState({ detailOpen:!this.state.detailOpen})}>
              Detail
            </Button>
            <Button onClick={ 
              ()=> {
                    this.props.dispatch('GetBookComments', this)
              }}>
              Comments
            </Button>
          </div>
        </Clearfix>
        <Collapse in={this.state.detailOpen}>
          <div>
            <Well>
              <Grid>
                <Row>
                  <Col xs={6} md={6} lg={6}>
                    <h3>拠点</h3>
                    {this.props.book.base}
                  </Col>
                  <Col xs={6} md={6} lg={6}>
                    <h3>番号</h3>
                    {this.props.book.label}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} md={6} lg={6}>
                    <h3>筆者</h3>
                    {this.props.book.author}
                  </Col>
                  <Col xs={6} md={6} lg={6}>
                    <h3>発行日</h3>
                   {this.props.book.published_date}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} md={6} lg={6}>
                    <h3>購入者</h3>
                    {this.props.book.purchaser}
                  </Col>
                  <Col xs={6} md={6} lg={6}>
                    <h3>購入日</h3>
                   {this.props.book.purchase_date}
                  </Col>
                </Row>
                 <Row>
                  <Col xs={6} md={6} lg={6}>
                    <h3>ISBN</h3>
                    {this.props.book.isbn}
                  </Col>
                  <Col xs={6} md={6} lg={6}>
                    <h3>状態</h3>
                    {this.props.book.status}
                  </Col>
                </Row>
              </Grid>
            </Well>
            <DropdownButton noCaret title="Change status" id={"ChangeStatus" + this.props.book.id} onSelect={ (key) => {this.props.dispatch('ChangeStatus', key, this.props.book.id)}} >
                <MenuItem eventKey="1">申請中</MenuItem>
                <MenuItem eventKey="2">存在</MenuItem>
                <MenuItem eventKey="3">貸出中</MenuItem>
                <MenuItem eventKey="4">廃棄</MenuItem>
            </DropdownButton>
          </div>
        </Collapse>
        <Collapse in={this.state.commentOpen}>
          <div>
            {comments}
            <CommentFormModal {...this.props} dispatch={this.props.dispatch} />
          </div>
        </Collapse>

      </div>
    ); 
  }
}



