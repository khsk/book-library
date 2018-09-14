const React    = require('react');
const ReactDOM = require('react-dom');

const RB       = require('react-bootstrap');
const Well     = RB.Well
const Grid     = RB.Grid
const Row      = RB.Row
const Col      = RB.Col

module.exports = class CommentItem extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    const comment = this.props.comment.text.split('\n').map((line, index) => {
      return <p key={index}>{line}</p>;
    });
    return (
      <Well>
        <Grid>
          <Row>
            <Col xs={12} md={12} lg={12}>
              <h4>タイトル</h4>
              {this.props.comment.title}
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} lg={12}>
              <h4>コメント</h4>
              {comment}
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={6} lg={6}>
              <h4>名前</h4>
              {this.props.comment.name}
            </Col>
            <Col xs={6} md={6} lg={6}>
              <h4>評価</h4>
             {this.props.comment.evaluation}
            </Col>
          </Row>
        </Grid>
      </Well>
        )
  }
}