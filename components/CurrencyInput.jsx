export default function CurrencyInput({
  currencies,
  amount,
  currency,
  onAmountChange,
  onCurrencyChange,
}) {
  return (
    <>
      <div>
        <div>
          <div className="form-control d-flex">
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => onAmountChange(e.target.value)}
            />
            <select
              className="form-select"
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value)}
              aria-label="Default select example"
            >
              {currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
