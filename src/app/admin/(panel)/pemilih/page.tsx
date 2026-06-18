"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Download,
  Filter,
  CheckCircle2,
  XCircle,
  UserCheck,
  UserX,
  Upload,
  AlertCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VoterData {
  id: string;
  name: string;
  nis: string;
  className: string;
  status: "voted" | "pending";
  votedAt?: string;
  registeredAt: string;
}

const mockVoters: VoterData[] = [
  {
    id: "uuid-1",
    name: "Ahmad Rizki Pratama",
    nis: "2024001",
    className: "X.PPLG-1",
    status: "voted",
    votedAt: "2026-06-18 08:23",
    registeredAt: "2026-06-01",
  },
  {
    id: "uuid-2",
    name: "Siti Nurhaliza",
    nis: "2024002",
    className: "X.PPLG-1",
    status: "voted",
    votedAt: "2026-06-18 09:15",
    registeredAt: "2026-06-01",
  },
  {
    id: "uuid-3",
    name: "Budi Santoso",
    nis: "2024003",
    className: "X.PPLG-1",
    status: "pending",
    registeredAt: "2026-06-01",
  },
  {
    id: "uuid-4",
    name: "Dewi Lestari",
    nis: "2024004",
    className: "X.PPLG-2",
    status: "voted",
    votedAt: "2026-06-18 10:05",
    registeredAt: "2026-06-01",
  },
  {
    id: "uuid-5",
    name: "Eko Prasetyo",
    nis: "2024005",
    className: "X.PPLG-2",
    status: "pending",
    registeredAt: "2026-06-01",
  },
  {
    id: "uuid-6",
    name: "Fitri Handayani",
    nis: "2024006",
    className: "X.DKV-1",
    status: "voted",
    votedAt: "2026-06-18 11:30",
    registeredAt: "2026-06-01",
  },
];

export default function DaftarPemilihPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterClass, setFilterClass] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredVoters = mockVoters.filter((voter) => {
    const matchSearch =
      voter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      voter.nis.includes(searchQuery);
    const matchClass =
      filterClass === "all" || voter.className === filterClass;
    const matchStatus =
      filterStatus === "all" || voter.status === filterStatus;
    return matchSearch && matchClass && matchStatus;
  });

  const totalVoters = mockVoters.length;
  const votedCount = mockVoters.filter((v) => v.status === "voted").length;
  const pendingCount = mockVoters.filter((v) => v.status === "pending").length;
  const turnoutPercentage = ((votedCount / totalVoters) * 100).toFixed(1);

  const classes = [
    ...new Set(mockVoters.map((v) => v.className)),
  ].sort();

  return (
    <main className="pt-20 md:pt-8 px-4 md:px-8 pb-24 md:pb-8 w-full grow">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Daftar Pemilih
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manajemen data siswa yang berhak memilih dalam pemilihan OSIS.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-5 py-2.5 rounded-xl font-medium transition-all active:scale-[0.98]">
            <Upload className="w-5 h-5" />
            Import
          </button>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all active:scale-[0.98] shadow-md shadow-blue-500/20"
          >
            <Plus className="w-5 h-5" />
            Tambah Pemilih
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-slate-500">
              Total Pemilih
            </h3>
            <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">
              {totalVoters}
            </span>
            <span className="text-xs text-slate-500">siswa</span>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-slate-500">Sudah Memilih</h3>
            <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-emerald-600">
              {votedCount}
            </span>
            <span className="text-xs text-slate-500">
              ({turnoutPercentage}%)
            </span>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-slate-500">Belum Memilih</h3>
            <div className="bg-amber-50 p-2 rounded-lg text-amber-600">
              <UserX className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-amber-600">
              {pendingCount}
            </span>
            <span className="text-xs text-slate-500">siswa</span>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-slate-500">Partisipasi</h3>
            <div className="bg-purple-50 p-2 rounded-lg text-purple-600">
              <Filter className="w-5 h-5" />
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-purple-600 h-full rounded-full transition-all duration-1000"
              style={{ width: `${turnoutPercentage}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">{turnoutPercentage}% turnout</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                placeholder="Cari nama atau NIS..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
            </div>
            <div className="flex gap-3">
              <Select value={filterClass} onValueChange={setFilterClass}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter Kelas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kelas</SelectItem>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="voted">Sudah Memilih</SelectItem>
                  <SelectItem value="pending">Belum Memilih</SelectItem>
                </SelectContent>
              </Select>

              <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-xl font-medium transition-all">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Nama Siswa</th>
                <th className="px-6 py-4">NIS</th>
                <th className="px-6 py-4">Kelas</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Waktu Memilih</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVoters.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <AlertCircle className="w-12 h-12 text-slate-300" />
                      <p className="text-slate-500 font-medium">
                        Tidak ada data pemilih yang ditemukan
                      </p>
                      <p className="text-sm text-slate-400">
                        Coba ubah filter atau kata kunci pencarian
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredVoters.map((voter) => (
                  <tr key={voter.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                          {voter.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">
                            {voter.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            Terdaftar: {voter.registeredAt}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-600">
                      {voter.nis}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700">
                        {voter.className}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {voter.status === "voted" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Sudah Memilih
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                          <XCircle className="w-3.5 h-3.5" />
                          Belum Memilih
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {voter.votedAt || "-"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Menampilkan {filteredVoters.length} dari {totalVoters} pemilih
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-500 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              Previous
            </button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-500 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Dialog Tambah Pemilih */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Tambah Pemilih Baru</DialogTitle>
            <DialogDescription>
              Masukkan data siswa yang akan ditambahkan ke daftar pemilih.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700">
                Nama Lengkap
              </label>
              <input
                placeholder="Masukkan nama siswa"
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700">
                NIS (Nomor Induk Siswa)
              </label>
              <input
                placeholder="Contoh: 2024001"
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700">
                Kelas
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kelas" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium transition-colors"
            >
              Batal
            </button>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
            >
              Simpan
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}