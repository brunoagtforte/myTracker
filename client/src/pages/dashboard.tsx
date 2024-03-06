
import Link from 'next/link';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link href="/addTrade">Add Trade</Link>
      <Link href="/tradeLedger">Ledger</Link>

    </div>

  )
}

export default Dashboard
