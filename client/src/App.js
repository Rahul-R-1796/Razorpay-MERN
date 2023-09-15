


import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [book, setBook] = useState(
                                    {
      name: "iPhone 13 Pro",
      description: "The latest iPhone with Pro features.",
      img: "https://example.com/iphone13pro.jpg",
      price: 1099,
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
    } 
    );

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
        name: book.name,
        description: "Test Transaction",
        image: book.img,
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

  const handlePayment = async () => {
    try {
      const response = await axios.post("https://razorpay-mern.onrender.com/api/payment/orders", {
        amount: book.price,
      });
      const orderId = response.data.data.id;
      initPayment({ amount: book.price, currency: "INR", id: orderId });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div className="book_container">
        <img src={book.img} alt="book_img" className="book_img" />
        <p className="book_name">{book.name}</p>
        <p className="book_description">description: {book.description}</p>
        <p className="book_price">
          Price : <span>&#x20B9; {book.price}</span>
        </p>
        <button onClick={handlePayment} className="buy_btn">
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default App;
