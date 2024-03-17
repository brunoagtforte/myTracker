// Constants
const API_BASE_URL = 'http://localhost:8000/api'
const STOCKS_API_URL = 'https://api.api-ninjas.com/v1/'

// Functions
const fetchJSON = async (url: string, options?: RequestInit): Promise<any> => {
    try {
        const response = await fetch(url, options)
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`)
        }
        return await response.json()
    } catch (error) {
        console.error(`Error fetching ${url}:`, error)
        throw error
    }
}

const getAllTransactions = async (): Promise<any> => {
    return fetchJSON(`${API_BASE_URL}/trades`)
}

const addStock = async (transaction: IResponseTransaction): Promise<any> => {
    return fetchJSON(`${API_BASE_URL}/trades/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
    })
}

const deleteStock = async (id: string): Promise<any> => {
    return fetchJSON(`${API_BASE_URL}/trades/${id}`, {
        method: 'DELETE',
    })
}

const getStockDetails = async (ticker: string): Promise<any> => {
    const apiKey = process.env.NEXT_PUBLIC_POLYGON_API
    if (!apiKey) {
        throw new Error('Polygon API key is not available.')
    }
    const headers = new Headers()
    headers.set('X-Api-Key', apiKey || '')
    return fetchJSON(`${STOCKS_API_URL}logo?ticker=${ticker}`, { headers })
}

// Export
export const StockService = {
    getAllTransactions,
    addStock,
    deleteStock,
    getStockDetails,
}
