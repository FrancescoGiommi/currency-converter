import { useEffect } from "react";

import "./App.css";

function App() {
  function convert(from, to, amount) {
    fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`)
      .then((resp) => resp.json())
      .then((data) => {
        const convertedAmount = (amount * data.rates[to]).toFixed(2);
        console.log(`${amount} ${from} = ${convertedAmount} ${to}`);
      });
  }

  useEffect(() => {
    convert("USD", "EUR", 100); // esempio: 100 dollari in euro
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="text-center mt-5">CURRENCY BOOLVELTER</h1>
      </div>
    </>
  );
}

export default App;
