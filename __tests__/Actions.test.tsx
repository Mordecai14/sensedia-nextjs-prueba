import { deleteUser, createUser, getUserProfile } from "@/libs/actions";
import { CreateUser } from "@/libs/types";

const mockUser = {
  id: "454asdasd4ds5a1",
  name: "nombre falso",
  email: "emailfalso@mail.com",
  created_at: "2024-08-02T07:28:28.397891-06:00",
  updated_at: "2024-08-02T07:28:28.397891-06:00",
};

const localUrlApi = `${process.env.API_LOCAL}/api/usermenu`;
const remoteUrlApi = `${process.env.API_BASE_URL}/users/create`;

global.fetch = jest.fn();

describe("User Actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("deleteUser", () => {
    it("should delete user successfully", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest
          .fn()
          .mockResolvedValue({ message: "Usuario borrado exitosamente" }),
      });

      const response = await deleteUser(mockUser.id);

      expect(fetch).toHaveBeenCalledWith(
        `${remoteUrlApi}/users/${mockUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ blocked: "true" }),
        }
      );
      expect(response).toEqual({ message: "Usuario borrado exitosamente" });
    });

    it("should handle errors during user deletion", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500 });

      const response = await deleteUser(mockUser.id);

      expect(response).toEqual("Error al borrar el usuario: 500");
    });

    it("should catch exceptions during user deletion", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

      const response = await deleteUser(mockUser.id);

      expect(response).toEqual({
        message: "Error del servidor",
        error: "Network Error",
      });
    });
  });

  describe("createUser", () => {
    const newUser: CreateUser = {
      email: "newuser@mail.com",
      name: "New User",
      password: "password123",
    };

    it("should create user successfully", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest
          .fn()
          .mockResolvedValue({ message: "Usuario creado exitosamente" }),
      });

      const response = await createUser(newUser);

      expect(fetch).toHaveBeenCalledWith(`${remoteUrlApi}/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newUser.email,
          name: newUser.name,
          password: newUser.password,
        }),
      });
      expect(response).toEqual({ message: "Usuario creado exitosamente" });
    });

    it("should handle errors during user creation", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500 });

      const response = await createUser(newUser);

      expect(response).toEqual("Error al crear el usuario: 500");
    });

    it("should catch exceptions during user creation", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

      const response = await createUser(newUser);

      expect(response).toEqual({
        message: "Error del servidor",
        error: "Network Error",
      });
    });
  });

  describe("getUserProfile", () => {
    it("should fetch user profile successfully", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockUser),
      });

      const response = await getUserProfile();

      expect(fetch).toHaveBeenCalledWith(localUrlApi);
      expect(response).toEqual(mockUser);
    });

    it("should handle errors during fetching user profile", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

      const response = await getUserProfile();

      expect(response).toBeUndefined();
    });

    it("should catch exceptions during fetching user profile", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

      const response = await getUserProfile();

      expect(response).toBeUndefined();
    });
  });
});
