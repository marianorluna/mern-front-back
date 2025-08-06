import { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/products`)
      .then((res) => res.json())
      //.then((data) => console.log(data))
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "10px", marginBottom: "0" }}>
        Products
      </h1>
      {/* Products form */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const name = e.target.name.value;
          const price = e.target.price.value;
          const description = e.target.description.value;

          const res = await fetch(`${BACKEND_URL}/products`, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ name, price, description }),
          });
          const data = await res.json();
          console.log(data);
          setProducts([...products, data]);
          e.target.reset();
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "10px",
        }}
      >
        <input
          style={{ padding: "10px" }}
          type="text"
          name="name"
          placeholder="Name"
        />
        <input
          style={{ padding: "10px" }}
          type="text"
          name="price"
          placeholder="Price"
        />
        <input
          style={{ padding: "10px" }}
          type="text"
          name="description"
          placeholder="Description"
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Product
        </button>
      </form>
      <hr style={{ margin: "10px", marginBottom: "20px" }} />
      {/* Products list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          flexWrap: "wrap",
        }}
      >
        {products.map((product) => {
          return (
            <div
              key={product._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  width: "100%",
                  justifyContent: "space-between",
                  paddingRight: "10px",
                }}
              >
                <h2 style={{ margin: "0" }}>{product.name}</h2>
                <p style={{ margin: "0" }}>{`Price:  € ${product.price}.-`}</p>
                <p style={{ margin: "0" }}>{product.description}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <button
                  onClick={async () => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this product?"
                      )
                    ) {
                      await fetch(
                        `${BACKEND_URL}/products/${product._id}`,
                        {
                          method: "DELETE",
                        }
                      );
                    } else {
                      return;
                    }
                    setProducts(products.filter((p) => p._id !== product._id));
                  }}
                  style={{
                    backgroundColor: "#f44336",
                    color: "#fff",
                    padding: "10px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    const name = prompt("Enter new name") || product.name;
                    const price = prompt("Enter new price") || product.price;
                    const description =
                      prompt("Enter new description") || product.description;
                    fetch(`${BACKEND_URL}/products/${product._id}`, {
                      headers: {
                        "Content-Type": "application/json",
                      },
                      method: "PUT",
                      body: JSON.stringify({ name, price, description }),
                    }).then(() => {
                      setProducts(
                        products.map((p) => {
                          if (p._id === product._id) {
                            return { ...p, name, price, description };
                          }
                          return p;
                        })
                      );
                    });
                  }}
                  style={{
                    backgroundColor: "#4c5bafff",
                    color: "#fff",
                    padding: "10px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    if (
                      window.confirm(
                        "Are you sure you want to duplicate this product?"
                      )
                    ) {
                      const res = await fetch(
                        `${BACKEND_URL}/products`,
                        {
                          headers: {
                            "Content-Type": "application/json",
                          },
                          method: "POST",
                          body: JSON.stringify({
                            name: product.name,
                            price: product.price,
                            description: product.description,
                          }),
                        }
                      );
                      const data = await res.json();
                      setProducts([...products, data]);
                    } else {
                      return;
                    }
                  }}
                  style={{
                    backgroundColor: "#cf9140ff",
                    color: "#fff",
                    padding: "10px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Duplicate
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
