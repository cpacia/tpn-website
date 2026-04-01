export default function DashboardPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-navy mb-2">
        Dashboard
      </h1>
      <p className="text-warm-gray mb-8">
        Welcome to the Texas Philanthropy Network admin dashboard.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-sm text-warm-gray mb-1">Pending Requests</div>
          <div className="text-3xl font-bold text-navy font-serif">0</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-sm text-warm-gray mb-1">Approved</div>
          <div className="text-3xl font-bold text-navy font-serif">0</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-sm text-warm-gray mb-1">Total Requests</div>
          <div className="text-3xl font-bold text-navy font-serif">0</div>
        </div>
      </div>
    </div>
  );
}
