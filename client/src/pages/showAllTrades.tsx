import { useState, useEffect } from 'react'
import axios from 'axios'

const showAllTrades = () => {
    const [trades, setTrades] = useState<ITransaction[]>([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/trades').then((res) => {
            console.log(res.data)
            setTrades(res.data)
        })
    }, [])

    return (
        <div>
            {trades.map((trade: ITransaction) => (
                <div key={trade._id} id='teste'>
                    <p>{trade.ticker}</p>
                </div>
            ))}
        </div>
    )
}

export default showAllTrades
