import Footer from "@/Containers/Navs/Footer";
import Header from "@/Containers/Navs/Header";
import { UsersView } from "@/Containers/User";
import Register from "@/Containers/Register";

// const API_URL = "https://b507-189-243-221-11.ngrok-free.app/api/v1"

async function getData() {
  const resUsers = await fetch(
    "https://b507-189-243-221-11.ngrok-free.app/api/v1/users"
  );
  const resPosts = await fetch(
    "https://b507-189-243-221-11.ngrok-free.app/api/v1/posts"
  );
  const resDaysOfWeek = await fetch("http://localhost:3000/api/daysOfWeek");
  const resCities = await fetch("http://localhost:3000/api/cities");

  if (!resUsers.ok || !resDaysOfWeek.ok || !resCities.ok) {
    console.error("Failed to fetch data");
    return {
      users: [],
      daysOfWeek: [],
      cities: [],
    };
  }

  const users = await resUsers.json();
  const daysOfWeek = await resDaysOfWeek.json();
  const cities = await resCities.json();
  const posts = await resPosts.json();

  const albumsData = await Promise.all(
    users.users.map(async (user: any) => {
      const resAlbums = await fetch(
        `https://b507-189-243-221-11.ngrok-free.app/api/v1/users/${user.id}/albums`
      );
      const albumsResponse = await resAlbums.json();
      const totalAlbums = albumsResponse.albums
        ? albumsResponse.albums.length
        : 0;
      return {
        user_id: user.id,
        totalAlbums: totalAlbums,
      };
    })
  );

  return {
    users,
    daysOfWeek,
    cities,
    albums: albumsData,
    posts,
  };
}

export default async function Home() {
  const { users, daysOfWeek, cities, albums, posts } = await getData();

  return (
    <>
      <Header />
      <main className="flex flex-col py-24 px-[18%]">
        <UsersView
          users={users.users}
          daysOfWeek={daysOfWeek}
          cities={cities}
          albums={albums}
          posts={posts.posts}
        />
        <Register />
      </main>
      <Footer />
    </>
  );
}
