import { useState, useEffect } from "react";
import axios from "axios";
import { IStock } from '../../../shared/interfaces/interfaces';


export const showAllTrades = () => {
  const [trades, setTrades] = useState<IStock[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/trades").then((res) => {
      console.log(res.data)
      setTrades(res.data)
    })
  }, [])

  return (
    <div>
      {trades.map((trade: IStock) => (
        <div>
          <p>{trade.ticker}</p>
        </div>
      ))
      }
    </div>
  )
}