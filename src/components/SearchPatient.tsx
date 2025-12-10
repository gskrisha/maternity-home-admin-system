import { useState } from 'react';
import { Search, ArrowLeft, Phone, Calendar } from 'lucide-react';
import { Patient } from '../App';

interface SearchPatientProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
  onBack: () => void;
}

export function SearchPatient({ patients, onSelectPatient, onBack }: SearchPatientProps) {
  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [searchDob, setSearchDob] = useState('');
  const [searchAadhaar, setSearchAadhaar] = useState('');
  const [searchUhid, setSearchUhid] = useState('');
  const [bloodGroupFilter, setBloodGroupFilter] = useState('');

  // Demo patients for display
  const demoPatients: Patient[] = [
    {
      id: '1',
      applicationNumber: 'MMH-OP-2025-000001',
      visitType: 'OP',
      name: 'Smt. Anjali Ramesh',
      sex: 'Female',
      dob: '1999-03-15',
      age: 26,
      bloodGroup: 'O+',
      maritalStatus: 'Married',
      guardianName: 'Sri Ramesh Kumar',
      guardianPhone: '9876543210',
      phone: '9876543210',
      aadhaar: 'xxxx-xxxx-1234',
      uhid: 'UHID-IND-9087',
      address: 'Malleshwaram, Bengaluru',
      complaints: 'Lower abdominal pain',
      remarks: 'Second trimester',
      doctor: 'Dr. Sushma Rao',
      visits: [],
      createdAt: '2025-12-10T10:00:00Z'
    },
    {
      id: '2',
      applicationNumber: 'MMH-IP-2025-000002',
      visitType: 'IP',
      name: 'Smt. Kavya Shetty',
      sex: 'Female',
      dob: '1996-07-22',
      age: 29,
      bloodGroup: 'B+',
      maritalStatus: 'Married',
      guardianName: 'Sri Arun Shetty',
      guardianPhone: '9123456780',
      phone: '9123456780',
      aadhaar: 'xxxx-xxxx-5678',
      uhid: 'UHID-IND-9088',
      address: 'Jayanagar, Bengaluru',
      complaints: 'Regular checkup',
      remarks: 'Third trimester',
      doctor: 'Dr. Meenakshi Iyer',
      visits: [],
      createdAt: '2025-12-09T14:30:00Z'
    },
    {
      id: '3',
      applicationNumber: 'MMH-OP-2025-000003',
      visitType: 'OP',
      name: 'Smt. Priya Reddy',
      sex: 'Female',
      dob: '2000-01-10',
      age: 25,
      bloodGroup: 'A+',
      maritalStatus: 'Married',
      guardianName: 'Sri Kiran Reddy',
      guardianPhone: '9988776655',
      phone: '9988776655',
      aadhaar: 'xxxx-xxxx-9012',
      uhid: 'UHID-IND-9089',
      address: 'Whitefield, Bengaluru',
      complaints: 'Routine checkup',
      remarks: 'First trimester',
      doctor: 'Dr. Sushma Rao',
      visits: [],
      createdAt: '2025-12-08T09:15:00Z'
    }
  ];

  const allPatients = [...demoPatients, ...patients];

  const filteredPatients = allPatients.filter((patient) => {
    if (searchName && !patient.name.toLowerCase().includes(searchName.toLowerCase())) {
      return false;
    }
    if (searchPhone && !patient.phone.includes(searchPhone)) {
      return false;
    }
    if (searchDob && patient.dob !== searchDob) {
      return false;
    }
    if (searchAadhaar && !patient.aadhaar.includes(searchAadhaar)) {
      return false;
    }
    if (searchUhid && !patient.uhid.toLowerCase().includes(searchUhid.toLowerCase())) {
      return false;
    }
    if (bloodGroupFilter && patient.bloodGroup !== bloodGroupFilter) {
      return false;
    }
    return true;
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

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
          <h1 className="m-0">Search Patient</h1>
        </div>
      </div>

      <div className="p-8 max-w-6xl mx-auto">
        {/* Search Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h3 className="mb-6">Search Filters</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label htmlFor="searchName" className="block mb-2">Patient Name</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="searchName"
                  type="text"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="Search by name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="searchPhone" className="block mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="searchPhone"
                  type="tel"
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                  placeholder="Phone number"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="searchDob" className="block mb-2">Date of Birth</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="searchDob"
                  type="date"
                  value={searchDob}
                  onChange={(e) => setSearchDob(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="searchAadhaar" className="block mb-2">Aadhaar Number</label>
              <input
                id="searchAadhaar"
                type="text"
                value={searchAadhaar}
                onChange={(e) => setSearchAadhaar(e.target.value)}
                placeholder="Aadhaar number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="searchUhid" className="block mb-2">UHID</label>
              <input
                id="searchUhid"
                type="text"
                value={searchUhid}
                onChange={(e) => setSearchUhid(e.target.value)}
                placeholder="UHID"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2">Quick Filter: Blood Group</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setBloodGroupFilter('')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  bloodGroupFilter === ''
                    ? 'bg-[#C2185B] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:shadow-md'
                }`}
              >
                All
              </button>
              {bloodGroups.map((bg) => (
                <button
                  key={bg}
                  onClick={() => setBloodGroupFilter(bg)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    bloodGroupFilter === bg
                      ? 'bg-[#C2185B] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:shadow-md'
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="m-0">Search Results</h3>
            <p className="m-0 text-sm">
              {filteredPatients.length} patient{filteredPatients.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {filteredPatients.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No patients found. Try adjusting your search filters.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPatients.map((patient) => (
                <button
                  key={patient.id}
                  onClick={() => onSelectPatient(patient)}
                  className="w-full bg-[#FDE7F0] hover:bg-[#FBC6DD] p-6 rounded-xl transition-all text-left shadow-sm hover:shadow-md"
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-sm opacity-70 mb-1">Name</p>
                      <p className="m-0">{patient.name}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-70 mb-1">Blood Group</p>
                      <span className="inline-block bg-[#C2185B] text-white px-3 py-1 rounded-full text-sm">
                        {patient.bloodGroup}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm opacity-70 mb-1">Age</p>
                      <p className="m-0">{patient.age} years</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-70 mb-1">Phone</p>
                      <p className="m-0">{patient.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-70 mb-1">UHID</p>
                      <p className="m-0">{patient.uhid}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
