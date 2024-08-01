
import Footer from "@/Containers/Navs/Footer";
import Header from "@/Containers/Navs/Header";
import Users from "@/Containers/User";
import Register from "@/Containers/Register";

export default function Home() {
  return (
    <>
    <Header/>
      <main className="flex  flex-col py-24 px-[18%]">
        <Users/>
        <Register/>
      </main>
      <Footer />
    </>
  );
}
