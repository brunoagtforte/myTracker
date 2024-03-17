import { useEffect, useState } from 'react'
import { StockService } from '@/services/StockServices'

interface StockDetails {
    [ticker: string]: any
}

export const useStockDetails = (transactions: IResponseTransaction[]) => {
    const [stockDetails, setStockDetails] = useState<StockDetails>({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        const fetchStockDetails = async () => {
            try {
                const uniqueTickers = Array.from(
                    new Set(transactions.map((trans) => trans.ticker))
                )
                const detailsPromises = uniqueTickers.map((ticker) =>
                    StockService.getStockDetails(ticker)
                )
                const detailsResponses = await Promise.all(detailsPromises)
                const detailsByTicker: StockDetails = {}

                uniqueTickers.forEach((ticker, index) => {
                    detailsByTicker[ticker] = detailsResponses[index]
                })

                if (isMounted) {
                    setStockDetails(detailsByTicker)
                    setLoading(false)
                }
            } catch (error) {
                if (isMounted) {
                    setError('Failed to fetch stock details')
                    setLoading(false)
                }
            }
        }

        fetchStockDetails()

        return () => {
            isMounted = false
        }
    }, [transactions])

    return { stockDetails, loading, error }
}
