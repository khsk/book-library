const React          = require('react');

const RB      = require('react-bootstrap');
const ROR     = require('react-overlays');
const ProgressBar = RB.ProgressBar
const AutoAffix   = ROR.AutoAffix
const Affix   = ROR.Affix

console.log('AutoAffix',AutoAffix)

module.exports = class Processing extends React.Component {
  render() {
    return this.props.show?( 
      <div className="footer">
        <ProgressBar label="Now loading" active now={this.props.now} />
      </div>
        ) : (null)
  }

}