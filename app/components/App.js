var React = require('react');
var Popular = require('./Popular');

//creates App component
class App extends React.Component {
  render () {
    return (
      <div className='container'>
        <Popular />
      </div>
    );
  }
}

module.exports = App;


