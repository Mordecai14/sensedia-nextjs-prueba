"use server";
import { revalidatePath } from "next/cache";
import { CreateUser } from "./types";

export async function deleteUser(userId: string) {
  const apiUrl = `${process.env.API_BASE_URL}/users/${userId}`;

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

export async function createUser(data: CreateUser) {
  const apiUrl = `${process.env.API_BASE_URL}/users/create`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        name: data.name,
        password: data.password,
      }),
    });

    if (!response.ok) {
      return "Error al crear el usuario: " + response.status;
    }

    revalidatePath("/");
    return { message: "Usuario creado exitosamente" };
  } catch (error: any) {
    return { message: "Error del servidor", error: error.message };
  }
}
