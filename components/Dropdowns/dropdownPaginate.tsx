'use client'
import { FC, useState, useEffect } from 'react';
import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from '@nextui-org/react';

interface Props {
    pages: number;
    currentPage: number;
    callback: (newPage: number) => void;
}

export const DropDownPaginate: FC<Props> = ({ pages, currentPage, callback }) => {
    const [selectedKeys, setSelectedKeys] = useState<Set<React.Key>>(new Set());

    useEffect(() => {
        // Actualizar el estado selectedKeys cuando currentPage cambie
        setSelectedKeys(new Set([currentPage.toString()]));
    }, [currentPage]);

    const handleSelectionChange = (keys: Set<React.Key>) => {
        setSelectedKeys(keys);
        // Llama al callback con el valor seleccionado
        if (keys.size > 0) {
            const selectedValue = [...keys].join(', ');
            callback(selectedValue);
        }
    };

    const selectedValue = [...selectedKeys].join(', ');
    return (
        <div className='flex items-center'>
            Saltar a la<br/> página
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="light"
                        className="capitalize flex-start p-0 underline underline-offset-8 flex justify-start pl-[25px]"
                    >
                        {selectedValue || 'Select'}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={handleSelectionChange}
                >
                    {Array.from({ length: pages }, (_, index) => (
                        <DropdownItem key={index + 1}>{index + 1}</DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};
