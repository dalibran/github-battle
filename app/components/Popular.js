var React = require('react');
var PropTypes = require('prop-types');

function SelectLanguage (props) {
  var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
      <ul className='languages'>
        {languages.map(function(lang){
          return (
            <li
              style={lang === props.selectedLanguage ? { color: '#d0021b'}: null }
              key={lang}

              //creates a new function but doesn't invoke self
              onClick={props.onSelect.bind(null, lang)}>
             {lang}
            </li>
          )
        })}
      </ul>
    )
}


SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

class Popular extends React.Component {
  //establish initial state
  constructor (props) {
    super(props);
    this.state = {
      selectedLanguage: 'All'
    };

    //binds 'this' keyword inside of updateLang is always a component of itself
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  //updates state with selected lang
  updateLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang
      }
    })
  }
  render() {

    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect ={this.updateLanguage}
        />
      </div>
    )
  }
}

module.exports = Popular;
