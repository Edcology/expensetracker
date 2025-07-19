
const Header = ({total}) => {
  return (
    <div className="bg-white flex justify-between px-4 py-2 rounded-lg mb-6">
        <p>Welcome, Ed &#x1F91E;</p>
        <p>Net Balance: <span className="text-blu font-medium">${total}</span></p>
    </div>
  )
}

export default Header