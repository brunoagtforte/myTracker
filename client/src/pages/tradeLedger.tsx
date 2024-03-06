import { StockService } from "../../../../client/src/services/StockServices"
import { useState, useEffect } from "react"


const TradeLedger = (props) => {
  const [stocks, setStocks] = useState([])

  useEffect(() => {
    StockService.getAllStocks()
      .then((res) => {
        console.log(res)
        setStocks(res)
      })
      .catch((err) => {
        console.log(err)
        throw err
      })
  }, [])

  return (
    <div className="w-full px-4">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-8 shadow-lg rounded-lg bg-blueGray-900 text-white">
        <div className="px-6 py-4 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h3 className="font-bold text-lg text-white">Card Tables</h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-800 text-blueGray-300 border-blueGray-700">
                  Project
                </th>
                <th
                  className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-800 text-blueGray-300 border-blueGray-700">
                  Budget
                </th>
                <th
                  className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-800 text-blueGray-300 border-blueGray-700">
                  Status
                </th>
                <th
                  className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-800 text-blueGray-300 border-blueGray-700">
                  Users
                </th>
                <th
                  className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-800 text-blueGray-300 border-blueGray-700">
                  Completion
                </th>
                <th
                  className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-800 text-blueGray-300 border-blueGray-700">
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <img src=" https://eodhd.com/img/logos/US/MSFT.png" className="h-12 w-12 bg-white rounded-full border p-1" alt="..." />
                    <span className="ml-3 font-bold">Argon Design System</span>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">$2,500 USD</div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center"><i className="fas fa-circle mr-2 text-orange-500"></i>pending</div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <div>
                      </div>
                      <small className="pl-2 font-bold mb-1"></small>
                    </div>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 min-w-140-px">
                  <div className="flex items-center">
                    <span className="mr-2">60%</span>
                    <div className="relative w-full">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                        <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 pb-6 pl-6 text-right">
                  <div className="relative">
                    <button className="inline-block outline-none focus:outline-none align-middle transition-all duration-150 ease-in-out uppercase border border-solid font-bold last:mr-0 mr-2  text-blueGray-800 bg-white border-white active:bg-blueGray-100 active:border-blueGray-100 text-xs px-3 py-2 shadow hover:shadow-md rounded-md">
                      <i className="fas fa-cog"></i>
                      <i className="ml-2 fas fa-caret-down transition-all duration-100 ease-in-out transform "></i>
                    </button>
                    <div className="block  z-50">
                      {/* Dropdown content */}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TradeLedger
