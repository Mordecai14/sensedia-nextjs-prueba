import Footer from "@/Containers/Navs/Footer";
import Header from "@/Containers/Navs/Header";
import { UsersView } from "@/Containers/User";
import { getData } from "@/libs/data";

export default async function User() {
  const { users, daysOfWeek, cities, albums, posts } = await getData();

  return (
    <>
      <Header />
      <main className="flex flex-col py-5 px-[18%]">
        <UsersView
          users={users.users}
          daysOfWeek={daysOfWeek}
          cities={cities}
          albums={albums}
          posts={posts.posts}
        />
      </main>
      <Footer />
    </>
  );
}