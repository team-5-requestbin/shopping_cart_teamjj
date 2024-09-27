import { useState, useEffect } from "react";
import "./App.css";
import productService from "./services/productService.ts";
import { ErrorBoundary } from "react-error-boundary";

// ?should we extract the productSchema to a different schema folder??
import { productSchema, Product, NewProduct, EditedProduct } from "./types";

import { ZodError } from "zod";

const Fallback = () => {
  console.log("fallback component rendered!");

  return <div>Fallback - Error Boundary Hit!</div>;
};

interface AddFormProps {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const AddForm = ({ setProducts }: AddFormProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const resetForm = () => {
    setName("");
    setPrice("");
    setQuantity("");
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const responseProduct = await productService.addProduct({
        title: name,
        price: Number(price),
        quantity: Number(quantity),
      });

      setProducts((prevProducts) => {
        return [...prevProducts, responseProduct];
      });

      resetForm();
    } catch (error) {
      if (error instanceof ZodError) {
        console.log("ZOD ERROR", error.message);
      }
      console.log("error in handleSubmit");
    }
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
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

interface EditFormProps {
  currentProductValues: EditedProduct;
  handleEdit: (np: EditedProduct) => Promise<void>;
}

const EditForm = ({
  currentProductValues,
  handleEdit,
}: // receive existing state information from parent
EditFormProps) => {
  const [name, setName] = useState(currentProductValues.title);
  const [price, setPrice] = useState(String(currentProductValues.price));
  const [quantity, setQuantity] = useState(
    String(currentProductValues.quantity)
  );

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleEdit({
      _id: currentProductValues._id,
      title: name,
      price: Number(price),
      quantity: Number(quantity),
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="actions form-actions">
          <button type="submit">Submit</button>
          <button type="button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

interface EditableProductProps {
  product: Product;
  onDeleteProduct: (p: string) => void;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const EditableProduct = ({
  product,
  onDeleteProduct,
  setProducts,
}: EditableProductProps) => {
  const [showEditForm, setShowEditForm] = useState(false);

  /* 
  - conditionally render edit form
  - be able to pass in `product data` into the EDIT form component that we conditinoally render
  - define a handler for submitting the EDIT form
  - make sure we can access the PRODUCT ID for EDIT
  */
  const handleDelete = async () => {
    try {
      await productService.deleteProduct(product._id);
      onDeleteProduct(product._id);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log("Zod error at delete product", error.message);
      } else {
        throw new Error("Failed to delete product");
      }
    }
  };

  // const resetForm = () => {
  //   setName("");
  //   setPrice("");
  //   setQuantity("");
  // };

  const handleEdit = async (editedProduct: EditedProduct) => {
    // setShowEditForm(!showEditForm);
    try {
      const updatedProduct = await productService.editProduct(editedProduct);
      console.log("got response product from editProduct, ", updatedProduct);
      setShowEditForm(!showEditForm);

      setProducts((prevProducts) => {
        return prevProducts.map((prevProd) => {
          return updatedProduct._id === prevProd._id
            ? updatedProduct
            : prevProd;
        });
      });
    } catch (error) {
      if (error instanceof ZodError) {
        console.log("Zod error at edit product", error.message);
      } else {
        console.log("error message is: ", error);

        throw new Error("Failed to edit product");
      }
    }
  };

  return (
    <li className="product">
      <div className="product-details">
        <h3>{product.title}</h3>
        <p className="price">${product.price}</p>
        <p className="quantity">{product.quantity} left in stock</p>
        <div className="actions product-actions">
          <button className="add-to-cart">Add to Cart</button>
          <button
            className="edit"
            onClick={() => {
              console.log("show edit form");
              setShowEditForm(!showEditForm);
            }}
          >
            Edit
          </button>
        </div>
        <button className="delete-button" onClick={handleDelete}>
          <span>X</span>
        </button>
      </div>
      {showEditForm && (
        <EditForm
          currentProductValues={{
            _id: product._id,
            title: product.title,
            price: product.price,
            quantity: product.quantity,
          }}
          handleEdit={handleEdit}
        />
      )}
    </li>
  );
};

type ProductListingProps = {
  products: Product[];
  handleDeleteProduct: (p: string) => void;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

const ProductListing = ({
  products,
  handleDeleteProduct,
  setProducts,
}: ProductListingProps) => {
  return (
    <div className="product-listing">
      <h2>Products</h2>
      <ul className="product-list">
        {products.map((product) => {
          return (
            <EditableProduct
              key={product._id}
              product={product}
              onDeleteProduct={handleDeleteProduct}
              setProducts={setProducts}
            />
          );
        })}
      </ul>
    </div>
  );
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  // const [cartItems, setCartItems] = useState<Product[]>([]);

  const handleDeleteProduct = (id: string) => {
    setProducts((prevProducts) => {
      return prevProducts.filter((p) => p._id !== id);
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsArray = await productService.getProducts();
        setProducts(productsArray);
        console.log(
          "successfully fetched " + productsArray.length + " products"
        );
      } catch (error) {
        if (error instanceof ZodError) {
          console.log("zod error: ", error.message);
          return;
        }
        throw new Error(
          "something broke inside of our getProducts async function!"
        );
      }
    };

    fetchProducts();
    return () => {};
  }, []);

  return (
    <ErrorBoundary fallback={<Fallback />}>
      <div>
        <header>
          <h1>The Shop!</h1>
          <Cart />
        </header>
        <main>
          <ProductListing
            products={products}
            handleDeleteProduct={handleDeleteProduct}
            setProducts={setProducts}
          />
          <AddForm setProducts={setProducts} />
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
