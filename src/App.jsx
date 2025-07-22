import { useEffect, useState } from "react";
import axios from "axios";
import CurrencyInput from "../components/CurrencyInput";
import "./App.css";

function App() {
  const [currencies, setCurrencies] = useState({});
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(0);
  const [currency1, setCurrency1] = useState("EUR");
  const [currency2, setCurrency2] = useState("USD");
  const [isAmount1Changed, setIsAmount1Changed] = useState(true); // 👈

  // Carica valute una sola volta
  useEffect(() => {
    axios
      .get("https://api.frankfurter.app/currencies")
      .then((res) => setCurrencies(res.data))
      .catch((error) => console.error("Error fetching currencies:", error));
  }, []);

  // Conversione automatica
  useEffect(() => {
    if (currency1 === currency2) {
      setAmount2(amount1);
      return;
    }

    const amountToConvert = isAmount1Changed ? amount1 : amount2;
    const from = isAmount1Changed ? currency1 : currency2;
    const to = isAmount1Changed ? currency2 : currency1;

    axios
      .get("https://api.frankfurter.app/latest", {
        params: {
          amount: amountToConvert,
          from,
          to,
        },
      })
      .then((res) => {
        const result = res.data.rates[to];
        isAmount1Changed ? setAmount2(result) : setAmount1(result);
      })
      .catch((error) => console.error("Error converting:", error));
  }, [amount1, amount2, currency1, currency2, isAmount1Changed]);

  // Handlers per input 1 e 2
  function handleAmount1Change(amount) {
    setAmount1(amount);
    setIsAmount1Changed(true);
  }

  function handleCurrency1Change(currency) {
    setCurrency1(currency);
  }

  function handleAmount2Change(amount) {
    setAmount2(amount);
    setIsAmount1Changed(false);
  }

  function handleCurrency2Change(currency) {
    setCurrency2(currency);
  }

  return (
    <div className="container">
      <h1 className="text-center mt-5">CURRENCY BOOLVELTER</h1>
      <h2>
        {amount1} {currency1} = {amount2} {currency2}
      </h2>

      <CurrencyInput
        currencies={currencies}
        amount={amount1}
        currency={currency1}
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
        disabledCurrency={currency2}
      />
      <CurrencyInput
        currencies={currencies}
        amount={amount2}
        currency={currency2}
        onAmountChange={handleAmount2Change}
        onCurrencyChange={handleCurrency2Change}
        disabledCurrency={currency1}
      />
    </div>
  );
}

export default App;
