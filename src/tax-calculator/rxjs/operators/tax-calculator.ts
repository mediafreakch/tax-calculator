import {pipe, map} from 'rxjs'

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
  [1100, 0.5],
  [2200, 1],
  [2800, 2],
  [3800, 3],
  [5000, 3.25],
  [5600, 3.5],
  [5600, 4],
  [7800, 4.5],
  [11100, 5.5],
  [12900, 5.5],
  [14500, 8],
  [19500, 11.5],
  [24500, 11.75],
  [28900, 10],
  [145300, 8],
]

export function taxCalculator(year: number) {
  return pipe(map((income: number | null) => {
    let lookupToUse
    let tax = 0
    let iteration = 0

    if (!income) {
      return 0
    }

    switch (year) {
      case 2023:
        lookupToUse = taxProgressionSingleOld
        break
      default:
        lookupToUse = taxProgressionSingle2024
    }

    while (income > 0) {
      const maxTax = lookupToUse[lookupToUse.length - 1]

      if (iteration === lookupToUse.length - 1) {
        tax += income / 100 * maxTax[1]
        break
      }

      const [threshold, rate] = lookupToUse[iteration] || []
      const remaining = income - threshold
      let taxPerLevel = 0

      if (remaining >= 0) {
        taxPerLevel += threshold / 100 * rate
        tax += taxPerLevel
      } else {
        taxPerLevel += income / 100 * rate
        break
      }

      income -= threshold
      iteration++
    }

    return Number(tax.toFixed(0))
  }))
}
