import React, { useState } from 'react'
import {
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Select,
    SelectItem,
} from '@nextui-org/react'
import { StockService } from '@/services/StockServices'
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker'
import { Controller, FieldValues, useForm } from 'react-hook-form'

const TransactionForm: React.FC<TransactionFormProps> = ({
    onClose,
    title,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        control,
    } = useForm({
        defaultValues: {
            transaction: 'buy',
            date: new Date(),
            ticker: '',
            shares: 0,
            stockPrice: 0,
            taxes: 0,
        },
    })
    const [transactionData, setTransactionData] =
        useState<IResponseTransaction>({
            transaction: 'buy',
            date: Date,
            ticker: '',
            shares: 0,
            stockPrice: 0,
            taxes: 0,
        })

    const transactions = ['buy', 'sell']

    const addTransaction = async (data: FieldValues) => {
        try {
            setTransactionData({
                transaction: data.transaction,
                date: new Date(data.date.endDate),
                ticker: data.ticker,
                shares: parseFloat(data.shares),
                stockPrice: parseFloat(data.stockPrice),
                taxes: parseFloat(data.taxes),
            })
            await StockService.addStock(transactionData).then((res) => {
                console.log(res)
                onClose()
                reset()
            })
            //TODO: REFRESH TABLE AFTER ADDING TRANSACTION
        } catch (error) {
            console.log(error)
            console.error('Failed to add stock:', error)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(addTransaction)}>
                <ModalHeader className='flex flex-col gap-1'>
                    {title}
                </ModalHeader>
                <ModalBody>
                    <ModalBody>
                        <Select
                            label='Select a Transaction'
                            labelPlacement='outside'
                            items={transactions}
                            placeholder='Select a Transaction'
                            className='max-w-xs'
                            {...register('transaction', {
                                required: 'Transaction is required',
                            })}
                        >
                            {transactions.map((transaction) => (
                                <SelectItem
                                    key={transaction}
                                    value={transaction}
                                >
                                    {transaction.charAt(0).toUpperCase() +
                                        transaction.slice(1)}
                                </SelectItem>
                            ))}
                        </Select>
                        <Controller
                            control={control}
                            name='date'
                            render={({ field }) => (
                                <Datepicker
                                    inputClassName='relative bg-default-100 transition-all duration-300 py-2.5 pl-4 pr-14 w-full rounded-lg'
                                    primaryColor={'blue'}
                                    useRange={false}
                                    displayFormat={'DD/MM/YYYY'}
                                    asSingle={true}
                                    onChange={(date) => field.onChange(date)}
                                    value={field.value}
                                />
                            )}
                        />
                        <Input
                            {...register('shares', {
                                required: 'Shares is required',
                                min: { value: 1, message: 'Minimum 1 share' },
                            })}
                            label='Shares'
                            name='shares'
                            type='number'
                            labelPlacement='outside'
                            className='mb-4'
                        />
                        //TODO: AUTOCOMPLETE Ticker
                        <Input
                            {...register('ticker', {
                                required: 'Ticker is required',
                            })}
                            name='ticker'
                            label='Ticker'
                            type='text'
                            labelPlacement='outside'
                            className='mb-4'
                        />
                        <Input
                            {...register('stockPrice', {
                                required: 'Stock Price is required',
                            })}
                            label='Stock Price'
                            name='stockPrice'
                            type='number'
                            labelPlacement='outside'
                            className='mb-4'
                            startContent={
                                <div className='pointer-events-none flex items-center'>
                                    <span className='text-small text-default-400'>
                                        $
                                    </span>
                                </div>
                            }
                        />
                        <Input
                            {...register('taxes')}
                            label='Taxes'
                            name='taxes'
                            type='number'
                            labelPlacement='outside'
                            className='mb-4'
                            startContent={
                                <div className='pointer-events-none flex items-center'>
                                    <span className='text-small text-default-400'>
                                        $
                                    </span>
                                </div>
                            }
                        />
                    </ModalBody>
                </ModalBody>
                <ModalFooter>
                    <Button color='danger' variant='light' onPress={onClose}>
                        Cancel
                    </Button>
                    <Button
                        disabled={isSubmitting}
                        color='primary'
                        type='submit'
                    >
                        Add Transaction
                    </Button>
                </ModalFooter>
            </form>
        </>
    )
}

export default TransactionForm
