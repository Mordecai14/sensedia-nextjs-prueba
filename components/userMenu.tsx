"use client";
import { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Skeleton,
} from "@nextui-org/react";
import { User } from "@nextui-org/react";
import { getUserProfile } from "@/libs/actions";
import { User as UserType } from "@/libs/types";

const UserMenu = () => {
  const [user, setUser] = useState<UserType | undefined>();
  const [isOpen, setIsOpen] = useState(false);

  const getInitials = (name: string) => {
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("");
    return initials.toUpperCase();
  };

  useEffect(() => {
    getUserProfile()
      .then((res) => {
        setUser(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="relative">
      {!user ? (
        <div className="w-[180px] flex items-center gap-3">
          <div>
            <Skeleton className="flex rounded-full w-12 h-12" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
      ) : (
        <Dropdown
          isOpen={isOpen}
          onClose={handleClose}
          className="bg-sensGray text-white"
          radius="none"
        >
          <DropdownTrigger>
            {user.avatar ? (
              <User
                avatarProps={{
                  src: user.avatar,
                }}
                name={user.name}
                onClick={handleToggle}
                className="cursor-pointer"
              />
            ) : (
              <div
                className="flex items-center gap-4 cursor-pointer"
                onClick={handleToggle}
              >
                <div className="cursor-pointer flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full text-white">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="rounded-full w-full h-full"
                    />
                  ) : (
                    <span>{getInitials(user.name)}</span>
                  )}
                </div>
                <p>{user.name}</p>
              </div>
            )}
          </DropdownTrigger>
          <DropdownMenu variant="solid" color="secondary">
            <DropdownItem key="friends">Lista de amigos</DropdownItem>
            <DropdownItem key="saved">Artículos guardados</DropdownItem>
            <DropdownItem key="notifications">Notificaciones</DropdownItem>
            <DropdownItem key="settings">Preferencias</DropdownItem>
            <DropdownItem key="logout">Cerrars sesión</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );
};

export default UserMenu;
