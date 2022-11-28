import React from "react"

const NavItem = ({title, classProps}) => {
    return (
        <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>
    )
}

const Navbar = () => {
    return (
        <nav className="w-full flex justify-center justify-between items-center p-4">
            <div className=" flex-initial justify-center itesm-center">
                <h1 className="text-white">DApp</h1>
            </div>
            <ul className="text-white flex list-none flex-row justify-between items-center flex-initial ">
                {["Market", "Exchange", "Wallet"].map((item, index)=>(
                    <NavItem key={item+index} title={item} />
                ))}
                <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                    Login
                </li>
            </ul>
        </nav>
    )
}

export default Navbar