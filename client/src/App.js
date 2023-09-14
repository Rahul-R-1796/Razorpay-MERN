import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([
    {
      name: "World's Greatest Pack for Personal Growth and Wealth (Set of 4 Books)",
      author: "by Dale Carnegie, Napoleon Hill, et al. | 1 August 2019",
      img: "https://m.media-amazon.com/images/I/71frknp-CWL._AC_UY218_.jpg",
      price: 325,
    },
    {
      name: "To Kill a Mockingbird",
      author: "by Harper Lee | 11 July 1960",
      img: "https://m.media-amazon.com/images/I/51PLj80Oz-L._AC_UY218_.jpg",
      price: 280,
    },
    {
      name: "The Great Gatsby",
      author: "by F. Scott Fitzgerald | 10 April 1925",
      img: "https://m.media-amazon.com/images/I/81Yb-JC5VdL._AC_UY218_.jpg",
      price: 220,
    },
    {
      name: "Pride and Prejudice",
      author: "by Jane Austen | 28 January 1813",
      img: "https://m.media-amazon.com/images/I/81hSNh6jxjL._AC_UY218_.jpg",
      price: 200,
    },
  ]);

  const initPayment = async (data) => {
    try {
      const response = await axios.post("/api/payment/orders", {
        amount: data.amount,
      });
      const orderId = response.data.data.id;
      const options = {
        key: "rzp_test_QFIqzeKc9MdYW3",
        amount: data.amount,
        currency: data.currency,
        name: data.name, // Use data.name to get the book name
        description: "Test Transaction",
        image: data.img, // Use data.img to get the book image
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

  const handlePayment = async (book) => { // Pass the selected book as a parameter
    try {
      const response = await axios.post("/api/payment/orders", {
        amount: book.price,
      });
      const orderId = response.data.data.id;
      initPayment({ amount: book.price, currency: "INR", name: book.name, img: book.img, id: orderId });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      {books.map((book, index) => (
        <div className="book_container" key={index}>
          <img src={book.img} alt={`book_img_${index}`} className="book_img" />
          <p className="book_name">{book.name}</p>
          <p className="book_author">{book.author}</p>
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
