import { useEffect, useState } from "react"
import { Table } from "./components/Table"
import { TextInput } from "./components/TextInput"

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

  return (
    <div className="App">
      <TextInput />
      {products !== null ? <Table products={products}/> : null}
    </div>
  );
}

export default App;
