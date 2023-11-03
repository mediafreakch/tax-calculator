import './App.css';
import {ChangeEvent, useCallback, useMemo, useState} from "react";
import {of} from "rxjs";
import {taxCalculator} from "./utils/taxCalculator";

function App() {
  const [income, setIncome] = useState<number | null>(null)
  const [tax2023, setTax2023] = useState<number>(0)
  const [tax2024, setTax2024] = useState<number>(0)

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIncome(Number(e.target.value))
  }, [])

  const tax2023$ = useMemo(() => {
    return of(income).pipe(taxCalculator(2023)).subscribe(v => setTax2023(v))
  }, [income])

  const tax2024$ = useMemo(() => {
    return of(income).pipe(taxCalculator(2024)).subscribe(v => setTax2024(v))
  }, [income])

  return (
    <div className="app">
      <h1>Tax Comparison</h1>
      <h2>2023/2024 Canton Zug</h2>
      <p>Calculator will show how much you would save based on the new tax rates that the public votes about in November 2023.</p>
      <div className="calculator">
        <input type="number" onChange={onChange} placeholder="Income"/>
        <div className="summary">
          <div className="taxes">
            <span className="label">Your taxes 2023:</span>
            <span>
            {tax2023}
          </span>
          </div>
        </div>
        <div className="summary">
          <div className="taxes">
            <span className="label">Your taxes 2024:</span>
            <span>
            {tax2024}
          </span>
          </div>
        </div>
        <div className="summary">
          <div className="taxes">
            <span className="label">Savings</span>
            <span>
            {Number(tax2023 - tax2024).toFixed(0)}
          </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
