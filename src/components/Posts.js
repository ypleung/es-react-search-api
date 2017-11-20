import React from 'react'
import PropTypes from 'prop-types'

const Posts = ({docs}) => (
  <ul>
    {docs.map((doc, i) =>
      <li key={i}>{doc._source.title}</li>
    )}
  </ul>
)

Posts.propTypes = {
  docs: PropTypes.array.isRequired
}

export default Posts
