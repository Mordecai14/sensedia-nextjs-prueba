import { Album, Post } from "@/libs/types";

export const AlbumDetail = ({ album }: { album: Album[] | null }) => {
  return (
    <>
      <h2 className="flex font-bold text-sensPurple text-2xl">Albums</h2>
      <section className="pt-5 flex flex-col shadow-lg rounded p-5 gap-5">
        {album && album.length > 0 ? (
          album.map((item: Album) => (
            <div
              className="border-b-1 border-sensGray border-dashed pb-3"
              key={item.id}
            >
              <p>
                <strong>Título:</strong> {item.title}
              </p>
              <p>
                <strong>Descripción:</strong> {item.description}
              </p>
              <p>
                <strong>Creado:</strong>{" "}
                {new Date(item.created_at).toLocaleString()}
              </p>
              <p>
                <strong>Última actualización:</strong>{" "}
                {new Date(item.updated_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No hay álbumes disponibles.</p>
        )}
      </section>
    </>
  );
};
export const PostDetail = ({ post }: { post: Post[] | null }) => {
  return (
    <>
      <h2 className="flex font-bold text-sensPurple text-2xl">Posts</h2>
      <section className="pt-5 flex flex-col shadow-lg rounded p-5 gap-5">
        {post && post.length > 0 ? (
          post.map((item: Post) => (
            <div
              className="border-b-1 border-sensGray border-dashed pb-3"
              key={item.id}
            >
              <p>
                <strong>Contenido:</strong> {item.content}
              </p>
              <p>
                <strong>Creado:</strong>{" "}
                {new Date(item.created_at).toLocaleString()}
              </p>
              <p>
                <strong>Última actualización:</strong>{" "}
                {new Date(item.updated_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No hay publicaciones disponibles.</p>
        )}
      </section>
    </>
  );
};
