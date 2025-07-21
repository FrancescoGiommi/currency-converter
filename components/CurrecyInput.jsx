export default function CurrecyInput() {
  return (
    <>
      <div>
        <div>
          <div className="form-control d-flex">
            <input type="text" className="form-control" />
            <select className="form-select" aria-label="Default select example">
              <option defaultValue>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
