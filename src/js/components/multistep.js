var React = require('react/addons')
var expect = require('expect.js')

function navStates(indx, length) {
  var styles = []
  for (var i=0; i<length; i++) {
    if(i < indx) {
      styles.push('done')
    }
    else if(i === indx) {
      styles.push('doing')
    }
    else {
      styles.push('todo')
    }
  }
  return { current: indx, styles: styles }
}
expect(navStates(0, 3).styles).to.eql(['doing','todo','todo'])
expect(navStates(1, 3).styles).to.eql(['done','doing','todo'])
expect(navStates(2, 3).styles).to.eql(['done','done','doing'])
expect(navStates(3, 3).styles).to.eql(['done','done','done'])

expect(navStates(0, 4).styles).to.eql(['doing','todo','todo','todo'])
expect(navStates(1, 4).styles).to.eql(['done','doing','todo','todo'])
expect(navStates(2, 4).styles).to.eql(['done','done','doing','todo'])
expect(navStates(3, 4).styles).to.eql(['done','done','done','doing'])
expect(navStates(4, 4).styles).to.eql(['done','done','done','done'])

var Multistep = React.createClass({
  getInitialState() {
    return {
        compState: 0,
        navState: navStates(0, this.props.steps.length)
      }
  },

  nextNav(nextComp, nextNav) {
    console.log('nextComp: ' + nextComp + ' nextNav: ' + nextNav)
    if(nextComp < this.props.steps.length) {
      this.setState({compState: nextComp})
    }
    if(nextComp <= this.props.steps.length) {
      this.setState({navState: navStates(nextNav, this.props.steps.length)})
    }
  },

  handleOnClick(evt) {
    if(this.state.compState === this.props.steps.length-1 &&
       this.state.navState.current === this.props.steps.length-1) {
      this.nextNav(evt.target.value, evt.target.value+1)
    }
    else {
      this.nextNav(evt.target.value, evt.target.value)
    }
  },

  handleKeyDown(evt) {
    if(evt.which === 13) {
      if(this.state.compState < this.props.steps.length) {
        this.nextNav(this.state.navState.current + 1, this.state.navState.current + 1)
      }
      else {
        this.nextNav(this.state.compState, this.state.navState.current + 1)
      }
    }
  },

  render() {
    return (
      <div className="container" onKeyDown={this.handleKeyDown}>
        <ol className="progtrckr">{
          this.props.steps.map((s, i) =>
          <li value={i} key={i}
                        className={"progtrckr-" + this.state.navState.styles[i]}
                        onClick={this.handleOnClick}>
            <em>{i+1}</em>
            <span>{this.props.steps[i].name}</span>
          </li>
          )}
        </ol>
        {this.props.steps[this.state.compState].component}
      </div>
    )}
})

module.exports = Multistep
