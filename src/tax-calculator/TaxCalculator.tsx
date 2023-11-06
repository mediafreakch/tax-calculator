import {of} from "rxjs";
import {ChangeEvent, useCallback, useEffect, useState} from "react";

import About from "./components/about/About";
import Row from "./components/row/Row";
import {taxCalculator} from "./rxjs/operators/tax-calculator";

import './styles/tax-calculator.scss'

const TaxCalculator = () => {
  const [income, setIncome] = useState<number | null>(null)
  const [tax2023, setTax2023] = useState<number>(0)
  const [tax2024, setTax2024] = useState<number>(0)

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIncome(Number(e.target.value))
  }, [])

  useEffect(() => {
    const sub$ = of(income).pipe(taxCalculator(2023)).subscribe(v => setTax2023(v))
    return () => sub$.unsubscribe()
  }, [income])

  useEffect(() => {
    const sub$ = of(income).pipe(taxCalculator(2024)).subscribe(v => setTax2024(v))
    return () => sub$.unsubscribe()
  }, [income])

  return (
    <div className="tax-calculator">
      <About/>
      <div className="calculator">
        <input type="number" onChange={onChange} placeholder="Income"/>
        <Row label="Your taxes 2023" value={tax2023}/>
        <Row label="Your taxes 2024" value={tax2024}/>
        <Row label="Savings" value={Number(tax2023 - tax2024).toFixed(0)}/>
      </div>
    </div>
  )
}

export default TaxCalculator
