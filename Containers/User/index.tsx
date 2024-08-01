import InputSearch from "@/components/inputSearch";
import TableData from "@/Containers/User/table";

const Users = () => {
    return (
        <div className="mb-4">
            <h1 className="font-bold text-xl mb-12">Usuarios</h1>
            <InputSearch />
            <TableData/>
        </div>
    );
};

export default Users