import { useState } from 'react';
import { ArrowLeft, User, Heart, Phone, MapPin, FileText, Plus, Receipt } from 'lucide-react';
import { Patient, Visit } from '../App';

interface PatientProfileProps {
  patient: Patient;
  onAddVisit: (visit: Visit) => void;
  onCreateBilling: (patient: Patient) => void;
  onBack: () => void;
}

type Tab = 'info' | 'history' | 'add-visit';

const doctors = [
  { id: '1', name: 'Dr. Sushma Rao', specialty: 'OBG' },
  { id: '2', name: 'Dr. Meenakshi Iyer', specialty: 'Consultant' },
  { id: '3', name: 'Dr. Priya Sharma', specialty: 'Pediatrician' }
];

export function PatientProfile({ patient, onAddVisit, onCreateBilling, onBack }: PatientProfileProps) {
  const [activeTab, setActiveTab] = useState<Tab>('info');
  const [complaints, setComplaints] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [notes, setNotes] = useState('');

  const handleSaveVisit = () => {
    if (!complaints || !selectedDoctor) {
      alert('Please fill in complaints and select a doctor');
      return;
    }

    const visit: Visit = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      complaints,
      diagnosis,
      doctor: selectedDoctor,
      notes
    };

    onAddVisit(visit);
    
    // Reset form
    setComplaints('');
    setDiagnosis('');
    setSelectedDoctor('');
    setNotes('');
    setActiveTab('history');
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
          <h1 className="m-0">Patient Profile</h1>
        </div>
      </div>

      <div className="p-8 max-w-6xl mx-auto">
        {/* Patient Header Card */}
        <div className="bg-gradient-to-r from-[#FDE7F0] to-[#E8F2FF] rounded-2xl shadow-md p-8 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-[#C2185B] rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="m-0 mb-2">{patient.name}</h2>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#C2185B]" />
                    <p className="m-0">
                      {patient.age} years / {patient.sex}
                    </p>
                  </div>
                  <div>
                    <span className="inline-block bg-[#C2185B] text-white px-4 py-1 rounded-full">
                      {patient.bloodGroup}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#1E3A8A]" />
                    <p className="m-0">{patient.phone}</p>
                  </div>
                  <div>
                    <p className="m-0">{patient.uhid}</p>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <MapPin className="w-4 h-4 text-[#1E3A8A]" />
                    <p className="m-0">{patient.address}</p>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => onCreateBilling(patient)}
              className="flex items-center gap-2 px-6 py-3 bg-[#C2185B] text-white rounded-lg hover:bg-[#9C1549] transition-colors shadow-md hover:shadow-lg"
            >
              <Receipt className="w-5 h-5" />
              Create Bill
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('info')}
              className={`flex-1 px-6 py-4 transition-colors ${
                activeTab === 'info'
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-white text-[#1E3A8A] hover:bg-gray-50'
              }`}
            >
              Patient Info
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 px-6 py-4 transition-colors ${
                activeTab === 'history'
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-white text-[#1E3A8A] hover:bg-gray-50'
              }`}
            >
              Visit History
            </button>
            <button
              onClick={() => setActiveTab('add-visit')}
              className={`flex-1 px-6 py-4 transition-colors ${
                activeTab === 'add-visit'
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-white text-[#1E3A8A] hover:bg-gray-50'
              }`}
            >
              Add Visit
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* Patient Info Tab */}
            {activeTab === 'info' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#FDE7F0] p-4 rounded-lg">
                    <p className="text-sm opacity-70 mb-1">Application Number</p>
                    <p className="m-0">{patient.applicationNumber}</p>
                  </div>
                  <div className="bg-[#E8F2FF] p-4 rounded-lg">
                    <p className="text-sm opacity-70 mb-1">Visit Type</p>
                    <p className="m-0">
                      {patient.visitType === 'OP' ? 'Out Patient' : 
                       patient.visitType === 'IP' ? 'In Patient' : 'Emergency'}
                    </p>
                  </div>
                  <div className="bg-[#FDE7F0] p-4 rounded-lg">
                    <p className="text-sm opacity-70 mb-1">Date of Birth</p>
                    <p className="m-0">{new Date(patient.dob).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div className="bg-[#E8F2FF] p-4 rounded-lg">
                    <p className="text-sm opacity-70 mb-1">Marital Status</p>
                    <p className="m-0">{patient.maritalStatus}</p>
                  </div>
                  <div className="bg-[#FDE7F0] p-4 rounded-lg">
                    <p className="text-sm opacity-70 mb-1">Guardian Name</p>
                    <p className="m-0">{patient.guardianName}</p>
                  </div>
                  <div className="bg-[#E8F2FF] p-4 rounded-lg">
                    <p className="text-sm opacity-70 mb-1">Guardian Phone</p>
                    <p className="m-0">{patient.guardianPhone}</p>
                  </div>
                  <div className="bg-[#FDE7F0] p-4 rounded-lg">
                    <p className="text-sm opacity-70 mb-1">Aadhaar Number</p>
                    <p className="m-0">{patient.aadhaar}</p>
                  </div>
                  <div className="bg-[#E8F2FF] p-4 rounded-lg">
                    <p className="text-sm opacity-70 mb-1">Assigned Doctor</p>
                    <p className="m-0">{patient.doctor}</p>
                  </div>
                </div>

                <div className="bg-[#FDE7F0] p-4 rounded-lg">
                  <p className="text-sm opacity-70 mb-1">Initial Complaints</p>
                  <p className="m-0">{patient.complaints}</p>
                </div>

                <div className="bg-[#E8F2FF] p-4 rounded-lg">
                  <p className="text-sm opacity-70 mb-1">Remarks</p>
                  <p className="m-0">{patient.remarks}</p>
                </div>
              </div>
            )}

            {/* Visit History Tab */}
            {activeTab === 'history' && (
              <div>
                {patient.visits.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No visit history yet</p>
                    <button
                      onClick={() => setActiveTab('add-visit')}
                      className="mt-4 flex items-center gap-2 px-6 py-3 bg-[#C2185B] text-white rounded-lg hover:bg-[#9C1549] transition-colors shadow-md hover:shadow-lg mx-auto"
                    >
                      <Plus className="w-5 h-5" />
                      Add First Visit
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {patient.visits.map((visit) => (
                      <div key={visit.id} className="bg-[#FDE7F0] p-6 rounded-xl">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="m-0 mb-1">
                              {new Date(visit.date).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                            <p className="text-sm opacity-70 m-0">{visit.doctor}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm opacity-70 mb-1">Complaints</p>
                            <p className="m-0">{visit.complaints}</p>
                          </div>
                          {visit.diagnosis && (
                            <div>
                              <p className="text-sm opacity-70 mb-1">Diagnosis</p>
                              <p className="m-0">{visit.diagnosis}</p>
                            </div>
                          )}
                          {visit.notes && (
                            <div>
                              <p className="text-sm opacity-70 mb-1">Notes</p>
                              <p className="m-0">{visit.notes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Add Visit Tab */}
            {activeTab === 'add-visit' && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="complaints" className="block mb-2">Complaints</label>
                  <textarea
                    id="complaints"
                    value={complaints}
                    onChange={(e) => setComplaints(e.target.value)}
                    placeholder="Enter patient complaints"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="diagnosis" className="block mb-2">Diagnosis</label>
                  <textarea
                    id="diagnosis"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    placeholder="Enter diagnosis"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <label className="block mb-2">Select Doctor</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {doctors.map((doctor) => (
                      <button
                        key={doctor.id}
                        onClick={() => setSelectedDoctor(doctor.name)}
                        className={`p-6 rounded-xl transition-all text-left ${
                          selectedDoctor === doctor.name
                            ? 'bg-[#1E3A8A] text-white shadow-lg'
                            : 'bg-[#E8F2FF] text-[#1E3A8A] hover:shadow-md'
                        }`}
                      >
                        <p className="m-0 mb-2">{doctor.name}</p>
                        <p className={`text-sm m-0 ${selectedDoctor === doctor.name ? 'opacity-90' : 'opacity-70'}`}>
                          {doctor.specialty}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block mb-2">Notes</label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Additional notes"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent resize-none"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleSaveVisit}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#C2185B] text-white rounded-lg hover:bg-[#9C1549] transition-colors shadow-md hover:shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    Save Visit
                  </button>
                  <button
                    onClick={handleSaveVisit}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#152D6B] transition-colors shadow-md hover:shadow-lg"
                  >
                    <FileText className="w-5 h-5" />
                    Save {'&'} Print Summary
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
