import Footer from "@/Containers/Navs/Footer";
import Header from "@/Containers/Navs/Header";
import { AlbumDetail, PostDetail } from "@/Containers/User/details";
import { SkeletonComponent } from "@/components/Skeleton";
import { getAlbumByUser, getPostsByUser, getUserdetail } from "@/libs/data";
import { Album } from "@/libs/types";
import { Accordion, AccordionItem, Divider } from "@nextui-org/react";

export default async function UserName({
  params,
}: {
  params: { username: string };
}) {
  try {
    const { user } = await getUserdetail(params.username);
    const { album } = await getAlbumByUser(params.username);
    const { post } = await getPostsByUser(params.username);

    if (!user) {
      return (
        <>
          <Header />
          error en la petición
          <SkeletonComponent />
          <Footer />
        </>
      );
    }

    return (
      <>
        <Header />
        <main className="flex flex-col items-center min-h-[71vh] justify-center py-24 px-[18%]">
          <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl">
            <div className="flex flex-col justify-center">
              <h2 className="text-center font-bold text-sensPurple text-2xl">
                Detalle
              </h2>
              <div className="w-full p-4">
                <div className="mt-4">
                  <p className="text-gray-700">
                    <strong>ID:</strong> {user.id}
                  </p>
                  <p className="text-gray-700">
                    <strong>Name:</strong> {user.name}
                  </p>
                  <p className="text-gray-700">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p className="text-gray-700">
                    <strong>Created At:</strong>{" "}
                    {new Date(user.created_at).toLocaleString()}
                  </p>
                  <p className="text-gray-700">
                    <strong>Updated At:</strong>{" "}
                    {new Date(user.updated_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Divider className="my-10" />
          <AlbumDetail album={album} />
          <Divider className="my-10" />
          <PostDetail post={post} />
        </main>
        <Footer />
      </>
    );
  } catch (error) {
    console.error("Error fetching user details:", error);
    return (
      <>
        <Header />
        error, Parámtro desconocido
        <SkeletonComponent />
        <Footer />
      </>
    );
  }
}
