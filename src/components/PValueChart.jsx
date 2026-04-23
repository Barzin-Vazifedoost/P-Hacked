import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { buildHistogramData } from '../utils/simulation'

function PValueChart({ pValues }) {
  const histogramData = useMemo(() => buildHistogramData(pValues), [pValues])

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/20">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">
            Visualization
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">P-value histogram</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            The first bar captures p-values below 0.05. The red guide marks the conventional
            significance threshold used in many studies.
          </p>
        </div>
      </div>

      <div className="mt-8 h-[380px] w-full rounded-2xl border border-white/10 bg-slate-950/60 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={histogramData}
            margin={{ top: 12, right: 18, left: 0, bottom: 8 }}
            barCategoryGap={2}
          >
            <CartesianGrid stroke="rgba(148, 163, 184, 0.14)" vertical={false} />
            <XAxis
              dataKey="label"
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
              interval={1}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              allowDecimals={false}
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: 'rgba(148, 163, 184, 0.08)' }}
              contentStyle={{
                backgroundColor: '#020617',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '16px',
                color: '#e2e8f0',
              }}
              formatter={(value) => [value, 'Studies']}
              labelFormatter={(_, payload) => {
                const bin = payload?.[0]?.payload
                return bin ? `${bin.rangeStart} – ${bin.rangeEnd}` : 'P-value range'
              }}
            />
            <ReferenceLine
              x="0.05"
              stroke="#f87171"
              strokeDasharray="6 6"
              label={{
                value: 'p = 0.05',
                fill: '#fca5a5',
                position: 'insideTopRight',
                fontSize: 12,
              }}
            />
            <Bar dataKey="count" radius={[10, 10, 0, 0]}>
              {histogramData.map((bin) => (
                <Cell
                  key={bin.label}
                  fill={bin.rangeStart === '0.00' ? '#22d3ee' : '#60a5fa'}
                  fillOpacity={bin.rangeStart === '0.00' ? 1 : 0.72}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default PValueChart
