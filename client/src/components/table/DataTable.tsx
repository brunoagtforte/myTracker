import React, { FC, useState, useMemo, useCallback } from 'react'
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    SortDescriptor,
    Input,
    getKeyValue,
} from '@nextui-org/react'
import AddTransactionModal from '../transactions/TransactionModal/TransactionModal'
import { renderCell } from '../transactions/columns'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const DataTable: FC<DataTableProps> = ({ columns, data }) => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: 'date',
        direction: 'descending',
    })

    const [filterValue, setFilterValue] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const [rowsPerPage, setRowsPerPage] = useState<number>(5)

    const hasSearchFilter = Boolean(filterValue)

    const filteredData = useMemo(() => {
        let filteredData = [...data]

        if (hasSearchFilter) {
            filteredData = filteredData.filter((item) =>
                item.ticker.toLowerCase().includes(filterValue.toLowerCase())
            )
        }
        return filteredData
    }, [data, filterValue, hasSearchFilter])

    const formatDate = (date: Date): string => {
        return new Date(date).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        })
    }

    const sortedItems = useMemo(() => {
        const { column, direction } = sortDescriptor
        const sortedItems = [...filteredData]

        sortedItems.sort((a, b) => {
            const valueA = getKeyValue(a, column as keyof SortDescriptor)
            const valueB = getKeyValue(b, column as keyof SortDescriptor)

            const compareStrings = (valueA: string, valueB: string): number => {
                return direction === 'ascending'
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA)
            }

            const compareDates = (dateA: string, dateB: string): number => {
                const parsedDateA = Date.parse(dateA)
                const parsedDateB = Date.parse(dateB)
                return direction === 'ascending'
                    ? parsedDateA - parsedDateB
                    : parsedDateB - parsedDateA
            }

            const compareNumericValues = (
                valueA: string,
                valueB: string
            ): number => {
                const numericValueA = parseFloat(
                    valueA.toString().replace(/[^\d.-]+/g, '')
                )
                const numericValueB = parseFloat(
                    valueB.toString().replace(/[^\d.-]+/g, '')
                )
                return direction === 'ascending'
                    ? numericValueA - numericValueB
                    : numericValueB - numericValueA
            }

            switch (column) {
                case 'ticker':
                case 'transaction':
                    return compareStrings(valueA, valueB)
                case 'date':
                    return compareDates(valueA, valueB)
                case 'stockPrice':
                case 'taxes':
                case 'totalCost':
                case 'shares':
                    return compareNumericValues(valueA, valueB)
                default:
                    return 0
            }
        })

        return sortedItems
    }, [filteredData, sortDescriptor])

    const pages = Math.ceil(filteredData.length / rowsPerPage)

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage

        return sortedItems.slice(start, end)
    }, [page, sortedItems, rowsPerPage])

    const onRowsPerPageChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setRowsPerPage(Number(e.target.value))
            setPage(1)
        },
        []
    )

    const onSearchChange = useCallback((value?: string) => {
        if (value) {
            setFilterValue(value)
            setPage(1)
        } else {
            setFilterValue('')
        }
    }, [])

    const onClearSearch = useCallback(() => {
        setFilterValue('')
        setPage(1)
    }, [])

    const topContent = useMemo(() => {
        return (
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4'>
                    <div className='flex items-end justify-between gap-3'>
                        <Input
                            isClearable
                            className='w-full sm:max-w-[44%]'
                            placeholder='Search by ticker...'
                            startContent={
                                <MagnifyingGlassIcon className='h-5 w-5 text-gray-400' />
                            }
                            value={filterValue}
                            onClear={() => onClearSearch()}
                            onValueChange={onSearchChange}
                        />
                        <AddTransactionModal />
                    </div>
                    <div className='flex items-center justify-between'>
                        <span className='text-small text-default-400'>
                            Total {items.length} Transactions
                        </span>
                        <label className='flex items-center text-small text-default-400'>
                            Rows per page:
                            <select
                                className='bg-transparent text-small text-default-400 outline-none'
                                onChange={onRowsPerPageChange}
                            >
                                <option value='5'>5</option>
                                <option value='10'>10</option>
                                <option value='15'>15</option>
                            </select>
                        </label>
                    </div>
                </div>
            </div>
        )
    }, [
        filterValue,
        onClearSearch,
        onSearchChange,
        onRowsPerPageChange,
        items.length,
    ])

    return (
        <Table
            aria-label='Transactions Table'
            topContent={topContent}
            topContentPlacement='outside'
            bottomContent={
                <div className='flex w-full justify-center'>
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color='primary'
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            }
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
            classNames={{
                wrapper: 'min-h-[400px]',
            }}
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn
                        className={
                            (column.key !== 'date' && column.key !== 'ticker'
                                ? 'text-center'
                                : '') +
                            (column.key !== 'date' &&
                            column.key !== 'actions' &&
                            column.key !== 'ticker'
                                ? ' pl-8'
                                : '')
                        }
                        key={column.key}
                        allowsSorting={column.key !== 'actions'}
                        width={column.key === 'ticker' ? 300 : undefined}
                    >
                        {column.label}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={items}>
                {(item) => (
                    <TableRow key={item._id}>
                        {(columnKey) => (
                            <TableCell
                                className={
                                    columnKey !== 'date' &&
                                    columnKey !== 'ticker'
                                        ? 'text-center'
                                        : ''
                                }
                            >
                                {columnKey === 'date'
                                    ? formatDate(item[columnKey])
                                    : renderCell(item, columnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default DataTable
