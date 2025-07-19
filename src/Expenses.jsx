import { useEffect, useState } from "react"
import { FaFilter } from "react-icons/fa"
import { FiArrowDownLeft, FiArrowUpLeft } from "react-icons/fi"
import { MdCancel } from "react-icons/md";


const Expenses = ({expenses, total}) => {
    const [clicked, setClicked] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')
    const [filter, setFilter] = useState("")
    const [categories, setCategories] = useState([])

    
    const filteredExpenses = selectedOption === "" ? expenses :
    expenses.filter((expense) => {
        let key;
        if (selectedOption === 'Categories') {
            key = expense.category
        } else if (selectedOption === 'Date') {
            key = new Date(expense.date).toLocaleDateString('en-us', {
                month: "long",
                day: "numeric",
                year: "numeric"
            })
        } else if (selectedOption === 'Amount') {
            key = `${expense.amount}`
        } 
        
        return key === filter
    }
)

    useEffect(() => {
        const uniqueCategories = [...new Set(expenses.map(expense => expense.category))]
        setCategories(uniqueCategories)
    }, [expenses])

    const handleCancel = () => {
        setFilter("")
        setSelectedOption('')
        setClicked(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSelectedOption("")

    }

  return (
    <div>
        <div className="flex justify-between relative p-4 cursor-pointer">
            <h1 className="text-2xl text-blu font-medium">Expenses</h1>
            <div className="place-self-center">{clicked ? <MdCancel className="text-red-500" onClick={handleCancel} /> :<FaFilter className="text-blu" onClick={() => setClicked(true)} />}</div>
            {
                clicked &&
                <div className="absolute flex gap-4 right-8 top-12 bg-white p-8 rounded-lg text-left divide-y-2 shadow-sm">
                    <form onSubmit={(e) => handleSubmit(e)} className="flex gap-4">
                        <select 
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        name="filter" id="filter">
                            <option value="" disabled>Select a filter</option>
                            <option value="Categories">Categories</option>
                            <option value="Amount">Amount</option>
                            <option value="Date">Date</option>
                        </select>
                        {
                        selectedOption === "Date" ? (
                            <input 
                            type="datetime-local" 
                            value={filter} 
                            className="ml-4"
                            onChange={(e) => setFilter(
                                new Date(e.target.value).toLocaleDateString('en-us', {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric"
                                })
                            )} />
                        )
                        :
                        (
                            selectedOption === "Amount" ? (
                                <input 
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="ml-4 border"
                                placeholder="Enter the amount"
                                type="number" />
                            )
                            :
                            (
                                selectedOption === "Categories" && (
                                    <select 
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    >
                                        <option value="" disabled>Categories</option>
                                        {
                                            categories.map((category, index) =>
                                                <option key={index} value={category}>{category}</option>
                                            )
                                        }
                                    </select>
                                )
                            )
                        )
                    }
                    </form>
                </div>
            }
        </div>
        {/* Render Grouped Expenses */}
            <h1 className="text-xl font-medium p-4">{filter}</h1>
                <table className="w-full">
                    <thead className="">
                        <tr className="text-sm text-blu bg-grey1 text-left w-full">
                            <th className="p-4 rounded-l-md">Description</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Current Balance</th>
                            <th className="p-4">Date and Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                           filteredExpenses.length ?
                           (
                            filteredExpenses.map(expense => 
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
                                </tr>
                                )
                           ) :
                           (
                        
                            <p className="text-gray-500 text-right cursor-pointer">No expense yet? add an expense</p>

                           )
                        }
                    </tbody>
                </table>
    </div>
  )
}

export default Expenses