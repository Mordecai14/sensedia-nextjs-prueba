"use client";
import { useState, useMemo, useCallback, FC } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  ModalContent,
} from "@nextui-org/react";
import { DropDownPaginate } from "../../components/Dropdowns/dropdownPaginate";
import { Album, Post, Users } from "@/libs/types";
import { deleteUser } from "@/libs/actions";

interface Props {
  users: Users[];
  daysOfWeek: string[];
  cities: string[];
  albums: Album[];
  posts: Post[];
}

const TableData: FC<Props> = ({ cities, daysOfWeek, users, albums, posts }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [page, setPage] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState("");
  const rowsPerPage = 5;
  const pages = Math.ceil(users.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return users.slice(start, end);
  }, [page, users]);

  const getPostsForUser = (userId: string) => {
    return posts.filter((post: Post) => post.user_id === userId).length;
  };

  const getAlbumsForUser = (userId: string) => {
    return albums
      .filter((album: any) => album.user_id === userId)
      .map((album: any) => album.totalAlbums)
      .join(", ");
  };

  const getRandomElement = (arr: string[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const getRandomDaysOfWeek = (days: string[]) => {
    const numberOfDays = Math.floor(Math.random() * 7) + 1;
    const selectedDays = new Set<string>();

    while (selectedDays.size < numberOfDays) {
      const day = getRandomElement(days);
      selectedDays.add(day);
    }

    return Array.from(selectedDays).join(", ");
  };

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

  const handleDeleteClick = (userId: string) => {
    console.log(userId);
    setSelectedUserId(userId);
    onOpen();
  };

  const handleConfirmDelete = async () => {
    if (selectedUserId) {
      await deleteUser(selectedUserId);
      //TODO mostrar toastify en .then()
    }
  };

  return (
    <>
      <Table
        bottomContent={
          <div className="flex items-center mt-4 w-full justify-between">
            <p>Total {users.length} </p>
            <div className="flex justify-center items-center gap-4">
              <Button
                isDisabled={page === 1}
                size="sm"
                variant="ghost"
                onPress={onPreviousPage}
                className="rounded-full"
              >
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
              <Button
                isDisabled={page === pages}
                size="sm"
                variant="ghost"
                onPress={onNextPage}
                className="rounded-full"
              >
                PRÓXIMO
              </Button>
            </div>
            <DropDownPaginate
              pages={pages}
              currentPage={page}
              callback={(page) => setPage(page)}
            />
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
          <TableColumn key="posts">ALBUMS</TableColumn>
          <TableColumn key="actions">Borrar</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {items.map((item, id) => (
            <TableRow key={id} className="table-row">
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{getRandomElement(cities)}</TableCell>
              <TableCell>{getRandomDaysOfWeek(daysOfWeek)}</TableCell>
              <TableCell>{getPostsForUser(item.id)}</TableCell>
              <TableCell>{getAlbumsForUser(item.id)}</TableCell>
              <TableCell className="action-cell">
                <Button
                  size="sm"
                  color="danger"
                  variant="bordered"
                  onPress={() => handleDeleteClick(item.id)}
                >
                  X
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                ¿Deseas borrar el registro {selectedUserId}?
              </ModalHeader>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleConfirmDelete();
                    onClose();
                  }}
                >
                  Aceptar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default TableData;
