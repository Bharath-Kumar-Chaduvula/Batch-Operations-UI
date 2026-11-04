import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { fetchBatches } from '../services/batchService'
import FilterBar from '../components/FilterBar'
import BatchTable from '../components/BatchTable'
import PaginationFooter from '../components/PaginationFooter'

const PAGE_SIZE = 5

export default function BatchOperationsPage() {
  const [batches, setBatches] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: PAGE_SIZE, totalRecords: 0, totalPages: 0 })
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [centre, setCentre] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    fetchBatches({ page, limit: PAGE_SIZE, search, status, centre })
      .then((result) => {
        if (!active) return
        setBatches(result.data)
        setPagination(result.pagination)
      })
      .catch(() => {
        if (active) setError('Unable to load batches. Please check that the backend is running.')
      })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [page, search, status, centre, retryKey])

  const updateFilter = (setter) => (value) => { setter(value); setPage(1) }

  return (
    <main className="min-w-0 flex-1 px-6 py-8 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div><p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#c5b5aa]">Workspace</p><h1 className="text-3xl font-bold tracking-tight text-[#3c3029]">Batch Operations</h1></div>
          <button type="button" className="flex items-center gap-2 rounded-xl border border-[#eb7543] px-4 py-2.5 text-sm font-semibold text-[#e56d3d] hover:bg-[#fff0e8]"><Plus size={17} /> Create Batch</button>
        </header>
        <FilterBar search={search} status={status} centre={centre} onSearch={updateFilter(setSearch)} onStatus={updateFilter(setStatus)} onCentre={updateFilter(setCentre)} />
        <BatchTable batches={batches} loading={loading} error={error} onRetry={() => setRetryKey((current) => current + 1)} />
        <PaginationFooter {...pagination} page={page} onPageChange={setPage} />
      </div>
    </main>
  )
}
