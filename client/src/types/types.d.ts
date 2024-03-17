interface IResponseTransaction {
    _id?: string
    date: date
    transaction: 'buy' | 'sell'
    ticker: string
    shares: number
    stockPrice: number
    taxes: number
    createdAt?: string
    updatedAt?: string
}

interface ITransaction {
    _id?: string
    date: date
    transaction: 'buy' | 'sell'
    ticker: string
    tickerName: string
    shares: number
    stockPrice: string
    taxes: string
    logo: string
    totalCost: string
}

interface DataTableProps {
    columns: Column[]
    data: ITransaction[]
}

interface Column {
    key: string
    label: string
}

interface DatePickerData {
    startDate: Date | null
    endDate: Date | null
}

interface TransactionFormProps {
    onClose: () => void
    title: string
}
