import { useEffect, useState } from "react";
import CurrecyInput from "../components/CurrecyInput";

import "./App.css";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [currecy1, setCurrecy1] = useState("EUR");
  const [currecy2, setCurrecy2] = useState("USD");

  function currecy() {
    fetch("https://api.frankfurter.dev/v1/currencies")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  function convert(from, to, amount) {
    fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`)
      .then((resp) => resp.json())
      .then((data) => {
        const convertedAmount = (amount * data.rates[to]).toFixed(2);
        console.log(`${amount} ${from} = ${convertedAmount} ${to}`);
      });
  }

  useEffect(() => {
    currecy();
    convert("USD", "EUR", 100); // esempio: 100 dollari in euro
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="text-center mt-5">CURRENCY BOOLVELTER</h1>

        <CurrecyInput />
        <CurrecyInput />
      </div>
    </>
  );
}

export default App;
