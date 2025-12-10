import { ArrowLeft, Save, Building, Users, Clock, IndianRupee } from 'lucide-react';
import { useState } from 'react';

interface SettingsProps {
  onBack: () => void;
}

export function Settings({ onBack }: SettingsProps) {
  const [hospitalName, setHospitalName] = useState('Maternity & Nursing Home');
  const [address, setAddress] = useState('123, MG Road, Bengaluru - 560001');
  const [phone, setPhone] = useState('+91 80 1234 5678');
  const [email, setEmail] = useState('info@maternitycare.in');
  
  const [consultationFee, setConsultationFee] = useState('500');
  const [scanFee, setScanFee] = useState('1200');
  const [admissionFee, setAdmissionFee] = useState('5000');
  
  const [workingDays, setWorkingDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
  const [morningStart, setMorningStart] = useState('09:00');
  const [morningEnd, setMorningEnd] = useState('13:00');
  const [eveningStart, setEveningStart] = useState('16:00');
  const [eveningEnd, setEveningEnd] = useState('20:00');

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleDay = (day: string) => {
    if (workingDays.includes(day)) {
      setWorkingDays(workingDays.filter(d => d !== day));
    } else {
      setWorkingDays([...workingDays, day]);
    }
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

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
          <h1 className="m-0">System Settings</h1>
        </div>
      </div>

      <div className="p-8 max-w-5xl mx-auto">
        {/* Hospital Information */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Building className="w-6 h-6 text-[#C2185B]" />
            <h3 className="m-0">Hospital Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="hospitalName" className="block mb-2">Hospital Name</label>
              <input
                id="hospitalName"
                type="text"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block mb-2">Phone Number</label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="address" className="block mb-2">Address</label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Fee Structure */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <IndianRupee className="w-6 h-6 text-[#C2185B]" />
            <h3 className="m-0">Default Fee Structure</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FDE7F0] p-4 rounded-xl">
              <label htmlFor="consultationFee" className="block mb-2">Consultation Fee</label>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">₹</span>
                <input
                  id="consultationFee"
                  type="number"
                  value={consultationFee}
                  onChange={(e) => setConsultationFee(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
                />
              </div>
            </div>

            <div className="bg-[#E8F2FF] p-4 rounded-xl">
              <label htmlFor="scanFee" className="block mb-2">Scan Fee</label>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">₹</span>
                <input
                  id="scanFee"
                  type="number"
                  value={scanFee}
                  onChange={(e) => setScanFee(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
                />
              </div>
            </div>

            <div className="bg-[#FDE7F0] p-4 rounded-xl">
              <label htmlFor="admissionFee" className="block mb-2">IP Admission Fee</label>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">₹</span>
                <input
                  id="admissionFee"
                  type="number"
                  value={admissionFee}
                  onChange={(e) => setAdmissionFee(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-[#C2185B]" />
            <h3 className="m-0">Working Hours</h3>
          </div>

          <div className="mb-6">
            <label className="block mb-3">Working Days</label>
            <div className="flex gap-3">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`px-4 py-3 rounded-lg transition-all ${
                    workingDays.includes(day)
                      ? 'bg-[#C2185B] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:shadow-md'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FDE7F0] p-4 rounded-xl">
              <p className="mb-4">Morning Shift</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="morningStart" className="block mb-2 text-sm">Start Time</label>
                  <input
                    id="morningStart"
                    type="time"
                    value={morningStart}
                    onChange={(e) => setMorningStart(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="morningEnd" className="block mb-2 text-sm">End Time</label>
                  <input
                    id="morningEnd"
                    type="time"
                    value={morningEnd}
                    onChange={(e) => setMorningEnd(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#E8F2FF] p-4 rounded-xl">
              <p className="mb-4">Evening Shift</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="eveningStart" className="block mb-2 text-sm">Start Time</label>
                  <input
                    id="eveningStart"
                    type="time"
                    value={eveningStart}
                    onChange={(e) => setEveningStart(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="eveningEnd" className="block mb-2 text-sm">End Time</label>
                  <input
                    id="eveningEnd"
                    type="time"
                    value={eveningEnd}
                    onChange={(e) => setEveningEnd(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctors Management */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-[#C2185B]" />
            <h3 className="m-0">Doctors</h3>
          </div>

          <div className="space-y-3">
            <div className="bg-[#E8F2FF] p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="m-0 mb-1">Dr. Sushma Rao</p>
                <p className="text-sm m-0 opacity-70">OBG</p>
              </div>
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm">Active</span>
            </div>

            <div className="bg-[#FDE7F0] p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="m-0 mb-1">Dr. Meenakshi Iyer</p>
                <p className="text-sm m-0 opacity-70">Consultant</p>
              </div>
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm">Active</span>
            </div>

            <div className="bg-[#E8F2FF] p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="m-0 mb-1">Dr. Priya Sharma</p>
                <p className="text-sm m-0 opacity-70">Pediatrician</p>
              </div>
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm">Active</span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-8 py-4 bg-[#C2185B] text-white rounded-lg hover:bg-[#9C1549] transition-colors shadow-md hover:shadow-lg"
          >
            <Save className="w-5 h-5" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
