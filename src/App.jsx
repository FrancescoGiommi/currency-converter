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

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    if (currency1 === currency2) {
      setAmount2(amount1);
      return;
    }

    convert();
  }, [amount1, amount2, currency1, currency2, isAmount1Changed]);

  useEffect(() => {
    if (currency1 === currency2) return;
    fetchChartData();
  }, [currency1, currency2]);

  // Funzione esterna per valute
  async function fetchCurrencies() {
    try {
      const response = await axios.get(
        "https://api.frankfurter.app/currencies"
      );
      setCurrencies(response.data);
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  }

  // Funzione esterna per la conversione
  async function convert() {
    const amountToConvert = isAmount1Changed ? amount1 : amount2;
    const from = isAmount1Changed ? currency1 : currency2;
    const to = isAmount1Changed ? currency2 : currency1;

    try {
      const response = await axios.get("https://api.frankfurter.app/latest", {
        params: {
          amount: amountToConvert,
          from,
          to,
        },
      });
      const result = response.data.rates[to];
      isAmount1Changed ? setAmount2(result) : setAmount1(result);
    } catch (error) {
      console.error("Error converting currency:", error);
    }
  }

  // Funzione esterna per il grafico
  async function fetchChartData() {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);

    const formatDate = (date) => date.toISOString().split("T")[0];
    const fromDate = formatDate(startDate);
    const toDate = formatDate(endDate);

    try {
      const response = await axios.get(
        `https://api.frankfurter.app/${fromDate}..${toDate}`,
        {
          params: {
            from: currency1,
            to: currency2,
          },
        }
      );

      const rates = response.data.rates;
      const categories = Object.keys(rates);
      const series = categories.map((date) => rates[date][currency2]);

      setChartData({ categories, series });
    } catch (err) {
      console.error("Errore grafico:", err);
    }
  }

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
      <div className="container border  mt-5">
        <h1 className="text-center mt-5 title">CURRENCY BOOLVELTER</h1>
        <h2 className="subtitle">
          {amount1} {currency1} = {amount2} {currency2}
        </h2>
        {/* Input  */}
        <CurrencyInput
          currencies={currencies}
          amount={amount1}
          currency={currency1}
          onAmountChange={handleAmount1Change}
          onCurrencyChange={handleCurrency1Change}
          disabledCurrency={currency2}
        />
        {/* Input  */}
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
