import { useEffect, useState } from "react"
import { Table } from "./components/Table"
import { ItemData } from "./components/ItemData"

export type Product = {
  id: number,
  name: string,
  year: number,
  color: string,
  pantone_value: number
}

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [searchInput, setSearchInput] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [clickedId, setClickedId] = useState<number | null>(null)

  const handleChange = (event: React.SyntheticEvent): void => {
    let target = event.target as HTMLInputElement
    if (target.value.length === 0) {
      setSearchInput("")
    }
    const parsedNumber = parseInt(target.value)
    if (isNaN(parsedNumber)) {
      return
    }
    setSearchInput(target.value)
  }

  useEffect(() => {
    if (searchInput.length > 0) {
      fetch(`https://reqres.in/api/products?id=${searchInput}`)
        .then(res => res.json())
        .then(res => {
          setError(null)

          if (!res.data) {
            setError("Couldn't find product on server.")
            return
          }
          if (Array.isArray(res.data)) {
            setProducts(res.data)
          } else {
            setProducts([res.data])
          }
        })
    } else if (clickedId !== null) {
      fetch(`https://reqres.in/api/products?id=${clickedId}`)
        .then(res => res.json())
        .then(res => {
          setError(null)

          if (!res.data) {
            setError("Couldn't load data from server.")
            return
          }

          if (Array.isArray(res.data)) {
            setProducts(res.data)
          } else {
            setProducts([res.data])
          }
        })
    } else {
      fetch(`https://reqres.in/api/products?page=${pageNumber}`)
        .then(res => res.json())
        .then(res => {
          setError(null)

          if (!res.data) {
            setError("Couldn't load data from server.")
            return
          }

          if (res.data) {
            setProducts(res.data)
            setTotalPages(res.total_pages)
          } else {

          }
        })
    }
  }, [pageNumber, searchInput, clickedId])

  function changePage() {
    pageNumber === 1 ? setPageNumber(2) : setPageNumber(1)
  }

  const isSearching = searchInput.length > 0

  const handleClick = (searchId: number): void => {
    setClickedId(searchId)
  }

  return (
    <div className="App">
      <div className="searchInput">
        <label className="searchInputLabel" htmlFor="searchInput">Search Product:</label>
        <input className="searchInputText" type="text" value={searchInput} onChange={handleChange} id="searchInput">
        </input>
      </div>
      {error && <div>{error}</div>}
      {!isSearching && products !== null && clickedId !== null ? <ItemData products={products} /> : null}
      {!error && clickedId == null && products !== null ? <Table products={products} onClick={handleClick} /> : null}
      {!isSearching && clickedId == null && <div className="buttons">
        <button style={{ display: "inline-flex" }} disabled={pageNumber === 1} className="pageButton" onClick={changePage}>Previous Page</button>
        <button style={{ display: "inline-flex" }} disabled={pageNumber === totalPages} className="pageButton" onClick={changePage}>Next Page</button>
      </div>}
    </div>
  );
}

export default App;
