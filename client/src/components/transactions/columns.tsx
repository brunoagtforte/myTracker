import React from 'react'
import { Tooltip, User } from '@nextui-org/react'
import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid'

export const columns = [
    {
        key: 'date',
        label: 'DATE',
    },
    {
        key: 'ticker',
        label: 'TICKER',
    },
    {
        key: 'transaction',
        label: 'TRANSACTION',
    },
    {
        key: 'shares',
        label: 'SHARES',
    },
    {
        key: 'price',
        label: 'PRICE',
    },
    {
        key: 'taxes',
        label: 'TAXES',
    },
    {
        key: 'totalCost',
        label: 'TOTAL COST',
    },
    {
        key: 'actions',
        label: 'ACTIONS',
    },
]
export const renderCell = (data: ITransaction, columnKey: React.Key) => {
    const cellValue = data[columnKey as keyof ITransaction]

    switch (columnKey) {
        case 'ticker':
            return (
                <User
                    avatarProps={{ radius: 'full', src: data.logo }}
                    description={data.tickerName}
                    name={cellValue.toUpperCase()}
                >
                    {data.date}
                </User>
            )
        case 'actions':
            return (
                <div className='relative flex items-center justify-center gap-2'>
                    <Tooltip color='primary' content='Edit Transaction'>
                        <span className='cursor-pointer text-lg text-primary active:opacity-50'>
                            <PencilIcon className='h-4 w-4' />
                        </span>
                    </Tooltip>
                    <Tooltip color='danger' content='Delete Transaction'>
                        <span className='cursor-pointer text-lg text-danger active:opacity-50'>
                            <TrashIcon className='h-4 w-4' />
                        </span>
                    </Tooltip>
                </div>
            )
        default:
            return cellValue
    }
}
