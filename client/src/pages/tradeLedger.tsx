import DataTable from '@/components/table/Table'
import { columns } from '@/components/transactions/columns'
import { useState, useEffect } from 'react'
import { StockService } from '@/services/StockServices'
import { useStockDetails } from '@/hooks/useStockDetails'
import { getAllTransactions } from '@/services/StockServices'

const TradeLedger = () => {
    const [transactions, setTransaction] = useState<IResponseTransaction[]>([])
    const stockDetails = useStockDetails(transactions)

    function dateFormat(dateISO: Date) {
        const dateObject = new Date(dateISO)
        const newDate = dateObject.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        })
        return newDate
    }

    const totalCost = (
        price: number,
        shares: number,
        taxes: number
    ): string => {
        const cost = price * shares + taxes
        const formattedNumber = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(cost)
        return formattedNumber
    }

    const formatPrice = (price: number): string => {
        const formattedNumber = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price)
        return formattedNumber
    }

    useEffect(() => {
        getAllTransactions()
            .then((res) => {
                console.log(res)
                setTransaction(res)
            })
            .catch((err) => {
                console.log(err)
                throw err
            })
    }, [])

    const formattedTransactions = transactions.map((trans) => {
        return {
            ...trans,
            date: dateFormat(trans.date),
            totalCost: totalCost(trans.price, trans.shares, trans.taxes),
            logo: `https://eodhd.com/img/logos/US/${trans.ticker}.png`,
            tickerName: stockDetails[trans.ticker]?.results.name,
            price: formatPrice(trans.price),
            taxes: formatPrice(trans.taxes),
        }
    })

    return (
        <div>
            <DataTable columns={columns} data={formattedTransactions} />
        </div>
    )
}

export default TradeLedger
