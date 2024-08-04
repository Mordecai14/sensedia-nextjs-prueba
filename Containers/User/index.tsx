import InputSearch from "@/components/inputSearch";
import TableData from "@/Containers/User/table";
import { Album, Post, Users } from "@/libs/types";
import { FC } from "react";

interface Props {
  users: Users[] | any;
  daysOfWeek: string[];
  cities: string[];
  albums: Album[] | any;
  posts: Post[];
}

export const UsersView: FC<Props> = ({
  cities,
  daysOfWeek,
  users,
  albums,
  posts,
}) => {
  return (
    <div className="mb-4">
      <h1 className="font-bold text-xl mb-12">Usuarios</h1>
      <InputSearch />
      <TableData
        users={users}
        cities={cities}
        daysOfWeek={daysOfWeek}
        albums={albums}
        posts={posts}
      />
    </div>
  );
};
