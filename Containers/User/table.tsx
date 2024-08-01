'use client'
import { useState, useMemo, useCallback } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Button } from "@nextui-org/react";
import { DropDownPaginate } from "../../components/Dropdowns/dropdownPaginate";


const TableData = () => {
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;
    let users: any = [
        {
            key: "1",
            name: "Tony Reichert",
            role: "CEO",
            status: "Active",
        },
        {
            key: "2",
            name: "Zoey Lang",
            role: "Technical Lead",
            status: "Paused",
        },
        {
            key: "3",
            name: "Jane Fisher",
            role: "Senior Developer",
            status: "Active",
        },
        {
            key: "4",
            name: "William Howard",
            role: "Community Manager",
            status: "Vacation",
        },
        {
            key: "5",
            name: "Emily Collins",
            role: "Marketing Manager",
            status: "Active",
        },
        {
            key: "6",
            name: "Brian Kim",
            role: "Product Manager",
            status: "Active",
        },
        {
            key: "7",
            name: "Laura Thompson",
            role: "UX Designer",
            status: "Active",
        },
        {
            key: "8",
            name: "Michael Stevens",
            role: "Data Analyst",
            status: "Paused",
        },
        {
            key: "9",
            name: "Sophia Nguyen",
            role: "Quality Assurance",
            status: "Active",
        },
        {
            key: "10",
            name: "James Wilson",
            role: "Front-end Developer",
            status: "Vacation",
        },
        {
            key: "11",
            name: "Ava Johnson",
            role: "Back-end Developer",
            status: "Active",
        },
        {
            key: "12",
            name: "Isabella Smith",
            role: "Graphic Designer",
            status: "Active",
        },
        {
            key: "13",
            name: "Oliver Brown",
            role: "Content Writer",
            status: "Paused",
        },
        {
            key: "14",
            name: "Lucas Jones",
            role: "Project Manager",
            status: "Active",
        },
        {
            key: "15",
            name: "Grace Davis",
            role: "HR Manager",
            status: "Active",
        },
        {
            key: "16",
            name: "Elijah Garcia",
            role: "Network Administrator",
            status: "Active",
        },
        {
            key: "17",
            name: "Emma Martinez",
            role: "Accountant",
            status: "Vacation",
        },
        {
            key: "18",
            name: "Benjamin Lee",
            role: "Operations Manager",
            status: "Active",
        },
        {
            key: "19",
            name: "Mia Hernandez",
            role: "Sales Manager",
            status: "Paused",
        },
        {
            key: "20",
            name: "Daniel Lewis",
            role: "DevOps Engineer",
            status: "Active",
        },
        {
            key: "21",
            name: "Amelia Clark",
            role: "Social Media Specialist",
            status: "Active",
        },
        {
            key: "22",
            name: "Jackson Walker",
            role: "Customer Support",
            status: "Active",
        },
        {
            key: "23",
            name: "Henry Hall",
            role: "Security Analyst",
            status: "Active",
        },
        {
            key: "24",
            name: "Charlotte Young",
            role: "PR Specialist",
            status: "Paused",
        },
        {
            key: "25",
            name: "Liam King",
            role: "Mobile App Developer",
            status: "Active",
        },
    ];

    const pages = Math.ceil(users.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return users.slice(start, end);
    }, [page, users]);

    const onNextPage = useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    return (
        <Table
            bottomContent={
                <div className="flex items-center mt-4 w-full justify-between">
                    <p>Total XXX </p>
                    <div className="flex justify-center items-center gap-4">
                        <Button isDisabled={page === 1} size="sm" variant="ghost" onPress={onPreviousPage} className="rounded-full">
                            ANTERIOR
                        </Button>
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                        <Button isDisabled={page === pages} size="sm" variant="ghost" onPress={onNextPage} className="rounded-full">
                            PRÓXIMO
                        </Button>
                    </div>
                    <DropDownPaginate
                        pages={pages}
                        currentPage={page}
                        callback={(page) => setPage(page)} />
                </div>
            }
            classNames={{
                wrapper: "min-h-[222px]",
            }}
            className="mt-[40px]"
        >
            <TableHeader>
                <TableColumn key="name">USUARIO</TableColumn>
                <TableColumn key="role">NOMBRE</TableColumn>
                <TableColumn key="status">CORREO ELECTRÓNICO</TableColumn>
                <TableColumn key="city">CIUDAD</TableColumn>
                <TableColumn key="weekdays">DIAS DE LA SEMANA</TableColumn>
                <TableColumn key="posts">POSTS</TableColumn>
                <TableColumn key="albums">ALBUMS</TableColumn>
            </TableHeader>
            <TableBody items={items}>
                {(item: any) => (
                    <TableRow key={item.name}>
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default TableData;