import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:8000/api',
})

const stocks = axios.create({
    baseURL: 'https://api.polygon.io/',
})

export const getAllTransactions = async () => {
    try {
        const res = await http.get('/trades')
        return res.data
    } catch (err) {
        throw err
    }
}

const addStock = async (stock: string) => {
    try {
        const res = await http.post('/trades/add', stock)
        return res.data
    } catch (err) {
        throw err
    }
}

const deleteStock = async (id) => {
    try {
        const res = await http.delete('/trades/${id}')
        return res.data
    } catch (err) {
        throw err
    }
}
const getStockDetails = async (ticker: string) => {
    try {
        const api = process.env.NEXT_PUBLIC_POLYGON_API
        const res = await stocks.get(
            `v3/reference/tickers/${ticker}?apiKey=${api}`,
            { headers: { Authorization: `Bearer ${api}` } }
        )
        return res.data
    } catch (err) {
        throw err
    }
}

export const StockService = {
    addStock,
    deleteStock,
    getStockDetails,
}
