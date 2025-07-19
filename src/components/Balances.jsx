import { LuMoveRight } from "react-icons/lu";
import { FiPlusCircle } from "react-icons/fi";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import { FaEllipsisH } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Balances = ({balances, setBalances}) => {
    const [display, setDisplay] = useState(false)
    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [error, setError] = useState(false)
    const [clicked, setClicked]  = useState(false)
    const [showOptions, setShowOptions] = useState(null)
    const [isTextVisible, setIsTextVisible] = useState(true)
    const handleSubmit = (e) => {
        if (!name || !amount) {
            e.preventDefault()
            setError(true)
            setTimeout(() => {setError(false)}, 3000)
            return
        }
        e.preventDefault()
        setBalances([...balances, 
            {
                "name": name,
                "amount": amount
            }
        ])
        setName("")
        setAmount("")
        setDisplay(false)
    }
    const handleCancel = () => {
        setDisplay(false)
        setName("")
        setAmount("")
    }

    const handleDelete = (e) => {
        const filteredBalance = balances.filter(balance => e !== balance.name)
        setBalances(filteredBalance)
    }

    const toggleOptions = (names) => {
        setShowOptions(prev => prev === names ? null : names)
    }
  return (
    <div className="bg-white rounded-lg p-4">
        <div className="bg-grey1 p-2 px-3 border border-grey1">
            <div className="flex justify-between">
                <h2 className="mb-2 text-xl text-blu font-medium">Balances</h2>
                {
                    error &&
                    <div className="text-red-500 bg-red-100 border border-red-600 rounded-lg shadow p-4 px-2 max-w-md animate-fadeIn relative">
                        <span className="mr-2">⚠️</span>
                        <p className=" text-sm">Please ensure to fill all the required information!</p>
                    </div>
                }
                <FiPlusCircle 
                onClick={() => setDisplay(true)}
                className="p-1 size-7 rounded-full bg-whit cursor-pointer" />
            </div>
            <div className="flex gap-4 relative overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory scrollbar-hide">
            {
                    display &&
                    <form onSubmit={(e) => handleSubmit(e)} className=" grid bg-white p-6 gap-3 ">
                        <input 
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="border px-3" type="text" placeholder="Enter the account's name" />
                        <input 
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                        className="border px-3" type="number" placeholder="Enter the initial balance" />
                        <div className="flex gap-4">
                            <button 
                            onClick={handleCancel}
                            className="border border-red-500 p-1 px-3 rounded-md hover:bg-red-500 hover:text-white">Cancel</button>
                            <button className="border p-1 px-3 rounded-md hover:bg-blu hover:text-white" type="submit">Add</button>
                        </div>
                    </form>
                }
                {
                    balances.length ?
                    (balances.map((balance, index) =>
                        <div key={index} className="relative bg-white p-4 border-l border-l-amber-400 md:w-[250px] w-5/6 ">
                            <p 
                            className="flex justify-between text-blu">
                                <span className="text-blu mb-4 text-xl">{balance.name}</span>
                                <span onClick={() => setClicked(!clicked)} className="cursor-pointer">{clicked ? <MdCancel onClick={() => toggleOptions(null)} className="text-red-500" />
                                 :<FaEllipsisH onClick={() => toggleOptions(balance.name)} />}</span></p>
                            {
                                showOptions === balance.name &&
                                <div className="absolute right-4 bg-white top-8 shadow-sm p-1">
                                    <p className="flex cursor-pointer" onClick={() => handleDelete(balance.name)} name={balance.name}><MdDelete className="place-self-center text-red-500" />Delete</p>
                                </div>
                            }
                            <p className="text-sm">AVAILABLE BALANCE</p>
                            <div className="flex justify-between">
                                <p className="font-bold mb-1">${balance.amount}</p>
                                <LuMoveRight />
                            </div>
                        </div>
                    ))
                    :
                    (
                        !display && balances.length < 1 &&
                        <p className="cursor-pointer text-gray-600" onClick={() => {
                            setDisplay(true)
                            setIsTextVisible(false)
                        }}>Click to add an account.</p>
                    )
                }
                
            </div>
        </div>
    </div>
  )
}

export default Balances