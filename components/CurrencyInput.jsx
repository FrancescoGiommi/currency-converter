export default function CurrencyInput({
  currencies,
  amount,
  currency,
  onAmountChange,
  onCurrencyChange,
  disabledCurrency,
}) {
  return (
    <div className="d-flex my-3">
      <input
        type="number"
        className="form-control py-4 bg-dark text-white border border-success rounded-start-2"
        value={amount}
        onChange={(e) => onAmountChange(Number(e.target.value))}
      />
      <select
        className="form-select bg-dark text-white border border-success"
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
