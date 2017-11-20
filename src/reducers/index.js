import { combineReducers } from 'redux'
import {
  SELECT_QUERY, INVALIDATE_QUERY,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'

const requestSearch = (state = 'Party', action) => {
  switch (action.type) {
    case SELECT_QUERY:
      return action.query
    default:
      return state
  }
}

const docs = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_QUERY:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS:
      return {
        isFetching: false,
        didInvalidate: false,
        items: action.docs,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const docsFound = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_QUERY:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      console.log( "about to post: " + action.query)
      return {
        ...state,
        [action.query]: docs(state[action.query], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  docsFound,
  requestSearch
})

export default rootReducer
