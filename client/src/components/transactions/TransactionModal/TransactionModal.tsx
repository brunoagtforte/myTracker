import React from 'react'
import { Button, Modal, ModalContent, useDisclosure } from '@nextui-org/react'
import { PlusIcon } from '@heroicons/react/24/solid'
import TransactionForm from './TransactionForm'

const TransactionModal: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button
                onPress={onOpen}
                color='primary'
                startContent={<PlusIcon className='h-5 w-5' />}
            >
                Add Transaction
            </Button>
            <Modal
                backdrop='blur'
                isOpen={isOpen}
                onOpenChange={onClose}
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: 'easeOut',
                            },
                        },
                        exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: 'easeIn',
                            },
                        },
                    },
                }}
            >
                <ModalContent>
                    <TransactionForm
                        onClose={onClose}
                        title='Transaction Form'
                    />
                </ModalContent>
            </Modal>
        </>
    )
}

export default TransactionModal
