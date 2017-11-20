import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { requestSearch, fetchDocsIfNeeded, invalidateSearch } from '../actions'
import SearchBox from '../components/SearchBox'
import Posts from '../components/Posts'

class App extends Component {
  static propTypes = {
    requestSearch: PropTypes.string.isRequired,
    docs: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, requestSearch } = this.props
    dispatch(fetchDocsIfNeeded(requestSearch))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.requestSearch !== this.props.requestSearch) {
      const { dispatch, requestSearch } = nextProps
      dispatch(fetchDocsIfNeeded(requestSearch))
    }
  }

  handleChange = nextQuery => {
    this.props.dispatch(requestSearch(nextQuery))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, requestSearch } = this.props
    dispatch(invalidateSearch(requestSearch))
    dispatch(fetchDocsIfNeeded(requestSearch))
  }

  render() {
    const { requestSearch, docs, isFetching, lastUpdated } = this.props
    console.log(" docs to be rendered: " + docs)
    const isEmpty = docs.length === 0
    console.log(" lastUpdated: " + lastUpdated)
    return (
      <div>
        <SearchBox value={requestSearch}
                onChange={this.handleChange} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <button onClick={this.handleRefreshClick}>
              Refresh
            </button>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts docs={docs} />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { requestSearch, docsFound } = state
  const {
    isFetching,
    lastUpdated,
    items: docs
  } = docsFound[requestSearch] || {
    isFetching: true,
    items: []
  }

  return {
    requestSearch,
    docs,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
