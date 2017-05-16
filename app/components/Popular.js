var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

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

function RepoGrid(props) {
  return(
      <ul className='popular-list'>
        {props.repos.map(function(repo, index) {
          return (
            <li key={repo.name} className='popular-item'>
              <div className='popular-rank'>#{index + 1}</div>
              <ul className='space-list-items'>
                <li>
                  <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login} />
                </li>
                <li>
                  <a href={repo.html_url}>{repo.name}</a>
                </li>
                <li>
                  @{repo.owner.login}
                </li>
                <li>
                  {repo.stargazers_count} stars
                </li>
              </ul>
            </li>
          )
        })}
      </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
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
      selectedLanguage: 'All',
      repos: null
    };

    //binds 'this' keyword inside of updateLang is always a component of itself
    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount() {
    //Ajax requests go here
    this.updateLanguage(this.state.selectedLanguage);

  }

  //updates state with selected lang
  updateLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang,
        repos: null
      }
    });

    api.fetchPopularRepos(lang)
      .then(function(repos) {
        this.setState(function() {
          return {
            repos: repos,
          }
        })
      }.bind(this));
  }

  render() {

    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect ={this.updateLanguage}
        />
        {!this.state.repos //since repos are null by default, returns Loading
          ? <p>LOADING</p>
          : <RepoGrid repos={this.state.repos}/>}
      </div>
    )
  }
}

module.exports = Popular;
