import ControlsPanel from './ControlsPanel'
import InsightsPanel from './InsightsPanel'
import PValueChart from './PValueChart'

function Dashboard({ controls, insights, pValues, totalSimulations }) {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 shadow-2xl shadow-black/20 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">P-Hacked</p>
          <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Explore how often random noise looks statistically significant
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
                This dashboard simulates repeated null-hypothesis experiments, then charts the
                resulting p-values so you can see how the 0.05 cutoff behaves in practice.
              </p>
            </div>
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
              <p className="font-medium">Current run</p>
              <p className="mt-1 text-cyan-100/80">{totalSimulations.toLocaleString()} simulations</p>
            </div>
          </div>
        </header>

        <section className="grid flex-1 gap-6 xl:grid-cols-[19rem_minmax(0,1fr)_18rem]">
          <ControlsPanel {...controls} />
          <PValueChart pValues={pValues} />
          <InsightsPanel {...insights} />
        </section>
      </div>
    </main>
  )
}

export default Dashboard
