import UserTransactions from '@/components/UserTransactions'
export default function TransactionsHistory() {

  return (
    <div>
      <h1 className='text-3xl font-bold mb-[46px] mt-[32px]'>Total Transactions</h1>
      <UserTransactions/>
    </div>
  )
}
