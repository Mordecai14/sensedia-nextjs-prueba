import Footer from "@/Containers/Navs/Footer";
import Header from "@/Containers/Navs/Header";
import { SkeletonComponent } from "@/components/Skeleton";
import { getUserdetail } from "@/libs/data";

export default async function UserName({
  params,
}: {
  params: { username: string };
}) {
  try {
    const { user } = await getUserdetail(params.username);

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
        <main className="flex flex-col items-center h-[71vh] justify-center py-24 px-[18%]">
          <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl">
            <div className="md:flex">
              <div className="w-full p-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Detalle del usuario
                </h2>
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
        </main>
        <Footer />
      </>
    );
  } catch (error) {
    console.error("Error fetching user details:", error);
    return (
      <>
        <Header />
        error, param missing
        <SkeletonComponent />
        <Footer />
      </>
    );
  }
}
