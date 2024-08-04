const ApiUrl = "https://b507-189-243-221-11.ngrok-free.app/api/v1";

export async function getData() {
  const resUsers = await fetch(`${ApiUrl}/users`);
  const resPosts = await fetch(`${ApiUrl}/posts`);
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
      const resAlbums = await fetch(`${ApiUrl}/users/${user.id}/albums`);
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

export async function getUserdetail(userid: string) {
  const resUser = await fetch(`${ApiUrl}/users/${userid}`);
  const user = await resUser.json();
  return {
    user: user.user,
  };
}
