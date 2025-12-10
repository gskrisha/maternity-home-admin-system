import { UserPlus, Search, Receipt, BarChart3, Settings, Heart, Calendar } from 'lucide-react';

interface DashboardProps {
  onNavigate: (screen: 'new-patient' | 'search-patient' | 'billing' | 'reports' | 'settings' | 'appointments') => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const currentDate = new Date().toLocaleDateString('en-IN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const currentTime = new Date().toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const actions = [
    {
      icon: UserPlus,
      label: 'Register Patient',
      screen: 'new-patient' as const,
      color: 'bg-[#FDE7F0]',
      hoverColor: 'hover:bg-[#FBC6DD]'
    },
    {
      icon: Search,
      label: 'Search Patient',
      screen: 'search-patient' as const,
      color: 'bg-[#E8F2FF]',
      hoverColor: 'hover:bg-[#C7E0FF]'
    },
    {
      icon: Receipt,
      label: 'Billing',
      screen: 'billing' as const,
      color: 'bg-[#FDE7F0]',
      hoverColor: 'hover:bg-[#FBC6DD]'
    },
    {
      icon: BarChart3,
      label: 'Reports',
      screen: 'reports' as const,
      color: 'bg-[#E8F2FF]',
      hoverColor: 'hover:bg-[#C7E0FF]'
    },
    {
      icon: Settings,
      label: 'Settings',
      screen: 'settings' as const,
      color: 'bg-[#FDE7F0]',
      hoverColor: 'hover:bg-[#FBC6DD]'
    },
    {
      icon: Calendar,
      label: 'Appointments',
      screen: 'appointments' as const,
      color: 'bg-[#E8F2FF]',
      hoverColor: 'hover:bg-[#C7E0FF]'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Top Bar */}
      <div className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#C2185B] rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" fill="white" />
          </div>
          <div>
            <h1 className="m-0">Maternity & Nursing Home</h1>
            <p className="text-sm m-0">Admin Dashboard</p>
          </div>
        </div>
        <div className="text-right">
          <p className="m-0">{currentDate}</p>
          <p className="m-0">{currentTime}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-7xl mx-auto">
        <h2 className="mb-8">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={() => action.screen && onNavigate(action.screen)}
                disabled={!action.screen}
                className={`${action.color} ${action.hoverColor} p-8 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-md`}
              >
                <div className="flex flex-col items-center gap-4">
                  <Icon className="w-16 h-16 text-[#1E3A8A]" />
                  <span className="text-[#1E3A8A]">{action.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Today's Summary */}
        <div className="mt-12 bg-white rounded-2xl shadow-md p-8">
          <h3 className="mb-6">Today&apos;s Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-[#FDE7F0] p-6 rounded-xl">
              <p className="text-sm mb-2">Total Patients</p>
              <p className="m-0">18</p>
            </div>
            <div className="bg-[#E8F2FF] p-6 rounded-xl">
              <p className="text-sm mb-2">OP Visits</p>
              <p className="m-0">12</p>
            </div>
            <div className="bg-[#FDE7F0] p-6 rounded-xl">
              <p className="text-sm mb-2">IP Admissions</p>
              <p className="m-0">4</p>
            </div>
            <div className="bg-[#E8F2FF] p-6 rounded-xl">
              <p className="text-sm mb-2">Emergency</p>
              <p className="m-0">2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}