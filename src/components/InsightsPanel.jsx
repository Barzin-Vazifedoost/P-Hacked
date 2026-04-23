function StatCard({ label, value, hint }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-300">{hint}</p>
    </div>
  )
}

function InsightsPanel({ significantRate, totalSimulations, sampleSize }) {
  return (
    <aside className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/20">
      <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">Insights</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">Quick interpretation</h2>
      <p className="mt-3 text-sm leading-6 text-slate-300">
        Under a true null, the p-values should look roughly uniform, so only about 5% should
        fall below 0.05 by chance.
      </p>

      <div className="mt-8 space-y-4">
        <StatCard
          label="p-values < 0.05"
          value={`${significantRate.toFixed(1)}%`}
          hint="Random false positives still appear even when there is no real effect."
        />
        <StatCard
          label="Total simulations"
          value={totalSimulations.toLocaleString()}
          hint="Each simulation represents one hypothetical study with two groups."
        />
        <StatCard
          label="Sample size"
          value={sampleSize.toLocaleString()}
          hint="Larger samples make the test statistic more stable from run to run."
        />
      </div>
    </aside>
  )
}

export default InsightsPanel
