import Footer from "@/Containers/Navs/Footer";
import Header from "@/Containers/Navs/Header";
import { RegisterForm } from "@/Containers/Register/registerForm";

export default async function UserNew() {
  return (
    <>
      <Header />
      <main className="flex flex-col justify-center px-[18%] h-[70vh]">
        <RegisterForm />
      </main>
      <Footer />
    </>
  );
}
