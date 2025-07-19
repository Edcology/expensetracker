import { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { FiArrowDownLeft } from "react-icons/fi";
import { FiArrowUpLeft } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";


const Activities = ({expenses, setExpenses, balances, setBalances, total, setTotal}) => {
    const [selectedOption, setSelectedOption] = useState("")
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState()
    const [account, setAccount] = useState("")
    const [date, setDate] = useState("")
    const [add, setAdd] = useState(false)
    const [error, setError] = useState(false)
    const [balanceError, setBalanceError] = useState(false)
    const [textShown, setTextShown] = useState(true)
    useEffect(() => {
        const total = balances.reduce((acc, balance) => parseFloat(acc) + parseFloat(balance.amount), 0)        
        setTotal(total)
    }, [balances, setTotal])

    const handleClick = () => {
        if (!amount || !account || !selectedOption || !date || !description) {
            setError(true)
            console.warn("Invalid input");
            setTimeout(() => {
                setError(false)
            }, 2000)
            return;
        }
        const balanceErrorOccurred = checkBalanceError()
        if (balanceErrorOccurred) {
            setTimeout(() => {
                setBalanceError(false)
            }, 3000)
            return;
        }
        calcBalance()
        

        setAdd(!add)
        setExpenses([...expenses, 
        {
            "description": description,
            "category": selectedOption,
            "amount": amount,
            "date": date,
            "account": account
        }
        ]
        )

        setAccount("")
        setDescription("")
        setAmount("")
        setDate("")
        setSelectedOption("")
    }
    
    const calcBalance = () => {
        
        const updatedBalances = balances.map(balance => {
            if (balance.name === account) {  
                const validAmount = parseFloat(amount)
                if (isNaN(validAmount)) return balance             
                if (selectedOption === "💰Income") {
                    return {...balance, amount: balance.amount + validAmount}
                    
                } else {
                    if (balance.amount < validAmount) {
                        console.log(balanceError);
                        
                        setBalanceError(true)
                        
                        console.log(balanceError);
                        
                        return balance
                    }
                    return {...balance, amount: balance.amount - validAmount}
                }
            } 
            return balance
        })
        setBalances(updatedBalances)
        console.log(balanceError);
        
    }

    const checkBalanceError = () => {
        const validAmount = parseFloat (amount)
        if (isNaN(validAmount)) return false;

        if (selectedOption !== "💰Income") {
            const balance = balances.find(balance => balance.name === account)
            if (balance && balance.amount < validAmount) {
                setBalanceError(true)
                return true
            }
        }

        return false
    }

    const handleCancel = () => {
        setAdd(false)
        setAccount("")
        setDescription("")
        setAmount("")
        setDate("")
        setSelectedOption("")
    }

    const handleDelete = (e) => {
        const updatedExpense = expenses.filter(expense => e.description !== expense.description)
        const updatedBalances = balances.map(balance => {
            console.log(total)
            console.log(balance.name);
            console.log(e.category);
            if (e.account === balance.name) {  
                const validAmount = parseFloat(e.amount)
                if (isNaN(validAmount)) return balance             
                if (selectedOption === "💰Income") {
                    return {...balance, amount: balance.amount - validAmount}

                } else {

                    return {...balance, amount: balance.amount + validAmount}
                }
            } 
            return balance
        })
        setBalances(updatedBalances)
        setExpenses(updatedExpense)
    }
  return (
    <div className="mt-6 px-4">
        <div className="flex justify-between">
            <h2 className="text-blu text-xl font-medium">Recent Activities</h2>
            <div className="flex gap-3">
                <p className="flex text-blu bg-white p-1 rounded-3xl underline cursor-pointer" onClick={() => {add ? handleCancel() : setAdd(true)}}>
                    {
                        add ?
                            <MdCancel className="place-self-center md:me-1 text-red-500" /> :
                            <FiPlusCircle className="place-self-center md:me-1" />
                    }
                    <span className="hidden md:block">{add ? "Cancel" : "Add"}</span>
                </p>
                <Link to='/expenses'><p className="text-blu underline p-1 cursor-pointer">View all</p></Link>
            </div>
        </div>
        <div className="bg-white p-2 py-4 rounded-lg mt-4 overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory scrollbar-hide">
                <table className="w-full">
                    <thead className="">
                        <tr className="text-sm text-blu bg-grey1 text-left w-full">
                            <th className="p-4 rounded-l-md">Description</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">{add ? "Account" : "Current Balance"}</th>
                            <th className="p-4">Date and Time</th>
                            <th className="p-4 rounded-r-md">Manage</th>
                        </tr>
                    </thead>
                    {/* Error for users not filling in the required information */}
                    {
                        error && 
                        <div className="text-red-500 bg-red-100 border border-red-600 rounded-lg shadow p-4 px-2 max-w-md animate-fadeIn relative">
                            <span className="mr-2">⚠️</span>
                            <p className=" text-sm">Please ensure to fill all the required information!</p>
                        </div>
                    }
                    {/* insufficient balance error */}
                    {
                        balanceError && 
                        <div className="text-red-500 bg-red-100 border border-red-600 rounded-lg shadow p-4 px-1 max-w-md animate-fadeIn relative">
                            <span className="mr-2">⚠️</span>
                            <p className=" text-xs">Insufficient balance! please choose another account</p>
                        </div>
                    }
                    <tbody className="">
                        {
                            add &&
                            <tr className="even:bg-grey1 odd:bg-white text-sm text-blu p-2 px-4 pe-12 rounded-md mb-4">
                                {/* Description input */}
                                <td className="p-4 rounded-l-md">
                                    <input 
                                    type="text" 
                                    placeholder="Enter the description" 
                                    className="border focus:outline-none p-1" 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)} />
                                </td>
                                {/* Category dropdown */}
                                <td className="p-4">
                                    <input
                                    list="categories"
                                    placeholder="Enter or select a category"
                                    className="border focus:outline-none px-4"
                                    value={selectedOption} 
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                    />
                                    <datalist id="categories" className="focus:outline-none">
                                        <option value="🛒 Groceries" className="p-2 bg-white rounded-2xl gap-1 text-sm"></option>
                                        <option value="🛻Transportation" className="p-1 bg-white rounded-2xl gap-1 text-sm">🛻Transportation</option>
                                        <option value="🏠Housing" className="p-1 bg-white rounded-2xl gap-1 text-sm">🏠Housing</option>
                                        <option value="🎆Entertainment" className="p-1 bg-white rounded-2xl gap-1 text-sm">🎆Entertainment</option>
                                        <option value="💊Healthcare" className="p-1 bg-white rounded-2xl gap-1 text-sm">💊Healthcare</option>
                                        <option value="🌐Utilities" className="p-1 bg-white rounded-2xl gap-1 text-sm">🌐Utilities</option>
                                        <option value="💰Income" className="p-1 bg-white rounded-2xl gap-1 text-sm">💰Income</option>
                                    </datalist>
                                </td>
                                {/* Amount input */}
                                <td className="p-4"><input type="number" placeholder="Enter the amount" className="border p-1 focus:outline-none" value={amount} onChange={(e) => setAmount(e.target.value)} /></td>
                                {/* Account dropdown */}
                                <td className="p-4">
                                    <select value={account} onChange={(e) => setAccount(e.target.value)} className="px-3">
                                        <option value="" disabled>Select Account</option>
                                        {
                                            balances && balances.length > 0 ?
                                                balances.map((balance, index) => 
                                                    <option className="focus:outline-none" key={index} value={balance.name}>{balance.name}</option>
                                                ) :
                                                <option disabled>No option found</option>
                                        }
                                    </select>
                                </td>
                                {/* Date and Time Input */}
                                <td className="p-4">
                                    <input 
                                    type="datetime-local"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    />
                                </td>
                                <td className="p-4 rounded-r-md flex gap-3">
                                    <button className="border border-red-500 p-1 px-3 rounded-md hover:bg-red-500 hover:text-white" onClick={handleCancel}>Cancel</button>
                                    <button className="border p-1 px-3 rounded-md hover:bg-blu hover:text-white" onClick={(e) => handleClick(e)}>Add</button>
                                </td>
                            </tr>
                        } 
                        {/* Array of user inputted expense        */}
                        {
                            
                           expenses.length ?
                           (
                            expenses.slice(-15).reverse().map(expense => 
                                <tr key={expense.date} className="even:bg-grey1 odd:bg-white text-sm p-2 px-4 pe-12 rounded-md mb-4 w-full ">
                                    <td className="flex p-4 rounded-l-md">{expense.category === "💰Income" ? <FiArrowDownLeft className="place-self-center text-green-600" /> : <FiArrowUpLeft className="place-self-center text-red-600" />}{expense.description}</td>
                                    <td className="p-4 "><p className="w-fit p-1 bg-white rounded-2xl border text-sm">{expense.category}</p></td>
                                    <td className={`${expense.category === "💰Income" ? "text-green-600" : "text-red-600"} p-4`}>${expense.amount}</td>
                                    <td className="p-4">${total}</td>
                                    <td className="p-4">{
                                        new Date(expense.date).toLocaleDateString("en-us", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric"
                                        })
                                        }</td>
                                    <td 
                                    onClick={() => {handleDelete(expense)}}
                                    className="p-4 cursor-pointer"><MdDelete /></td>
                                </tr>
                            )
                           ) :
                           (
                                !add && balances.length < 1 &&
                                    <p 
                                    onClick={() => {
                                        setAdd(true)
                                        setTextShown(false)
                                    }}
                                    className="text-gray-500 text-right cursor-pointer">No expense yet? add an expense</p>
                                
                           )
                        }
                    </tbody>
                </table>
                <div>
            
        </div>
        </div>
    </div>
  )
}

export default Activities