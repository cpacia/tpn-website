import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const [pendingCount, approvedCount, totalSubmissions, totalPublicRequests, fullyFundedCount] =
    await Promise.all([
      prisma.assistanceRequest.count({ where: { status: "PENDING" } }),
      prisma.assistanceRequest.count({ where: { status: "APPROVED" } }),
      prisma.assistanceRequest.count(),
      prisma.publicRequest.count(),
      prisma.publicRequest.count({ where: { fullyFunded: true } }),
    ]);

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-navy mb-2">
        Dashboard
      </h1>
      <p className="text-warm-gray mb-8">
        Welcome to the Texas Philanthropy Network admin dashboard.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-sm text-warm-gray mb-1">Pending</div>
          <div className="text-3xl font-bold text-yellow-600 font-serif">
            {pendingCount}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-sm text-warm-gray mb-1">Approved</div>
          <div className="text-3xl font-bold text-green-600 font-serif">
            {approvedCount}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-sm text-warm-gray mb-1">Total Submissions</div>
          <div className="text-3xl font-bold text-navy font-serif">
            {totalSubmissions}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-sm text-warm-gray mb-1">Public Requests</div>
          <div className="text-3xl font-bold text-navy font-serif">
            {totalPublicRequests}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-sm text-warm-gray mb-1">Fully Funded</div>
          <div className="text-3xl font-bold text-green-600 font-serif">
            {fullyFundedCount}
          </div>
        </div>
      </div>
    </div>
  );
}
