import { useState, useEffect } from "react";
import "./App.css";
import { mockProducts } from "./../../client/mockData/data";

interface ProductType {
  id?: number;
  title: string;
  price: number;
  quantity: number;
}

const AddForm = ({
  setProducts,
}: {
  setProducts: React.Dispatch<React.SetStateAction<never[] | ProductType[]>>;
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    setProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      const prod: ProductType = {
        title: name,
        price,
        quantity,
      };
      newProducts.push(prod);
      return newProducts;
    });
  };

  return (
    <div className="add-form">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-price">Price:</label>
          <input
            type="number"
            id="product-price"
            name="product-price"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input
            type="number"
            id="product-quantity"
            name="product-quantity"
            min="0"
            required
          />
        </div>
        <div className="actions form-actions">
          <button type="submit">Add</button>
          <button type="button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

const Cart = () => {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <p>Your cart is empty</p>
      <p>Total: $0</p>
      <button className="checkout" disabled>
        Checkout
      </button>
    </div>
  );
};

interface ProductProps {
  product: ProductType;
}

const Product = ({ product }: ProductProps) => {
  return (
    <li className="product">
      <div className="product-details">
        <h3>{product.title}</h3>
        <p className="price">${product.price}</p>
        <p className="quantity">{product.quantity} left in stock</p>
        <div className="actions product-actions">
          <button className="add-to-cart">Add to Cart</button>
          <button className="edit">Edit</button>
        </div>
        <button className="delete-button">
          <span>X</span>
        </button>
      </div>
    </li>
  );
};

const ProductListing = ({ products }: { products: ProductType[] }) => {
  return (
    <div className="product-listing">
      <h2>Products</h2>
      <ul className="product-list">
        {products.map((product) => {
          return <Product key={product.id} product={product} />;
        })}
      </ul>
    </div>
  );
};

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      console.log("fake fetching of data");
      setProducts(mockProducts);
    }, 1500);

    return () => {};
  }, []);

  return (
    <>
      <div>
        <header>
          <h1>The Shop!</h1>
          <Cart />
        </header>
        <main>
          <ProductListing products={products} />
          <AddForm setProducts={setProducts} />
        </main>
      </div>
    </>
  );
}

export default App;
