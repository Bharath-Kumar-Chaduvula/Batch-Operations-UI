import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function PaginationFooter({ page, limit, totalRecords, totalPages, onPageChange }) {
  const first = totalRecords === 0 ? 0 : (page - 1) * limit + 1
  const last = Math.min(page * limit, totalRecords)
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#f0e8e1] px-5 py-4 text-sm text-[#9b8c82]">
      <span>Showing {first}{totalRecords ? `–${last}` : ''} of {totalRecords} Batches</span>
      <div className="flex items-center gap-1">
        <button type="button" disabled={page === 1} onClick={() => onPageChange(page - 1)} className="rounded-lg p-2 hover:bg-[#fff0e8] disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft size={17} /></button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
          <button type="button" key={number} onClick={() => onPageChange(number)} className={`h-8 min-w-8 rounded-lg px-2 text-sm ${number === page ? 'bg-[#ee7543] font-semibold text-white' : 'hover:bg-[#fff0e8]'}`}>{number}</button>
        ))}
        <button type="button" disabled={page >= totalPages || totalPages === 0} onClick={() => onPageChange(page + 1)} className="rounded-lg p-2 hover:bg-[#fff0e8] disabled:cursor-not-allowed disabled:opacity-40"><ChevronRight size={17} /></button>
      </div>
    </div>
  )
}
