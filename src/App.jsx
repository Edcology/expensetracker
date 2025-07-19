import Page from "./Page"
import Expenses from "./Expenses"
import { Routes, Route } from "react-router-dom"
import { useState } from "react"

const App = () => {
  const [total, setTotal] = useState()
  const [balances, setBalances] = useState([])
  const [expenses, setExpenses] = useState([])
  return (
    <div>
       <Routes>
          <Route path="/" element={<Page total={total} setTotal={setTotal} balances={balances} setBalances={setBalances} expenses={expenses} setExpenses={setExpenses} />} />
          <Route path="/expenses" element={<Expenses expenses={expenses} total={total} />} />
       </Routes>
    </div>
  )
}

export default App