import CartList from "./Components/CartList";
import App from "./Pages/index";
import { cart } from "./mocks/Data";
import { render, fireEvent, act, screen } from "./test-utils";
import renderer from "react-test-renderer";
import { AppProviders } from "./providers/AppProviders";

describe("App", () => {
  test("render App ", async () => {
    await act(async () => render(<App />));
    const textElement = screen.getByTestId("Select");
    expect(textElement).toBeInTheDocument();
  });
  test("renders a list of Products", async () => {
    await act(async () => render(<App />));
    const Products = await screen.findAllByRole("listitem");
    expect(Products).toHaveLength(3);
  });
  it("Matches App Snapshot", async () => {
    const domTree = await act(async () =>
      renderer
        .create(
          <AppProviders>
            <App />
          </AppProviders>
        )
        .toJSON()
    );

    expect(domTree).toMatchSnapshot();
  });
});
describe("CartList", () => {
  test("test Cart List Component", () => {
    const updateQty = jest.fn();
    const { getByTestId, getByRole } = render(
      <CartList data={cart} index={0} updateQty={updateQty} />
    );
    const QtyValue = Number(getByTestId("Qty").textContent);
    const nameValue = getByTestId("name").textContent;
    const priceValue = getByTestId("price").textContent;
    expect(QtyValue).toEqual(0);
    expect(nameValue).toBe("Stone Ribbed Strappy Cut Out Detail Bodycon Dress");
    expect(priceValue).toBe("£4");
    const incrementBtn = getByRole("button", { name: "+" });
    const decrementBtn = getByRole("button", { name: "-" });
    const removeBtn = getByRole("button", { name: "Remove" });
    fireEvent.click(incrementBtn);
    fireEvent.click(decrementBtn);
    fireEvent.click(removeBtn);
    expect(updateQty).toHaveBeenCalledTimes(3);
  });

  it("Matches Cart List Component Snapshot", () => {
    const updateQty = jest.fn();
    const domTree = renderer
      .create(<CartList data={cart} index={0} updateQty={updateQty} />)
      .toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
