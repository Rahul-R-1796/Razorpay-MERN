import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([
    {
      name: "Apple iPhone 13 (256GB)",
      description: "The latest iPhone with Pro features.",
      img: "https://m.media-amazon.com/images/I/315oQlfQ6WL._SY445_SX342_QL70_FMwebp_.jpg",
      price: 64999,
    },
    {
      name: "Apple iPhone 12 (256GB)",
      description: "A powerful iPhone with great features.",
      img: "https://m.media-amazon.com/images/I/71ZOtNdaZCL._SX679_.jpg",
      price: 65999,
    },

    {
      name: "Apple iPhone 14 (128 GB)",
      description: "A larger iPhone with Pro capabilities.",
      img: "https://m.media-amazon.com/images/I/31MX9scnEzL._SY445_SX342_QL70_FMwebp_.jpg",
      price: 119999,
    }
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
        name: data.name,
        description: "Test Transaction",
        image: data.img,
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

  const handlePayment = async (book) => {
    try {
      const response = await axios.post("https://razorpay-mern.onrender.com/api/payment/orders", {
        amount: book.price,
      });
      const orderId = response.data.data.id;
      initPayment({ amount: book.price, currency: "INR", id: orderId, name: book.name, img: book.img });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      {books.map((book, index) => (
        <div className="book_container" key={index}>
          <img src={book.img} alt="book_img" className="book_img" />
          <p className="book_name">{book.name}</p>
          <p className="book_description">Description: {book.description}</p>
          <p className="book_price">
            Price : <span>&#x20B9; {book.price}</span>
          </p>
          <button onClick={() => handlePayment(book)} className="buy_btn">
            Buy Now
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
