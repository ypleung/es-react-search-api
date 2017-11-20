export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_QUERY = 'SELECT_QUERY'
export const INVALIDATE_QUERY = 'INVALIDATE_QUERY'

export const requestSearch = query => ({
  type: SELECT_QUERY,
  query
})

export const invalidateSearch = query => ({
  type: INVALIDATE_QUERY,
  query
})

export const requestPosts = query => ({
  type: REQUEST_POSTS,
  query
})

export const receivePosts = (query, json) => ({
  type: RECEIVE_POSTS,
  query,
  docs: json,
  receivedAt: Date.now()
})

const fetchPosts = query => dispatch => {
  dispatch(requestPosts(query))
  console.log ("in fetchPosts: 2 " + query)
  return fetch("/article/service" + "?term=" + query)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(query, json)))
}

const shouldFetchPosts = (state, query) => {
  const docs = state.docsFound[query]
  if (!docs) {
    console.log("shouldFetchPosts: true")
    return true
  }
  if (docs.isFetching) {
    console.log("shouldFetchPosts: false")
    return false
  }
  return docs.didInvalidate
}

export const fetchDocsIfNeeded = query => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), query)) {
    return dispatch(fetchPosts(query))
  }
}
