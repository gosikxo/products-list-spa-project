import { useEffect, useState } from "react"
import { Table } from "./components/Table"

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
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] =useState<number>(1);

  const handleChange = (event: React.SyntheticEvent): void => {
    let target = event.target as HTMLInputElement
    if (target.value.length === 0) {
      setSearchInput("");
    }
    const parsedNumber = parseInt(target.value);
    if (isNaN(parsedNumber)) {
      return;
    }
    setSearchInput(target.value)
  }

  useEffect(() => {
    // if we're searching
    if (searchInput.length > 0) {
      fetch(`https://reqres.in/api/products?id=${searchInput}`)
        .then(res => res.json())
        .then(res => {
          setError(null);

          if (!res.data) {
            setError("Couldn't find product on server.")
            return;
          }
          if (Array.isArray(res.data)) {
            setProducts(res.data)
          } else {
            setProducts([res.data])
          }
        })
    } else {
      // if we show list of products
      fetch(`https://reqres.in/api/products?page=${pageNumber}`)
        .then(res => res.json())
        .then(res => {
          setError(null);

          if (!res.data) {
            setError("Couldn't load data from server.")
            return;
          }

          if (res.data) { 
            setProducts(res.data)
            setTotalPages(res.total_pages)
          } else {

          }
        })
    }
  }, [pageNumber, searchInput])

  function changePage() {
    pageNumber === 1 ? setPageNumber(2) : setPageNumber(1)
  }

  const isSearching = searchInput.length > 0;

  return (
    <div className="App">
      <label>search</label><input type="text" value={searchInput} onChange={handleChange}></input>
      {error && <div>{error}</div>}
      {!error && products !== null ? <Table products={products} /> : null}
      { !isSearching && <div style={{display: "flex", justifyContent:"space-between"}}>
        <button style={{display: "inline-flex"}} disabled={pageNumber === 1} className="pageButton" onClick={changePage}>Previous Page</button>
        <button style={{display: "inline-flex"}} disabled={pageNumber === totalPages} className="pageButton" onClick={changePage}>Next Page</button>
      </div>}
    </div>
  );
}

export default App;
