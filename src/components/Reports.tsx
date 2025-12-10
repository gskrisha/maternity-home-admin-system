import { ArrowLeft, TrendingUp, Users, IndianRupee, Calendar } from 'lucide-react';

interface ReportsProps {
  onBack: () => void;
}

export function Reports({ onBack }: ReportsProps) {
  const monthlyData = [
    { month: 'January', patients: 145, revenue: 287500 },
    { month: 'February', patients: 168, revenue: 324000 },
    { month: 'March', patients: 192, revenue: 385000 },
    { month: 'April', patients: 178, revenue: 356000 },
    { month: 'May', patients: 205, revenue: 412000 },
    { month: 'June', patients: 221, revenue: 445000 },
    { month: 'July', patients: 198, revenue: 395000 },
    { month: 'August', patients: 234, revenue: 468000 },
    { month: 'September', patients: 247, revenue: 495000 },
    { month: 'October', patients: 261, revenue: 523000 },
    { month: 'November', patients: 285, revenue: 571000 },
    { month: 'December (Till date)', patients: 142, revenue: 285000 }
  ];

  const doctorStats = [
    { name: 'Dr. Sushma Rao', specialty: 'OBG', patients: 458, revenue: 915000 },
    { name: 'Dr. Meenakshi Iyer', specialty: 'Consultant', patients: 392, revenue: 785000 },
    { name: 'Dr. Priya Sharma', specialty: 'Pediatrician', patients: 324, revenue: 648000 }
  ];

  const visitTypeStats = [
    { type: 'Out Patient (OP)', count: 1847, percentage: 68 },
    { type: 'In Patient (IP)', count: 648, percentage: 24 },
    { type: 'Emergency', count: 217, percentage: 8 }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-white shadow-sm px-8 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#1E3A8A]" />
          </button>
          <h1 className="m-0">Reports {'&'} Analytics</h1>
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#C2185B] to-[#9C1549] text-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <Users className="w-8 h-8" />
              <TrendingUp className="w-5 h-5" />
            </div>
            <p className="text-sm mb-1 opacity-90">Total Patients (2025)</p>
            <p className="m-0">2,712</p>
          </div>

          <div className="bg-gradient-to-br from-[#1E3A8A] to-[#152D6B] text-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <IndianRupee className="w-8 h-8" />
              <TrendingUp className="w-5 h-5" />
            </div>
            <p className="text-sm mb-1 opacity-90">Total Revenue (2025)</p>
            <p className="m-0">₹54,46,500</p>
          </div>

          <div className="bg-gradient-to-br from-[#C2185B] to-[#9C1549] text-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <Calendar className="w-8 h-8" />
              <TrendingUp className="w-5 h-5" />
            </div>
            <p className="text-sm mb-1 opacity-90">Avg. Daily Patients</p>
            <p className="m-0">18</p>
          </div>

          <div className="bg-gradient-to-br from-[#1E3A8A] to-[#152D6B] text-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <Users className="w-8 h-8" />
            </div>
            <p className="text-sm mb-1 opacity-90">This Month</p>
            <p className="m-0">142 Patients</p>
          </div>
        </div>

        {/* Monthly Performance */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h3 className="mb-6">Monthly Performance (2025)</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 px-4">Month</th>
                  <th className="text-right py-3 px-4">Patients</th>
                  <th className="text-right py-3 px-4">Revenue</th>
                  <th className="text-right py-3 px-4">Avg. per Patient</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((data, index) => (
                  <tr key={index} className={`border-b border-gray-200 ${index === monthlyData.length - 1 ? 'bg-[#FDE7F0]' : ''}`}>
                    <td className="py-3 px-4">{data.month}</td>
                    <td className="text-right py-3 px-4">{data.patients}</td>
                    <td className="text-right py-3 px-4">₹{data.revenue.toLocaleString('en-IN')}</td>
                    <td className="text-right py-3 px-4">₹{Math.round(data.revenue / data.patients).toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Doctor Performance */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="mb-6">Doctor Performance (2025)</h3>
            <div className="space-y-4">
              {doctorStats.map((doctor, index) => (
                <div key={index} className="bg-[#E8F2FF] p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="m-0 mb-1">{doctor.name}</p>
                      <p className="text-sm m-0 opacity-70">{doctor.specialty}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-sm opacity-70 mb-1">Patients</p>
                      <p className="m-0">{doctor.patients}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-sm opacity-70 mb-1">Revenue</p>
                      <p className="m-0">₹{(doctor.revenue / 1000).toFixed(0)}K</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visit Type Distribution */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="mb-6">Visit Type Distribution (2025)</h3>
            <div className="space-y-4">
              {visitTypeStats.map((stat, index) => (
                <div key={index} className="bg-[#FDE7F0] p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <p className="m-0">{stat.type}</p>
                    <p className="m-0">{stat.count}</p>
                  </div>
                  <div className="w-full bg-white rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-[#C2185B] h-full rounded-full transition-all"
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                  <p className="text-sm opacity-70 mt-2 m-0">{stat.percentage}% of total visits</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="bg-[#E8F2FF] p-4 rounded-xl">
                <p className="text-sm opacity-70 mb-1">Total Visits (2025)</p>
                <p className="m-0">2,712</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
