import DataTable from '@/components/table/DataTable'
import { columns } from '@/components/transactions/columns'
import { useState, useEffect } from 'react'
import { useStockDetails } from '@/hooks/useStockDetails'
import { StockService } from '@/services/StockServices'
import TransactionForm from '@/components/transactions/TransactionModal/TransactionForm'

const TradeLedger = () => {
    const [transactions, setTransactions] = useState<IResponseTransaction[]>([])
    const { stockDetails, loading, error } = useStockDetails(transactions)

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await StockService.getAllTransactions()
                setTransactions(res)
            } catch (err) {
                console.error('Failed to fetch transactions:', err)
            }
        }

        fetchTransactions()
    }, [])

    const addTransaction = async (transaction: IResponseTransaction) => {
        try {
            const newTransaction = await StockService.addStock(transaction)
            setTransactions((prevTransactions) => [
                ...prevTransactions,
                newTransaction,
            ])
        } catch (err) {
            console.error('Failed to add transaction:', err)
        }
    }

    const totalCost = (
        stockPrice: number,
        shares: number,
        taxes: number
    ): string => {
        const cost = stockPrice * shares + taxes
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(cost)
    }

    const formatPrice = (stockPrice: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(stockPrice)
    }

    const formatTransaction = (transaction: IResponseTransaction) => {
        const formattedTransaction = {
            ...transaction,
            totalCost: totalCost(
                transaction.stockPrice,
                transaction.shares,
                transaction.taxes
            ),
            logo: stockDetails[transaction.ticker]?.[0]?.image || '',
            tickerName: stockDetails[transaction.ticker]?.[0]?.name || '',
            stockPrice: formatPrice(transaction.stockPrice),
            taxes: formatPrice(transaction.taxes),
        }
        return formattedTransaction
    }

    const formattedTransactions = transactions.map(formatTransaction)

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
                <DataTable columns={columns} data={formattedTransactions} />
            )}
        </div>
    )
}

export default TradeLedger
