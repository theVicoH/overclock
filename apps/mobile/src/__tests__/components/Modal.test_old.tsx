/*import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Modal from "../../components/Modal";
import { vi, Mock } from "vitest";

global.fetch = vi.fn(() =>
  Promise.resolve(
    Object.assign({
      json: () => Promise.resolve({}),
      status: 201,
      ok: true,
      headers: new Headers(),
      redirected: false,
      statusText: "OK",
      type: "basic",
      url: "",
      clone: () =>
        Promise.resolve(
          Object.assign(new Response(), {
            json: () => Promise.resolve({}),
            status: 201,
            ok: true,
          })
        ),
      body: null,
      bodyUsed: false,
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      blob: () => Promise.resolve(new Blob()),
      formData: () => Promise.resolve(new FormData()),
      text: () => Promise.resolve(""),
    })
  )
) as unknown as Mock;

describe("Modal Component", () => {
  const setActiveMock = vi.fn();

  beforeEach(() => {
    setActiveMock.mockClear();
    (fetch as unknown as Mock).mockClear();
  });

  test("renders nothing when inactive", () => {
    render(<Modal active={false} setActive={setActiveMock} />);
    expect(screen.queryByText("Create race")).toBeNull();
  });

  test("renders modal when active", () => {
    render(<Modal active={true} setActive={setActiveMock} />);
    expect(screen.getByText("Create race")).toBeInTheDocument();
  });

  test("closes modal when close button is clicked", () => {
    render(<Modal active={true} setActive={setActiveMock} />);
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(setActiveMock).toHaveBeenCalledWith(false);
  });

  test("input updates correctly and displays character count", () => {
    render(<Modal active={true} setActive={setActiveMock} />);
    const input = screen.getByPlaceholderText("Write here");
    fireEvent.change(input, { target: { value: "Test Race" } });
    expect(screen.getByText("10/50")).toBeInTheDocument();
  });

  test("shows loading indicator when creating race", async () => {
    render(<Modal active={true} setActive={setActiveMock} />);
    const input = screen.getByPlaceholderText("Write here");
    fireEvent.change(input, { target: { value: "Race Test" } });
    const createButton = screen.getByText("Create");

    fireEvent.click(createButton);

    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
  });

  test("calls createRace function and closes modal on success", async () => {
    render(<Modal active={true} setActive={setActiveMock} />);
    const input = screen.getByPlaceholderText("Write here");
    fireEvent.change(input, { target: { value: "Race Test" } });

    const createButton = screen.getByText("Create");
    fireEvent.click(createButton);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith(
      "https://api.clementpnn.com/race/",
      expect.any(Object)
    );
    await waitFor(() => expect(setActiveMock).toHaveBeenCalledWith(false));
  });

  test("does not close modal if API call fails", async () => {
    (fetch as unknown as Mock).mockImplementationOnce(() =>
      Promise.resolve(
        Object.assign({
          json: () => Promise.resolve({}),
          status: 400,
          ok: false,
          headers: new Headers(),
          redirected: false,
          statusText: "Bad Request",
          type: "basic",
          url: "",
          clone: () =>
            Promise.resolve(
              Object.assign(new Response(), {
                json: () => Promise.resolve({}),
                status: 400,
                ok: false,
              })
            ),
          body: null,
          bodyUsed: false,
          arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
          blob: () => Promise.resolve(new Blob()),
          formData: () => Promise.resolve(new FormData()),
          text: () => Promise.resolve(""),
        })
      )
    );

    render(<Modal active={true} setActive={setActiveMock} />);
    const input = screen.getByPlaceholderText("Write here");
    fireEvent.change(input, { target: { value: "Race Test" } });

    const createButton = screen.getByText("Create");
    fireEvent.click(createButton);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(setActiveMock).not.toHaveBeenCalledWith(false);
  });
});*/
