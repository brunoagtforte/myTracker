import { StockService } from '../services/StockServices'
import { useState, useEffect } from 'react'

const TradeLedger = () => {
    const [stocks, setStocks] = useState<ITransaction[]>([])

    function dateFormat(dateISO: Date) {
        const dateObject = new Date(dateISO)
        const newDate = dateObject.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        })
        return newDate
    }

    const totalCost = (price: number, shares: number, taxes: number) => {
        const cost = price * shares + taxes
        const formattedNumber = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(cost)
        return formattedNumber
    }

    const formatPrice = (price: number) => {
        const formattedNumber = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price)
        return formattedNumber
    }

    return (
        <div className='mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14'>
            <div className='flex flex-col'>
                <div className='-m-1.5 overflow-x-auto'>
                    <div className='inline-block min-w-full p-1.5 align-middle'>
                        <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-slate-900'>
                            <div className='grid gap-3 border-b border-gray-200 px-6 py-4 dark:border-gray-700 md:flex md:items-center md:justify-between'>
                                <div>
                                    <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200'>
                                        Transactions
                                    </h2>
                                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                                        Buys and Sells listed
                                    </p>
                                </div>

                                <div>
                                    <div className='inline-flex gap-x-2'>
                                        <a
                                            className='inline-flex items-center justify-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                                            href='#'
                                        >
                                            <svg
                                                className='size-3 flex-shrink-0'
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='16'
                                                height='16'
                                                viewBox='0 0 16 16'
                                                fill='none'
                                            >
                                                <path
                                                    d='M2.63452 7.50001L13.6345 7.5M8.13452 13V2'
                                                    stroke='currentColor'
                                                    strokeWidth='2'
                                                    strokeLinecap='round'
                                                />
                                            </svg>
                                            Add Transaction
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
                                <thead className='bg-gray-50 dark:bg-slate-800'>
                                    <tr>
                                        <th
                                            scope='col'
                                            className='px-6 py-3 text-start'
                                        >
                                            <div className='flex items-center gap-x-2'>
                                                <span className='text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200'>
                                                    Date
                                                </span>
                                            </div>
                                        </th>

                                        <th
                                            scope='col'
                                            className='py-3 pe-6 ps-6 text-start lg:ps-3 xl:ps-0'
                                        >
                                            <div className='flex items-center justify-center gap-x-2'>
                                                <span className='text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200'>
                                                    Ticker
                                                </span>
                                            </div>
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-6 py-3 text-start'
                                        >
                                            <div className='flex items-center justify-center gap-x-2'>
                                                <span className='text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200'>
                                                    Transaction
                                                </span>
                                            </div>
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-6 py-3 text-start'
                                        >
                                            <div className='flex items-center justify-center gap-x-2'>
                                                <span className='text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200'>
                                                    Shares
                                                </span>
                                            </div>
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-6 py-3 text-start'
                                        >
                                            <div className='flex items-center justify-center gap-x-2'>
                                                <span className='text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200'>
                                                    Price
                                                </span>
                                            </div>
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-6 py-3 text-start'
                                        >
                                            <div className='flex items-center justify-center gap-x-2'>
                                                <span className='text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200'>
                                                    Taxes
                                                </span>
                                            </div>
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-6 py-3 text-start'
                                        >
                                            <div className='flex items-center justify-center gap-x-2'>
                                                <span className='text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200'>
                                                    Total Cost
                                                </span>
                                            </div>
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-6 py-3 text-end'
                                        ></th>
                                    </tr>
                                </thead>

                                <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                                    {stocks.map(
                                        (
                                            stock: ITransaction,
                                            index: number
                                        ) => {
                                            return (
                                                <tr key={index}>
                                                    <td className='size-px whitespace-nowrap'>
                                                        <div className='px-6 py-3'>
                                                            <span className='block text-sm font-semibold text-gray-800 dark:text-gray-200'>
                                                                {dateFormat(
                                                                    stock.date
                                                                )}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className='size-px whitespace-nowrap'>
                                                        <div className='py-3 pe-6 ps-6 lg:ps-3 xl:ps-0'>
                                                            <div className='flex items-center justify-center gap-x-3'>
                                                                <img
                                                                    className='inline-block size-[28px] rounded-full'
                                                                    src={`https://eodhd.com/img/logos/US/${stock.ticker}.png`}
                                                                    alt='Image Description'
                                                                />
                                                                <div className='grow'>
                                                                    <span className='block text-sm font-semibold text-gray-800 dark:text-gray-200'>
                                                                        {
                                                                            stock.ticker
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='size-px whitespace-nowrap'>
                                                        <div className='px-6 py-3'>
                                                            <span className='block text-center text-sm font-semibold text-gray-800 dark:text-gray-200'>
                                                                {
                                                                    stock.transaction
                                                                }
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className='size-px whitespace-nowrap'>
                                                        <div className='px-6 py-3'>
                                                            <span className='block text-center text-sm font-semibold text-gray-800 dark:text-gray-200'>
                                                                {stock.shares}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className='size-px whitespace-nowrap'>
                                                        <div className='px-6 py-3'>
                                                            <span className='block text-center text-sm font-semibold text-gray-800 dark:text-gray-200'>
                                                                {formatPrice(
                                                                    stock.price
                                                                )}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className='size-px whitespace-nowrap'>
                                                        <div className='px-6 py-3'>
                                                            <span className='block text-center text-sm font-semibold text-gray-800 dark:text-gray-200'>
                                                                {formatPrice(
                                                                    stock.taxes
                                                                )}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className='size-px whitespace-nowrap'>
                                                        <div className='px-6 py-3'>
                                                            <span className='block text-center text-sm font-semibold text-gray-800 dark:text-gray-200'>
                                                                {totalCost(
                                                                    stock.price,
                                                                    stock.shares,
                                                                    stock.taxes
                                                                )}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className='size-px whitespace-nowrap'>
                                                        <div className='px-6 py-1.5'>
                                                            <a
                                                                className='inline-flex items-center justify-center gap-x-1 text-sm font-medium text-red-600 decoration-2 hover:underline dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                                                                href='#'
                                                            >
                                                                Delete
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    )}
                                </tbody>
                            </table>

                            <div className='grid gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700 md:flex md:items-center md:justify-between'>
                                <div>
                                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                                        <span className='font-semibold text-gray-800 dark:text-gray-200'>
                                            {stocks.length}
                                        </span>{' '}
                                        results
                                    </p>
                                </div>

                                {/*<div>
                  <div className="inline-flex gap-x-2">
                    <button type="button" className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                      <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                      Prev
                    </button>

                    <button type="button" className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                      Next
                      <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </button>
                  </div>
                </div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TradeLedger
