import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([
    {
      name: "Apple iPhone 13 (128GB) - Blue",
      description: "The biggest Pro camera system upgrade ever. Super Retina XDR display with Pro - Motion for a faster, more responsive feel. Lightning-fast A15 Bionic chip. Durable design and a huge leap in battery life.",
      img: "https://m.media-amazon.com/images/I/71xb2xkN5qL._SX679_.jpg",
      price: 55999,
    },
    {
      name: "iPhone 12",
      description: "A powerful iPhone with great features.",
      img: "https://example.com/iphone12.jpg",
      price: 799,
    },
    {
      name: "iPhone SE",
      description: "A compact and affordable iPhone.",
      img: "https://example.com/iphonese.jpg",
      price: 399,
    },
    {
      name: "iPhone 11 Pro Max",
      description: "A larger iPhone with Pro capabilities.",
      img: "https://example.com/iphone11promax.jpg",
      price: 999,
    },
    {
      name: "iPhone XR",
      description: "A colorful and budget-friendly iPhone.",
      img: "https://example.com/iphonexr.jpg",
      price: 499,
    },
  ]);

  const initPayment = async (data) => {
    try {
      const response = await axios.post("https://razorpay-mern.onrender.com/api/payment/orders", {
        amount: data.amount,
      });
      const orderId = response.data.data.id;
      const options = {
        key: "rzp_test_QFIqzeKc9MdYW3",
        amount: data.amount,
        currency: data.currency,
        name: data.name, // Use product name instead of book name
        description: "Test Transaction",
        image: data.img, // Use product image instead of book image
        order_id: orderId,
        handler: async (response) => {
          try {
            const verifyUrl = "/api/payment/verify";
            const { data } = await axios.post(verifyUrl, response);
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async (product) => {
    try {
      const response = await axios.post("https://razorpay-mern.onrender.com/api/payment/orders", {
        amount: product.price,
      });
      const orderId = response.data.data.id;
      initPayment({
        amount: product.price,
        currency: "INR",
        id: orderId,
        name: product.name,
        img: product.img,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      {products.map((product, index) => (
        <div className="product_container" key={index}>
          <img src={product.img} alt={`${product.name}_img`} className="product_img" />
          <p className="product_name">{product.name}</p>
          <p className="product_description">{product.description}</p>
          <p className="product_price">
            Price : <span>&#x20B9; {product.price}</span>
          </p>
          <button onClick={() => handlePayment(product)} className="buy_btn">
            Buy Now
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
