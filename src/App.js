import './App.css';
import {useCallback, useMemo, useState} from "react";

const taxProgressionSingle2024 = [
  [1100, 0.475],
  [2200, 0.95],
  [2700, 1.9],
  [3700, 2.85],
  [4900, 3.0875],
  [5500, 3.325],
  [5500, 3.8],
  [7600, 4.275],
  [10900, 5.225],
  [12600, 5.225],
  [14200, 7.6],
  [19100, 10.925],
  [24000, 11.1625],
  [28400, 9.5],
  [142400, 7.6],
]

const taxProgressionSingleOld = [
  [1100,0.5],
  [2200,1],
  [2700,2],
  [3700,3],
  [4800,3.25],
  [5400, 3.5],
  [5400,4],
  [7500,4.5],
  [10800,5.5],
  [12400,5.5],
  [14000,8],
  [18900,11.5],
  [23700,11.75],
  [28000,10],
  [140600,8],
]

const calculateTax = (year, income) => {
  let lookupToUse
  let tax = 0
  let iteration = 0

  switch(year) {
    case 2023:
      lookupToUse = taxProgressionSingleOld
      break
    default:
      lookupToUse = taxProgressionSingle2024
  }

  while (income > 0) {
    const [threshold, rate] = lookupToUse[iteration] || []
    const toTax = income - threshold

    if (iteration === lookupToUse.length - 1) {
      tax += income / 100 * lookupToUse[iteration][1]
    }

    if (toTax > 0 && iteration < lookupToUse.length - 1) {
      tax += toTax / 100 * rate
    } else {
      tax += income / 100 * rate
      break
    }

    income -= toTax
    iteration++
  }

  return tax
}

function App() {
  const [income, setIncome] = useState(null)

  const onChange = useCallback((e) => {
    setIncome(Number(e.target.value))
  }, [])

  const tax2023 = useMemo(() => {
    return income ? calculateTax(2023, income) : 0
  }, [income])

  const tax2024 = useMemo(() => {
    return income ? calculateTax(2024, income) : 0
  }, [income])

  return (
    <div className="App">
      <input type="number" onChange={onChange} />
      <div>
        <span>Your taxes 2024:</span>
        <span>
          {tax2024}
        </span>
      </div>
      <div>
        <span>Your taxes 2023:</span>
        <span>
          {tax2023}
        </span>
      </div>
    </div>
  );
}

export default App;
