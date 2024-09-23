import React from "react";

const ce = React.createElement;

const Product = ({ name, price, quantity }) => {
  return ce(
    "li",
    { className: "product" },
    ce("div", {
      className: "product-details",
      children: [
        ce("h3", null, name),
        ce("p", { className: "price" }, "$", price),
        ce("p", { className: "quantity" }, quantity, " left in stock"),
        ce("div", {
          className: "actions product-actions",
          children: [
            ce("button", { className: "add-to-cart" }, "Add to Cart"),
            ce("button", { className: "edit" }, "Edit"),
          ],
        }),
        ce("button", { className: "delete-button" }, ce("span", null, "X")),
      ],
    }),
  );
};

const App = ({}) => {
  return ce("div", {
    id: "app",
    children: [
      ce("header", {
        children: [
          ce("h1", null, "The Shop!"),
          ce("div", {
            className: "cart",
            children: [
              ce("h2", null, "Your Cart"),
              ce("p", null, "Your cart is empty"),
              ce("p", null, "Total: $0"),
              ce(
                "button",
                { className: "checkout", isDisabled: true },
                "Checkout",
              ),
            ],
          }),
        ],
      }),
      ce("main", {
        children: [
          ce("div", {
            className: "product-listing",
            children: [
              ce("h2", null, "Products"),
              ce("ul", {
                className: "product-list",
                children: [
                  Product({
                    name: "Amazon Kindle E-reader",
                    price: 79.99,
                    quantity: 5,
                  }),
                  Product({
                    name: "Apple 10.5-Inch iPad Pro",
                    price: 649.99,
                    quantity: 2,
                  }),
                  Product({
                    name: "Yamaha Portable Keyboard",
                    price: 155.99,
                    quantity: 0,
                  }),
                ],
              }),
            ],
          }),
          ce(
            "p",
            null,
            ce("button", { className: "add-product-button" }, "Add A Product"),
          ),
        ],
      }),
    ],
  });
};

export default App;
