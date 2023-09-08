import "./App.css"
import Search from "./components/Search/Search"
import BooksContainer from "./components/BooksContainer/BooksContainer"
import { ChangeEvent, FormEvent, useState } from "react"
import { Item, useLazySearchBooksQuery } from "./features/api/apiSlice"

export type Query = {
  text: string
  category:
    | "all"
    | "art"
    | "biography"
    | "computers"
    | "history"
    | "medical"
    | "poetry"
  sorting: "relevance" | "newest"
  startIndex: number
}

function App() {
  const [query, setQuery] = useState<Query>({
    text: "",
    category: "all",
    sorting: "relevance",
    startIndex: 0,
  })
  const [bookDetails, setBookDetails] = useState<Item | null>(null)
  const [skip, setSkip] = useState<boolean>(true)
  const [fetchBooks] = useLazySearchBooksQuery()
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSkip(true)
    setQuery((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      startIndex: 0,
    }))
  }
  const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSkip(false)
    setQuery((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      startIndex: 0,
    }))
  }
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSkip(false)
    setBookDetails(null)
    fetchBooks(query)
  }
  const onButtonClick = () => {
    setQuery((prev) => ({ ...prev, startIndex: prev.startIndex + 30 }))
  }

  const handleShowDetail = (item: Item) => {
    setBookDetails(item)
  }
  return (
    <div className="App">
      <Search onSubmit={onSubmit} onChange={onChange} onSelect={onSelect} />
      <BooksContainer
        query={query}
        skip={skip}
        onClick={onButtonClick}
        handleShowDetail={handleShowDetail}
        bookDetails={bookDetails}
      />
    </div>
  )
}

export default App
