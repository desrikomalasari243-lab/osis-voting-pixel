"use client";

import { useState } from "react";
import {
  Vote,
  TrendingUp,
  TrendingDown,
  Users,
  CheckCircle2,
  Clock,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  iconBg: string;
}

function StatCard({
  title,
  value,
  change,
  isPositive,
  icon,
  iconBg,
}: StatCardProps) {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className={`${iconBg} p-2 rounded-lg`}>{icon}</div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-slate-900 tracking-tight">
          {value}
        </span>
        <span
          className={`text-xs font-medium flex items-center px-1.5 py-0.5 rounded-md ${
            isPositive
              ? "text-emerald-600 bg-emerald-50"
              : "text-red-600 bg-red-50"
          }`}
        >
          {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
          {change}
        </span>
      </div>
    </div>
  );
}

export default function StatistikPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  // Mock data - nanti diganti dengan data dari Supabase
  const totalVotes = 1254;
  const totalVoters = 1600;
  const turnoutPercentage = ((totalVotes / totalVoters) * 100).toFixed(1);
  
  const candidateStats = [
    {
      number: "01",
      names: "Budi Santoso & Siti Aminah",
      votes: 510,
      percentage: 40.7,
      color: "bg-blue-600",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      number: "02",
      names: "Agus Wijaya & Dian Kusuma",
      votes: 360,
      percentage: 28.7,
      color: "bg-slate-400",
      lightColor: "bg-slate-50",
      textColor: "text-slate-600",
    },
    {
      number: "03",
      names: "Rendi Pratama & Siti Nurhaliza",
      votes: 240,
      percentage: 19.1,
      color: "bg-indigo-400",
      lightColor: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
  ];

  const classStats = [
    { name: "X.PPLG-1", total: 36, voted: 34, percentage: 94.4 },
    { name: "X.PPLG-2", total: 35, voted: 32, percentage: 91.4 },
    { name: "X.DKV-1", total: 32, voted: 28, percentage: 87.5 },
    { name: "X.DKV-2", total: 33, voted: 30, percentage: 90.9 },
    { name: "XI.RPL-1", total: 36, voted: 35, percentage: 97.2 },
    { name: "XI.RPL-2", total: 35, voted: 33, percentage: 94.3 },
  ];

  return (
    <main className="pt-20 md:pt-8 px-4 md:px-8 pb-24 md:pb-8 w-full grow">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Statistik Pemilihan
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Analisis real-time partisipasi dan perolehan suara.
          </p>
        </div>
        
        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent cursor-pointer transition-all shadow-sm"
          >
            <option value="today">Hari Ini</option>
            <option value="week">Minggu Ini</option>
            <option value="month">Bulan Ini</option>
          </select>
          
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all active:scale-[0.98] shadow-md shadow-blue-500/20">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Suara Masuk"
          value={totalVotes.toLocaleString()}
          change="+12.5%"
          isPositive={true}
          icon={<Vote className="w-5 h-5" />}
          iconBg="bg-blue-50 p-2 rounded-lg text-blue-600"
        />
        <StatCard
          title="Partisipasi"
          value={`${turnoutPercentage}%`}
          change="+5.2%"
          isPositive={true}
          icon={<Users className="w-5 h-5" />}
          iconBg="bg-emerald-50 p-2 rounded-lg text-emerald-600"
        />
        <StatCard
          title="Belum Memilih"
          value={(totalVoters - totalVotes).toLocaleString()}
          change="-8.3%"
          isPositive={true}
          icon={<Clock className="w-5 h-5" />}
          iconBg="bg-amber-50 p-2 rounded-lg text-amber-600"
        />
        <StatCard
          title="Suara Sah"
          value={totalVotes.toLocaleString()}
          change="100%"
          isPositive={true}
          icon={<CheckCircle2 className="w-5 h-5" />}
          iconBg="bg-purple-50 p-2 rounded-lg text-purple-600"
        />
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Bar Chart - Perolehan Suara */}
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900">
                Perolehan Suara per Kandidat
              </h2>
            </div>
          </div>
          
          <div className="space-y-6">
            {candidateStats.map((candidate) => (
              <div key={candidate.number}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${candidate.lightColor} rounded-xl flex items-center justify-center ${candidate.textColor} font-bold text-sm`}>
                      {candidate.number}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Paslon {candidate.number}
                      </p>
                      <p className="text-xs text-slate-500">{candidate.names}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-900">
                      {candidate.votes} suara
                    </p>
                    <p className={`text-xs font-medium ${candidate.textColor}`}>
                      {candidate.percentage}%
                    </p>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className={`${candidate.color} h-full rounded-full transition-all duration-1000`}
                    style={{ width: `${candidate.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pie Chart - Partisipasi per Kelas */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Partisipasi per Kelas
            </h2>
          </div>
          
          <div className="space-y-4">
            {classStats.map((kelas, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900 mb-1">
                    {kelas.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{kelas.voted} dari {kelas.total}</span>
                  </div>
                </div>
                <div className="ml-4">
                  <span className={`text-sm font-bold ${
                    kelas.percentage >= 90 ? "text-emerald-600" :
                    kelas.percentage >= 80 ? "text-amber-600" : "text-red-600"
                  }`}>
                    {kelas.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Rata-rata</span>
              <span className="font-bold text-blue-600">
                {(classStats.reduce((acc, curr) => acc + curr.percentage, 0) / classStats.length).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Activity */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">
            Aktivitas Pemilihan
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Tanggal Mulai</p>
                <p className="text-xs text-slate-500">18 Juni 2026</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Waktu Berjalan</p>
                <p className="text-xs text-slate-500">6 jam 23 menit</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Vote className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Rata-rata per Jam</p>
                <p className="text-xs text-slate-500">196 suara</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}