import { useMemo, useState } from 'react'
import Dashboard from './components/Dashboard'
import { runSimulationBatch } from './utils/simulation'

const DEFAULT_SIMULATION_COUNT = 1000
const DEFAULT_SAMPLE_SIZE = 50

function normalizePositiveInteger(value, fallback, minimum = 1) {
  const parsedValue = Number.parseInt(value, 10)

  if (!Number.isFinite(parsedValue) || parsedValue < minimum) {
    return fallback
  }

  return parsedValue
}

function App() {
  const [simulationCount, setSimulationCount] = useState(String(DEFAULT_SIMULATION_COUNT))
  const [sampleSize, setSampleSize] = useState(String(DEFAULT_SAMPLE_SIZE))
  const [isRunning, setIsRunning] = useState(false)
  const [pValues, setPValues] = useState(() =>
    runSimulationBatch(DEFAULT_SIMULATION_COUNT, DEFAULT_SAMPLE_SIZE),
  )
  const [lastRun, setLastRun] = useState({
    simulationCount: DEFAULT_SIMULATION_COUNT,
    sampleSize: DEFAULT_SAMPLE_SIZE,
  })

  const significantRate = useMemo(() => {
    if (pValues.length === 0) {
      return 0
    }

    const significantCount = pValues.filter((pValue) => pValue < 0.05).length
    return (significantCount / pValues.length) * 100
  }, [pValues])

  const handleRunSimulation = () => {
    const nextSimulationCount = normalizePositiveInteger(
      simulationCount,
      DEFAULT_SIMULATION_COUNT,
    )
    const nextSampleSize = normalizePositiveInteger(sampleSize, DEFAULT_SAMPLE_SIZE, 2)

    setSimulationCount(String(nextSimulationCount))
    setSampleSize(String(nextSampleSize))
    setIsRunning(true)

    // Run on the next frame so the loading state renders before the simulation work starts.
    requestAnimationFrame(() => {
      const nextPValues = runSimulationBatch(nextSimulationCount, nextSampleSize)

      setPValues(nextPValues)
      setLastRun({
        simulationCount: nextSimulationCount,
        sampleSize: nextSampleSize,
      })
      setIsRunning(false)
    })
  }

  return (
    <Dashboard
      controls={{
        simulationCount,
        sampleSize,
        isRunning,
        onSimulationCountChange: setSimulationCount,
        onSampleSizeChange: setSampleSize,
        onRunSimulation: handleRunSimulation,
      }}
      insights={{
        significantRate,
        totalSimulations: pValues.length,
        sampleSize: lastRun.sampleSize,
      }}
      pValues={pValues}
      totalSimulations={lastRun.simulationCount}
    />
  )
}

export default App
