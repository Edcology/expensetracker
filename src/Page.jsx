import { useState } from "react"
import Header from "./components/Header"
import Balances from "./components/Balances"
import Activities from "./components/Activities"



const Page = ({total, setTotal, balances, setBalances, expenses, setExpenses}) => {
  
  return (
    <main className="bg-bgcolor p-4">
      <Header total={total} />
      <Balances balances={balances} setBalances={setBalances} />
      <Activities expenses={expenses} setExpenses={setExpenses} balances={balances} setBalances={setBalances} setTotal={setTotal} total={total} />
    </main>
  )
}

export default Page