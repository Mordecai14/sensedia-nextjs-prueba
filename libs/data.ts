const ApiUrl = process.env.API_BASE_URL;

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
      try {
        const resAlbums = await fetch(`${ApiUrl}/users/${user.id}/albums`);

        if (!resAlbums.ok) {
          console.error(
            `Error fetching albums for user ${user.id}: ${resAlbums.statusText}`
          );
          return {
            user_id: user.id,
            totalAlbums: 0,
          };
        }

        const contentType = resAlbums.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const albumsResponse = await resAlbums.json();
          const totalAlbums = albumsResponse.albums
            ? albumsResponse.albums.length
            : 0;

          return {
            user_id: user.id,
            totalAlbums: totalAlbums,
          };
        } else {
          console.error(
            `Expected JSON response but got ${contentType} for user ${user.id}`
          );
          return {
            user_id: user.id,
            totalAlbums: 0,
          };
        }
      } catch (error) {
        console.error(`Error processing albums for user ${user.id}:`, error);
        return {
          user_id: user.id,
          totalAlbums: 0,
        };
      }
    })
  );

  return {
    users,
    daysOfWeek,
    cities,
    albums: albumsData,
    posts: posts.posts,
  };
}

export async function getUserdetail(userid: string) {
  const resUser = await fetch(`${ApiUrl}/users/${userid}`);
  const user = await resUser.json();
  return {
    user: user.user,
  };
}

export async function getAlbumByUser(userId: string) {
  const resAlbum = await fetch(`${ApiUrl}/users/${userId}/albums`);
  const album = await resAlbum.json();
  return {
    album: album.albums,
  };
}

export async function getPostsByUser(userId: string) {
  const resPost = await fetch(`${ApiUrl}/users/${userId}/posts`);
  const post = await resPost.json();
  return {
    post: post.posts,
  };
}
