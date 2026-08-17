import Link from "next/link";
import { Ruler } from "lucide-react";

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-(--color-bg) py-12 px-5 md:px-8 font-sans">
      <div className="mx-auto max-w-4xl">
        
        <div className="mb-10 rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-8 shadow-[6px_6px_0_rgba(139,94,60,0.25)] text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg border-2 border-(--color-border) bg-(--color-primary-dark) text-(--color-accent) shadow-[3px_3px_0_rgba(58,40,27,0.4)]">
            <Ruler className="h-7 w-7" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-(--color-accent-2) mb-1">Standar Fit</p>
          <h1 className="text-3xl font-black uppercase tracking-wider text-(--color-primary-dark)">Panduan Ukuran</h1>
          <p className="mt-2 text-xs text-(--color-text-secondary)">Sesuaikan ukuran tubuh Anda dengan standar kemeja dan pakaian batik kami.</p>
        </div>

        <div className="space-y-8">
          {/* Tabel Pria */}
          <div className="rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-6 shadow-[4px_4px_0_rgba(139,94,60,0.15)]">
            <h2 className="text-xs font-black uppercase tracking-widest text-(--color-primary-dark) mb-4 border-b-2 border-(--color-border) pb-3">Kemeja Pria (Standard Size)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-(--color-text-primary)">
                <thead className="bg-(--color-bg) uppercase tracking-wider text-[9px] font-bold text-(--color-text-secondary) border-b border-(--color-border)">
                  <tr>
                    <th className="p-3">Ukuran</th>
                    <th className="p-3">Lingkar Dada (LD)</th>
                    <th className="p-3">Lebar Bahu</th>
                    <th className="p-3">Panjang Baju</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dashed divide-(--color-border)">
                  <tr><td className="p-3 font-bold">M</td><td className="p-3">104 cm</td><td className="p-3">46 cm</td><td className="p-3">70 cm</td></tr>
                  <tr><td className="p-3 font-bold">L</td><td className="p-3">108 cm</td><td className="p-3">48 cm</td><td className="p-3">72 cm</td></tr>
                  <tr><td className="p-3 font-bold">XL</td><td className="p-3">112 cm</td><td className="p-3">50 cm</td><td className="p-3">74 cm</td></tr>
                  <tr><td className="p-3 font-bold">XXL</td><td className="p-3">116 cm</td><td className="p-3">52 cm</td><td className="p-3">76 cm</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Tabel Wanita */}
          <div className="rounded-xl border-2 border-(--color-border) bg-(--color-surface) p-6 shadow-[4px_4px_0_rgba(139,94,60,0.15)]">
            <h2 className="text-xs font-black uppercase tracking-widest text-(--color-primary-dark) mb-4 border-b-2 border-(--color-border) pb-3">Tunik / Blouse Wanita</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-(--color-text-primary)">
                <thead className="bg-(--color-bg) uppercase tracking-wider text-[9px] font-bold text-(--color-text-secondary) border-b border-(--color-border)">
                  <tr>
                    <th className="p-3">Ukuran</th>
                    <th className="p-3">Lingkar Dada (LD)</th>
                    <th className="p-3">Panjang Lengan</th>
                    <th className="p-3">Panjang Baju</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dashed divide-(--color-border)">
                  <tr><td className="p-3 font-bold">M</td><td className="p-3">96 cm</td><td className="p-3">52 cm</td><td className="p-3">90 cm</td></tr>
                  <tr><td className="p-3 font-bold">L</td><td className="p-3">100 cm</td><td className="p-3">53 cm</td><td className="p-3">92 cm</td></tr>
                  <tr><td className="p-3 font-bold">XL</td><td className="p-3">104 cm</td><td className="p-3">54 cm</td><td className="p-3">94 cm</td></tr>
                  <tr><td className="p-3 font-bold">XXL</td><td className="p-3">110 cm</td><td className="p-3">55 cm</td><td className="p-3">95 cm</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}