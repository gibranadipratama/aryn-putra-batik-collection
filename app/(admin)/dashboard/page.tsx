export default function AdminDashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Admin</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Total Pesanan</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">124</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Total Pendapatan</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">Rp 15.400.000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Reseller Aktif</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">45</p>
        </div>
      </div>
    </div>
  );
}