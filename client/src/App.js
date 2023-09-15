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
      name: "Apple iPhone 12 (256GB) - Purple",
      description: "5G speed. A14 Bionic, the fastest chip in a smartphone. An edge-to-edge OLED display. Ceramic Shield with four times better drop performance. And Night mode on every camera.",
      img: "https://m.media-amazon.com/images/I/71hIfcIPyxS._SX679_.jpg",
      price: 65999,
    },
    {
      name: "Apple iPhone SE (Black, 64 GB) (Includes EarPods, Power Adapter)",
      description: "The iPhone SE (2nd generation) features a 4.7-inch Retina HD display, powered by the A13 Bionic chip for fast performance. It has a 12-megapixel camera, supports Touch ID for biometric security, and comes in storage options of 64GB, 128GB, and 256GB, offering a compact design similar to the iPhone 8 with the power of newer internals.",
      img: "https://rukminim2.flixcart.com/image/416/416/k9loccw0/mobile/p/z/q/apple-iphone-se-mxd02hn-a-original-imafrcpjyscxm8fv.jpeg?q=70",
      price: 28990,
    },
    {
      name: "APPLE iPhone 11 Pro Max (Gold, 64 GB)",
      description: "The Apple iPhone 11 Pro Max in Gold with 64 GB of storage boasts a stunning Super Retina XDR display, a powerful A13 Bionic chip for exceptional performance, and a versatile triple-lens camera system for capturing high-quality photos and videos. Its elegant design, Face ID for security, and long-lasting battery life make it a top-tier smartphone choice.",
      img: "https://rukminim2.flixcart.com/image/416/416/k2jbyq80pkrrdj/mobile-refurbished/e/b/u/iphone-11-pro-max-64-a-mwhg2hn-a-apple-0-original-imafkg2fg3evmhuy.jpeg?q=70",
      price: 95699,
    },
    {
      name: "Apple iPhone XR (Black, 128 GB) (Includes EarPods, Power Adapter)",
      description: "The Apple iPhone XR in Black with 128GB of storage includes EarPods and a power adapter. It offers a sleek design, a vibrant Liquid Retina display, and reliable performance for an enhanced mobile experience.",
      img: "https://rukminim2.flixcart.com/image/416/416/jnj7iq80/mobile/u/b/g/apple-iphone-xr-mryj2hn-a-original-imafa6zkm7qhv2zd.jpeg?q=70",
      price: 41699,
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
