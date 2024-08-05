import {
  getData,
  getUserdetail,
  getAlbumByUser,
  getPostsByUser,
} from "@/libs/data";

const ApiUrl = process.env.API_BASE_URL;

global.fetch = jest.fn();

describe("API Actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getData", () => {
    it("should fetch all data successfully", async () => {
      const mockUsers = { users: [{ id: 1, name: "User1" }] };
      const mockPosts = { posts: [{ id: 1, title: "Post1" }] };
      const mockDaysOfWeek = ["Monday", "Tuesday"];
      const mockCities = ["New York", "Los Angeles"];
      const mockAlbums = { albums: [{ id: 1, user_id: 1 }] };

      (fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValue(mockUsers),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValue(mockPosts),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValue(mockDaysOfWeek),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValue(mockCities),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValue(mockAlbums),
        });

      const response = await getData();

      expect(fetch).toHaveBeenCalledTimes(5);
      expect(response).toEqual({
        users: mockUsers,
        daysOfWeek: mockDaysOfWeek,
        cities: mockCities,
        albums: [{ user_id: 1, totalAlbums: 1 }],
        posts: mockPosts,
      });
    });

    it("should handle errors during data fetching", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

      const response = await getData();

      expect(response).toEqual({
        users: [],
        daysOfWeek: [],
        cities: [],
      });
    });
  });

  describe("getUserdetail", () => {
    it("should fetch user detail successfully", async () => {
      const mockUser = { user: { id: 1, name: "User1" } };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockUser),
      });

      const response = await getUserdetail("1");

      expect(fetch).toHaveBeenCalledWith(`${ApiUrl}/users/1`);
      expect(response).toEqual({ user: mockUser.user });
    });

    it("should handle errors during fetching user detail", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

      await expect(getUserdetail("1")).rejects.toThrow(
        "Network response was not ok"
      );
    });
  });

  describe("getAlbumByUser", () => {
    it("should fetch albums by user successfully", async () => {
      const mockAlbums = { albums: [{ id: 1, user_id: 1 }] };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockAlbums),
      });

      const response = await getAlbumByUser("1");

      expect(fetch).toHaveBeenCalledWith(`${ApiUrl}/users/1/albums`);
      expect(response).toEqual({ album: mockAlbums.albums });
    });

    it("should handle errors during fetching albums by user", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

      await expect(getAlbumByUser("1")).rejects.toThrow(
        "Network response was not ok"
      );
    });
  });

  describe("getPostsByUser", () => {
    it("should fetch posts by user successfully", async () => {
      const mockPosts = { posts: [{ id: 1, user_id: 1 }] };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockPosts),
      });

      const response = await getPostsByUser("1");

      expect(fetch).toHaveBeenCalledWith(`${ApiUrl}/users/1/posts`);
      expect(response).toEqual({ post: mockPosts.posts });
    });

    it("should handle errors during fetching posts by user", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

      await expect(getPostsByUser("1")).rejects.toThrow(
        "Network response was not ok"
      );
    });
  });
});
