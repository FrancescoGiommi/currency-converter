import { useEffect, useState } from "react";
import axios from "axios";

import CurrencyInput from "../components/CurrencyInput";
import ExchangeChart from "../components/ExchangeChart";
import "./App.css";

function App() {
  const [currencies, setCurrencies] = useState({});
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(0);
  const [currency1, setCurrency1] = useState("EUR");
  const [currency2, setCurrency2] = useState("USD");
  const [isAmount1Changed, setIsAmount1Changed] = useState(true);
  const [chartData, setChartData] = useState({
    categories: [],
    series: [],
  });

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

  useEffect(() => {
    if (currency1 === currency2) return;

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30); // ultimi 30 giorni

    const formatDate = (date) => date.toISOString().split("T")[0];
    const fromDate = formatDate(startDate);
    const toDate = formatDate(endDate);

    axios
      .get(`https://api.frankfurter.app/${fromDate}..${toDate}`, {
        params: {
          from: currency1,
          to: currency2,
        },
      })
      .then((res) => {
        const data = res.data.rates;
        const categories = Object.keys(data);
        const series = categories.map((date) => data[date][currency2]);

        setChartData({ categories, series });
      })
      .catch((err) => console.error("Errore grafico:", err));
  }, [currency1, currency2]);

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
    <>
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
        {currency1 !== currency2 && chartData.series.length > 0 && (
          <ExchangeChart
            categories={chartData.categories}
            series={chartData.series}
          />
        )}
      </div>
    </>
  );
}

export default App;
