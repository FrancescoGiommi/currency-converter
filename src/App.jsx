import { useEffect, useState } from "react";
import axios from "axios";
import CurrencyInput from "../components/CurrencyInput";

import "./App.css";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [currency1, setCurrency1] = useState("EUR");
  const [currency2, setCurrency2] = useState("USD");

  function currency() {
    axios
      .get("https://api.frankfurter.dev/v1/currencies")
      .then((res) => {
        // Trasformo l'oggetto in un array
        const currencyList = Object.keys(res.data);
        setCurrencies(currencyList);
        console.log(currencyList);
      })
      .catch((error) => {
        console.error("Error fetching currencies:", error);
      });
  }

  function convert(from, to, amount) {
    if (from === to) {
      setAmount2(amount);
      return;
    }
    axios
      .get(`https://api.frankfurter.dev/v1/latest`, {
        params: {
          amount: amount,
          from: from,
          to: to,
        },
      })
      .then((response) => {
        setAmount2(response.data.rates[to]);
      })
      .catch((error) => {
        console.error("Error converting currency:", error);
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
