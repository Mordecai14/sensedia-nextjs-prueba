import { HelpItems } from "@/components/helpItems";
import { RegisterForm } from "./registerForm";


const Register = () => {
    return (
        <div className="mt-4">
            <h1 className="font-bold text-xl mb-12">Usuarios</h1>
            <HelpItems/>
            <RegisterForm/>
        </div>
    );
};

export default Register