import { MdLocalGroceryStore } from "react-icons/md";
const ExpenseForm = () => {
  return (
    <div>
        <form >
            <input type="text" placeholder="Enter the expense description" />
            <div>
                <input type="text" placeholder="Enter the category" />
                <div className="flex p-6">
                    <p className="p-1 bg-white rounded-2xl border flex gap-1 text-sm">🛒<span>Groceries</span></p>
                    <p className="p-1 bg-white rounded-2xl border flex gap-1 text-sm">🛻<span>Transportation</span></p>
                    <p className="p-1 bg-white rounded-2xl border flex gap-1 text-sm">🏠<span>Housing</span></p>
                    <p className="p-1 bg-white rounded-2xl border flex gap-1 text-sm">🎆<span>Entertainment</span></p>
                    <p className="p-1 bg-white rounded-2xl border flex gap-1 text-sm">💊<span>Healthcare</span></p>
                    <p className="p-1 bg-white rounded-2xl border flex gap-1 text-sm">🌐<span>Utilities</span></p>
                    <p className="p-1 bg-white rounded-2xl border flex gap-1 text-sm">💵<span>Income</span></p>
                </div>
            </div>
        </form>
    </div>
  )
}

export default ExpenseForm