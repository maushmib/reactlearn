import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [articles, setArticles] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchArticles = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get('https://hn.algolia.com/api/v1/search', {
        params: { query: search, page }
      })
      setArticles(p => page ? [...p, ...data.hits] : data.hits)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [page])

  useEffect(() => {
    setPage(0)
    fetchArticles()
  }, [search])

  return (
    <div style={{ padding: 20 }}>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search..."
        style={{ padding: 8, width: 300 }}
      />

      {loading && <p>Loading...</p>}

      <ul>
        {articles.map(a => (
          <li key={a.objectID}>
            <a href={a.url} target="_blank" rel="noreferrer">{a.title}</a>
          </li>
        ))}
      </ul>

      {!loading && articles.length > 0 && (
        <button onClick={() => setPage(p => p + 1)}>Load More</button>
      )}
    </div>
  )
}

export default App
