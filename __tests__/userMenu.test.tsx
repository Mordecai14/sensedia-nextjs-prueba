import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserMenu from "@/components/userMenu";
import { User as UserType } from "@/libs/types";

const mockUser: UserType = {
  name: "Aramen Meza Mendozaaaa",
  email: "aramen@mail.com",
  avatar: "/asd",
};

jest.mock("@/libs/actions", () => ({
  getUserProfile: jest.fn().mockResolvedValue(mockUser),
}));

describe("UserMenu Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("displays skeletons when user data is loading", () => {
    render(<UserMenu />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("displays user data once loaded", async () => {
    render(<UserMenu />);

    await waitFor(() => {
      expect(screen.getByText("Aramen Meza Mendozaaaa")).toBeInTheDocument();
    });
  });

  test("dropdown opens and closes correctly", async () => {
    render(<UserMenu />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("Aramen Meza Mendozaaaa"));
    });

    await waitFor(() => {
      expect(screen.getByText("Lista de amigos")).toBeInTheDocument();
    });

    fireEvent.click(document.body);

    await waitFor(() => {
      expect(screen.queryByText("Lista de amigos")).not.toBeInTheDocument();
    });
  });
});
