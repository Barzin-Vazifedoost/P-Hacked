const HISTOGRAM_BIN_COUNT = 20
const MAX_BINNED_P_VALUE = 0.999999

function boxMullerRandom() {
  let u1 = 0
  let u2 = 0

  while (u1 === 0) {
    u1 = Math.random()
  }

  while (u2 === 0) {
    u2 = Math.random()
  }

  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
}

export function generateNormalSample(size, mean = 0, standardDeviation = 1) {
  return Array.from({ length: size }, () => boxMullerRandom() * standardDeviation + mean)
}

function getMean(values) {
  const total = values.reduce((sum, value) => sum + value, 0)
  return total / values.length
}

function getSampleVariance(values, mean) {
  const squaredDistance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0)
  return squaredDistance / (values.length - 1)
}

function erf(value) {
  const sign = Math.sign(value)
  const absoluteValue = Math.abs(value)
  const a1 = 0.254829592
  const a2 = -0.284496736
  const a3 = 1.421413741
  const a4 = -1.453152027
  const a5 = 1.061405429
  const p = 0.3275911
  const t = 1 / (1 + p * absoluteValue)
  const polynomial =
    (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t)

  return sign * (1 - polynomial * Math.exp(-absoluteValue * absoluteValue))
}

function normalCdf(value) {
  return 0.5 * (1 + erf(value / Math.sqrt(2)))
}

export function calculateTwoSamplePValue(sampleA, sampleB) {
  const meanA = getMean(sampleA)
  const meanB = getMean(sampleB)
  const varianceA = getSampleVariance(sampleA, meanA)
  const varianceB = getSampleVariance(sampleB, meanB)
  const standardError = Math.sqrt(varianceA / sampleA.length + varianceB / sampleB.length)

  if (standardError === 0) {
    return 1
  }

  const testStatistic = (meanA - meanB) / standardError

  // With moderate sample sizes, the normal approximation is a simple stand-in for the t CDF.
  return Math.max(0, Math.min(1, 2 * (1 - normalCdf(Math.abs(testStatistic)))))
}

export function runSimulationBatch(simulationCount, sampleSize) {
  return Array.from({ length: simulationCount }, () => {
    // Both groups come from the same distribution, so any small p-value is a false positive.
    const groupA = generateNormalSample(sampleSize)
    const groupB = generateNormalSample(sampleSize)

    return calculateTwoSamplePValue(groupA, groupB)
  })
}

export function buildHistogramData(pValues, binCount = HISTOGRAM_BIN_COUNT) {
  const binWidth = 1 / binCount
  const bins = Array.from({ length: binCount }, (_, index) => {
    const rangeStart = (index * binWidth).toFixed(2)
    const rangeEnd = ((index + 1) * binWidth).toFixed(2)

    return {
      label: rangeEnd,
      rangeStart,
      rangeEnd,
      count: 0,
    }
  })

  pValues.forEach((pValue) => {
    // Keep a p-value of exactly 1.0 inside the final histogram bucket after flooring.
    const safeValue = Math.min(Math.max(pValue, 0), MAX_BINNED_P_VALUE)
    const binIndex = Math.min(Math.floor(safeValue / binWidth), binCount - 1)
    bins[binIndex].count += 1
  })

  return bins
}
