interface IResponseTransaction {
    _id: string
    date: date
    transaction: 'buy' | 'sell'
    ticker: string
    tickerName: string
    shares: number
    price: number
    taxes: number
    createdAt?: string
    updatedAt?: string
}

interface ITransaction {
    _id: string
    date: date
    transaction: 'buy' | 'sell'
    ticker: string
    tickerName: string
    shares: number
    price: string
    taxes: string
    logo: string
    totalCost: string
}

interface DefaultTableProps {
    columns: Column[]
    data: ITransaction[]
}

interface Column {
    key: string
    label: string
}
