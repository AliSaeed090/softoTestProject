import React from "react";
import { render } from "@testing-library/react";
import CartList from "./Components/CartList";
 
test("test Cart List Component", () => {
  
  let data = {
    id:1,
    Qty: 0,
    img: "https://cdn-img.prettylittlething.com/3/6/5/a/365a5d1dce6a2b77b564379b302c9d83afccf33b_cmd2051_1.jpg?imwidth=1024",
    name: "Stone Ribbed Strappy Cut Out Detail Bodycon Dress",
    price: 4,
  };
  const updateQty = jest.fn();
  const { getByTestId,   } = render(<CartList data={data}  index={0} updateQty={updateQty}/>);
  const QtyValue = Number(getByTestId("Qty").textContent);
  const nameValue = getByTestId("name").textContent;
  const priceValue = getByTestId("price").textContent;
  expect(QtyValue).toEqual(0);
  expect(nameValue).toBe("Stone Ribbed Strappy Cut Out Detail Bodycon Dress");
  expect(priceValue).toBe("£4");
 
});
 
