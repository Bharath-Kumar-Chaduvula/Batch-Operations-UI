import { Filter, Search } from 'lucide-react'

const centres = ['Bengaluru', 'Chennai', 'Delhi', 'Hyderabad', 'Kochi', 'Mumbai', 'Pune']

export default function FilterBar({ search, status, centre, onSearch, onStatus, onCentre }) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-[#eee5dc] bg-white p-4 shadow-[0_3px_14px_rgba(74,49,32,0.03)]">
      <div className="relative min-w-[240px] flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b6a79d]" size={17} />
        <input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search Batch Code or Course..." className="w-full rounded-xl border border-[#eee5dc] bg-[#fdfcfb] py-2.5 pl-10 pr-3 text-sm text-[#4d4038] outline-none focus:border-[#ef8a60]" />
      </div>
      <select value={status} onChange={(event) => onStatus(event.target.value)} className="rounded-xl border border-[#eee5dc] bg-[#fdfcfb] px-4 py-2.5 text-sm text-[#766960] outline-none focus:border-[#ef8a60]">
        <option value="">All Status</option><option>Running</option><option>Upcoming</option><option>Completed</option>
      </select>
      <select value={centre} onChange={(event) => onCentre(event.target.value)} className="rounded-xl border border-[#eee5dc] bg-[#fdfcfb] px-4 py-2.5 text-sm text-[#766960] outline-none focus:border-[#ef8a60]">
        <option value="">All Centres</option>{centres.map((item) => <option key={item}>{item}</option>)}
      </select>
      <button type="button" aria-label="Filter options" className="rounded-xl border border-[#eee5dc] p-2.5 text-[#9b8c82]"><Filter size={18} /></button>
    </div>
  )
}
