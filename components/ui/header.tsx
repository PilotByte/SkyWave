import { Menu } from "lucide-react"
import * as React from "react"

const Header = () => {
  return (
    <nav className=" w-full border-b">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-1 md:py-2 md:block">
          <div className="md:hidden">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
            >
              <Menu />
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8
            `}
        >
          <ul className="justify-center items-center space-y-2 md:flex md:space-x-6 text-center md:space-y-0">
            <li>
              {/* Add header items */}
            </li>
          </ul>
        </div>
        <div className="flex gap-3 items-center">
        </div>
      </div>
    </nav>
    )
  }

export { Header }