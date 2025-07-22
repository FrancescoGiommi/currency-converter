export default function CurrencyInput({
  currencies,
  amount,
  currency,
  onAmountChange,
  onCurrencyChange,
  disabledCurrency,
}) {
  return (
    <div className="form-control d-flex my-3">
      <input
        type="number"
        className="form-control"
        value={amount}
        onChange={(e) => onAmountChange(Number(e.target.value))}
      />
      <select
        className="form-select"
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value)}
      >
        {Object.entries(currencies).map(([code, name]) => (
          <option key={code} value={code} disabled={code === disabledCurrency}>
            {code} - {name}
          </option>
        ))}
      </select>
    </div>
  );
}
