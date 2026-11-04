import { LoaderCircle, MoreVertical } from 'lucide-react'

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function statusStyle(status) {
  return {
    Running: 'bg-[#eaf7ed] text-[#3f9560] before:bg-[#42a967]',
    Upcoming: 'bg-[#fff5dd] text-[#bd8429] before:bg-[#e3a72d]',
    Completed: 'bg-[#f0f1f2] text-[#7b8085] before:bg-[#92979c]',
  }[status] || 'bg-gray-100 text-gray-500 before:bg-gray-400'
}

export default function BatchTable({ batches, loading, error, onRetry }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#eee5dc] bg-white shadow-[0_3px_14px_rgba(74,49,32,0.03)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-[#fcf4ec] text-[11px] uppercase tracking-[0.08em] text-[#9d8a7c]">
            <tr>{['Batch Code', 'Course', 'Center', 'Start Date', 'Capacity', 'Status', 'Actions'].map((heading) => <th key={heading} className="px-5 py-4 font-semibold">{heading}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-[#f3ede8]">
            {loading && <tr><td colSpan="7" className="py-14 text-center text-[#a3958b]"><LoaderCircle className="mx-auto mb-2 animate-spin text-[#ed7543]" size={24} />Loading batches...</td></tr>}
            {!loading && error && <tr><td colSpan="7" className="py-12 text-center"><p className="mb-3 text-sm text-[#b14f3a]">{error}</p><button type="button" onClick={onRetry} className="rounded-lg bg-[#ee7543] px-4 py-2 text-sm font-semibold text-white">Retry</button></td></tr>}
            {!loading && !error && batches.length === 0 && <tr><td colSpan="7" className="py-14 text-center text-sm text-[#9b8c82]">No batches match your search or filters</td></tr>}
            {!loading && !error && batches.map((batch) => (
              <tr key={batch.batchCode} className="text-sm text-[#5b4e46]">
                <td className="px-5 py-4 font-semibold text-[#df6738]">{batch.batchCode}</td><td className="px-5 py-4">{batch.course}</td><td className="px-5 py-4">{batch.centre}</td><td className="px-5 py-4">{formatDate(batch.startDate)}</td><td className="px-5 py-4">{batch.enrolled}/{batch.maxCapacity}</td><td className="px-5 py-4"><span className={`relative inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium before:h-1.5 before:w-1.5 before:rounded-full ${statusStyle(batch.status)}`}>{batch.status}</span></td><td className="px-5 py-4 text-[#a99a90]"><MoreVertical size={18} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
