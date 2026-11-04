import {
  BarChart3, Building2, CircleDollarSign, GraduationCap, Headphones,
  LayoutDashboard, LogOut, Package, Users,
} from 'lucide-react'

const primaryItems = [
  ['Franchise Management', Building2, true],
  ['Student Management', GraduationCap],
  ['LMS', LayoutDashboard],
  ['Finance', CircleDollarSign],
  ['HRMS', Users],
  ['Centers', BarChart3],
]

export default function Sidebar() {
  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-[#eee5dc] bg-white px-5 py-7">
      <div className="mb-12 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f36d3d] text-lg font-bold text-white">B</div>
        <div>
          <div className="text-lg font-bold text-[#3d3029]">Batchly</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-[#a99d94]">Operations</div>
        </div>
      </div>
      <nav className="space-y-2">
        {primaryItems.map(([label, Icon, active]) => (
          <div key={label} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${active ? 'bg-[#fff0e8] text-[#e76638]' : 'text-[#8f837a]'}`}>
            <Icon size={18} strokeWidth={1.8} />
            {label}
          </div>
        ))}
        <div className="my-5 border-t border-[#f1eae4]" />
        <div className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#8f837a]"><Package size={18} strokeWidth={1.8} />Assets</div>
        <div className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#8f837a]"><Headphones size={18} strokeWidth={1.8} />Support</div>
      </nav>
      <button type="button" className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#f57c45] to-[#a93d2d] px-4 py-3 text-sm font-semibold text-white shadow-sm">
        <LogOut size={17} /> Log Out
      </button>
    </aside>
  )
}
