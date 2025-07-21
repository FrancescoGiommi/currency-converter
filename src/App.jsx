import { useEffect, useState } from "react";
import CurrencyInput from "../components/CurrencyInput";

import "./App.css";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [currency1, setCurrency1] = useState("EUR");
  const [currency2, setCurrency2] = useState("USD");

  function currency() {
    fetch("https://api.frankfurter.dev/v1/currencies")
      .then((res) => res.json())
      .then((data) => {
        // Trasformo l'oggetto in un array
        const currencyList = Object.keys(data);
        setCurrencies(currencyList);
        console.log(currencyList);
      });
  }

  function convert(from, to, amount) {
    fetch(
      `https://api.frankfurter.dev/v1/latest?${amount}=${amount1}&${from}=${currency1}&${to}=${currency2}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setAmount2(data.rates[currency2]);
      });
  }

  useEffect(() => {
    currency();
    convert("USD", "EUR", 100); // esempio: 100 dollari in euro
  }, [amount1, currency1, currency2]);

  return (
    <>
      <div className="container">
        <h1 className="text-center mt-5">CURRENCY BOOLVELTER</h1>

        <CurrencyInput
          currencies={currencies}
          amount={amount1}
          currency={currency1}
          onAmountChange={setAmount1}
          onCurrencyChange={setCurrency1}
        />
        <CurrencyInput
          currencies={currencies}
          amount={amount2}
          currency={currency2}
          onAmountChange={setAmount2}
          onCurrencyChange={setCurrency2}
        />
      </div>
    </>
  );
}

export default App;
