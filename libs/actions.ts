"use server";
import { revalidatePath } from "next/cache";
import { CreateUser, User } from "./types";

const localUrlApi = `${process.env.API_LOCAL}/api/usermenu`;
const remoteUrlApi = `${process.env.API_BASE_URL}/users/create`;

export async function deleteUser(userId: string) {
  try {
    const response = await fetch(`${remoteUrlApi}/users/${userId}`, {
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
  try {
    const response = await fetch(`${remoteUrlApi}/users/create`, {
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

export async function getUserProfile() {
  try {
    const response = await fetch(localUrlApi);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const res: User = await response.json();

    return res;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
