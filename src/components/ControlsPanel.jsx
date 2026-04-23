function ControlsPanel({
  simulationCount,
  sampleSize,
  isRunning,
  onSimulationCountChange,
  onSampleSizeChange,
  onRunSimulation,
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/20">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">
          Controls
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Simulation setup</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Adjust the scale of the experiment and run a fresh batch of synthetic studies.
        </p>
      </div>

      <div className="mt-8 space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-200">Number of simulations</span>
          <input
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-base text-white outline-none transition focus:border-cyan-400"
            type="number"
            min="1"
            step="1"
            value={simulationCount}
            onChange={(event) => onSimulationCountChange(event.target.value)}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-200">Sample size per group</span>
          <input
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-base text-white outline-none transition focus:border-cyan-400"
            type="number"
            min="2"
            step="1"
            value={sampleSize}
            onChange={(event) => onSampleSizeChange(event.target.value)}
          />
        </label>
      </div>

      <button
        className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-cyan-400 px-4 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-cyan-400/60"
        type="button"
        onClick={onRunSimulation}
        disabled={isRunning}
      >
        {isRunning ? 'Running…' : 'Run Simulation'}
      </button>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300">
        <p className="font-medium text-white">What the simulation does</p>
        <ul className="mt-3 space-y-2">
          <li>• Draws two independent normal samples with the same true mean.</li>
          <li>• Computes a two-sample test statistic for every synthetic study.</li>
          <li>• Collects the resulting p-values so the histogram can be compared with 0.05.</li>
        </ul>
      </div>
    </section>
  )
}

export default ControlsPanel
