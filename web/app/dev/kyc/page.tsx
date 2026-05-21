"use client";

import { Check, X, FileText, Search } from "lucide-react";

export default function KYCVerification() {
  const mockKycData = [
    { id: "KYC-001", user: "Budi Santoso", email: "budi@gmail.com", business: "Koperasi Tani Jaya", status: "PENDING", date: "20 Mei 2026" },
    { id: "KYC-002", user: "Siti Aminah", email: "siti@koperasi.id", business: "Sayur Lestari Abadi", status: "PENDING", date: "19 Mei 2026" },
    { id: "KYC-003", user: "Agus Pratama", email: "agus.p@yahoo.com", business: "Tani Makmur Group", status: "APPROVED", date: "15 Mei 2026" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-poppins text-taniga-pine">Verifikasi KYC Suplier</h2>
        <p className="text-sm text-gray-500">Tinjau dan setujui pengajuan pembuatan Toko Koperasi oleh Buyer.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <div className="relative w-64">
            <input 
              type="text" 
              placeholder="Cari nama atau nomor KYC..." 
              className="w-full text-sm pl-9 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-taniga-emerald"
            />
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-bold bg-taniga-mint text-taniga-emerald rounded-lg border border-taniga-emerald/20">Pending</button>
            <button className="px-3 py-1.5 text-xs font-bold bg-white text-gray-500 rounded-lg border border-gray-200">Semua</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase font-medium text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">ID / Tanggal</th>
                <th className="px-6 py-4">Pemohon</th>
                <th className="px-6 py-4">Usaha / Koperasi</th>
                <th className="px-6 py-4">Dokumen</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mockKycData.map((row) => (
                <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono font-bold text-gray-800 block">{row.id}</span>
                    <span className="text-xs text-gray-400">{row.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-700 block">{row.user}</span>
                    <span className="text-xs text-gray-500">{row.email}</span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">{row.business}</td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100">
                      <FileText className="w-3 h-3" /> KTP & NPWP
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {row.status === "PENDING" ? (
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-[10px] font-bold rounded-md uppercase">Menunggu Review</span>
                    ) : (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-md uppercase">Disetujui</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {row.status === "PENDING" ? (
                      <div className="flex items-center justify-end gap-2">
                        <button className="w-8 h-8 rounded-full bg-green-50 text-taniga-emerald border border-green-200 flex items-center justify-center hover:bg-taniga-emerald hover:text-white transition-colors">
                          <Check className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-red-50 text-taniga-danger border border-red-200 flex items-center justify-center hover:bg-taniga-danger hover:text-white transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button className="text-xs font-semibold text-gray-400 hover:text-gray-600">Detail</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
