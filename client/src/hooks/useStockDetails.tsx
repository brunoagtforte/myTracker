import { StockService } from '@/services/StockServices'
import { useState, useEffect } from 'react'

export const useStockDetails = (transactions: IResponseTransaction[]) => {
    const [stockDetails, setStockDetails] = useState<{ [key: string]: any }>({})

    useEffect(() => {
        const fetchAllStockDetails = async () => {
            const details = await Promise.all(
                transactions.map((trans) =>
                    StockService.getStockDetails(trans.ticker)
                )
            )
            const detailsByTicker = details.reduce((acc, detail, index) => {
                acc[transactions[index].ticker] = detail
                return acc
            }, {})

            setStockDetails(detailsByTicker)
        }

        fetchAllStockDetails()
    }, [transactions])
    return stockDetails
}
