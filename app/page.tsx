
import Footer from "@/Containers/Navs/Footer";
import Header from "@/Containers/Navs/Header";
import Users from "@/Containers/User";
import Register from "@/Containers/Register";

export default function Home() {

  const res = await fetch('http://localhost:8080/api/v1/posts')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 console.log(res)
  return res.js


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
