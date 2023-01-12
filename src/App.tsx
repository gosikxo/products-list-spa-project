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
  const [products, setProducts] = useState<Product[] | null>(null)
  const [pageNumber, setPageNumber] = useState<number>(1)
  useEffect(() => {
    fetch(`https://reqres.in/api/products?page=${pageNumber}`)
      .then(res => res.json())
      .then(res => {
        setProducts(res.data)
      })
  }, [pageNumber])

  function changePage() {
    pageNumber === 1 ? setPageNumber(2) : setPageNumber(1)
  }

  return (
    <div className="App">
      {products !== null ? <Table products={products} /> : null}
      {pageNumber === 2 ? <button className="pageButton" onClick={changePage}>Previous Page</button> : null}
      {pageNumber === 1 ? <button className="pageButton" onClick={changePage}>Next Page</button> : null}
    </div>
  );
}

export default App;
