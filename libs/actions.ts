"use server";
import { revalidatePath } from "next/cache";

export async function deleteUser(userId: string) {
  const apiUrl = `https://b507-189-243-221-11.ngrok-free.app/api/v1/users/${userId}`;

  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blocked: "true",
      }),
    });

    if (!response.ok) {
      return "Error al borrar el usuario: " + response.status;
    }

    revalidatePath("/");
    return { message: "Usuario borrado exitosamente" };
  } catch (error: any) {
    return { message: "Error del servidor", error: error.message };
  }
}
