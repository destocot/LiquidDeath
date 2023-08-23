import {
  fireEvent,
  getByRole,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { List } from "./List.tsx";

// jest.mock("axios");
// jest.mock("react", () => ({
//   ...jest.requireActual("react"),
//   useState: jest.fn(),
// }));
let product = {
  id: 37324,
  campus: "hr-rfe",
  name: "Jaylen Backpack",
  slogan: "Porro molestiae ut libero.",
  description:
    "Voluptatem et nihil nisi ut vel. Dolores facere nisi vel ab. Rerum cupiditate tempore molestiae quis. Ut eos culpa eos quo voluptas rerum. Modi necessitatibus sunt nam aut quo molestiae at est eius.",
  category: "Backpack",
  default_price: "278.00",
  created_at: "2021-08-13T14:37:33.285Z",
  updated_at: "2021-08-13T14:37:33.285Z",
  features: [
    {
      feature: "Stitching",
      value: '"Cross Stitch"',
    },
    {
      feature: "Lifetime Guarantee",
      value: null,
    },
    {
      feature: "Cut",
      value: '"Loose"',
    },
    {
      feature: "Fabric",
      value: '"Silk"',
    },
  ],
};
const updProduct = async (id) => {
  const newProduct = await axios.get(`/products/${id}`);
  return newProduct;
};
test("Renders the component", async () => {
  render(
    <List
      currentProduct={product}
      updateCurrentProduct={updProduct}
      setCurrentProduct={(product) => {
        currentProduct = product;
      }}
    />
  );
  expect(screen.getByRole("button")).toHaveTextContent("Outfit List");
  expect(screen.getByText("Related")).toBeInTheDocument();
  fireEvent.click(getByText("Related"));
  expect(screen.getByRole("img")).toBeInTheDocument();
});
