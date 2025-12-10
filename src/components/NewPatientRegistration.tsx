import { useState, useEffect } from 'react';
import { Save, Printer, MessageCircle, ArrowLeft, User } from 'lucide-react';
import { Patient } from '../App';
import { RegistrationPrintPreview } from './RegistrationPrintPreview';

interface NewPatientRegistrationProps {
  onSave: (patient: Patient) => void;
  onCancel: () => void;
}

const doctors = [
  { id: '1', name: 'Dr. Sushma Rao', specialty: 'OBG' },
  { id: '2', name: 'Dr. Meenakshi Iyer', specialty: 'Consultant' },
  { id: '3', name: 'Dr. Priya Sharma', specialty: 'Pediatrician' }
];

export function NewPatientRegistration({ onSave, onCancel }: NewPatientRegistrationProps) {
  const [applicationNumber, setApplicationNumber] = useState('');
  const [visitType, setVisitType] = useState<'OP' | 'IP' | 'EM'>('OP');
  const [name, setName] = useState('');
  const [sex, setSex] = useState<'Female' | 'Male' | 'Other'>('Female');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState(0);
  const [bloodGroup, setBloodGroup] = useState('');
  const [maritalStatus, setMaritalStatus] = useState<'Married' | 'Unmarried'>('Married');
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [phone, setPhone] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [uhid, setUhid] = useState('');
  const [address, setAddress] = useState('');
  const [complaints, setComplaints] = useState('');
  const [remarks, setRemarks] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [savedPatient, setSavedPatient] = useState<Patient | null>(null);

  // Generate application number on mount
  useEffect(() => {
    const year = new Date().getFullYear();
    const sequence = String(Math.floor(Math.random() * 999999) + 1).padStart(6, '0');
    const appNum = `MMH-${visitType}-${year}-${sequence}`;
    setApplicationNumber(appNum);
  }, [visitType]);

  // Calculate age from DOB
  useEffect(() => {
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      setAge(calculatedAge);
    }
  }, [dob]);

  const handleSave = (action: 'save' | 'print' | 'whatsapp') => {
    const patient: Patient = {
      id: Date.now().toString(),
      applicationNumber,
      visitType,
      name,
      sex,
      dob,
      age,
      bloodGroup,
      maritalStatus,
      guardianName,
      guardianPhone,
      phone,
      aadhaar,
      uhid,
      address,
      complaints,
      remarks,
      doctor: selectedDoctor,
      visits: [],
      createdAt: new Date().toISOString()
    };

    onSave(patient);

    if (action === 'print') {
      setShowPrintPreview(true);
      setSavedPatient(patient);
    } else if (action === 'whatsapp') {
      const message = `Registration Successful!\nApplication No: ${applicationNumber}\nPatient: ${name}\nDoctor: ${selectedDoctor}\nVisit Type: ${visitType}`;
      const whatsappUrl = `https://wa.me/91${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm px-8 py-4 no-print">
        <div className="flex items-center gap-4">
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#1E3A8A]" />
          </button>
          <h1 className="m-0">New Patient Registration</h1>
        </div>
      </div>

      <div className="p-8 max-w-5xl mx-auto">
        {/* Section 1: Visit Info */}
        <div className="bg-gradient-to-r from-[#FDE7F0] to-[#E8F2FF] rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <User className="w-8 h-8 text-[#C2185B]" />
              <div>
                <p className="text-sm m-0 opacity-80">Application Number</p>
                <p className="m-0">{applicationNumber}</p>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block mb-2">Visit Type</label>
            <div className="flex gap-3">
              {(['OP', 'IP', 'EM'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setVisitType(type)}
                  className={`px-8 py-3 rounded-lg transition-all ${
                    visitType === type
                      ? 'bg-[#1E3A8A] text-white shadow-lg'
                      : 'bg-white text-[#1E3A8A] hover:shadow-md'
                  }`}
                >
                  {type === 'OP' ? 'Out Patient' : type === 'IP' ? 'In Patient' : 'Emergency'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Patient Details */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h3 className="mb-6">Patient Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block mb-2">Patient Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Smt. Anjali Ramesh"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block mb-2">Sex</label>
              <div className="flex gap-3">
                {(['Female', 'Male', 'Other'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSex(s)}
                    className={`flex-1 px-6 py-3 rounded-lg transition-all ${
                      sex === s
                        ? 'bg-[#C2185B] text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:shadow-md'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="dob" className="block mb-2">Date of Birth</label>
              <input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="age" className="block mb-2">Age (Auto calculated)</label>
              <input
                id="age"
                type="number"
                value={age}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2">Blood Group</label>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {bloodGroups.map((bg) => (
                <button
                  key={bg}
                  onClick={() => setBloodGroup(bg)}
                  className={`px-4 py-3 rounded-lg transition-all ${
                    bloodGroup === bg
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

        {/* Section 3: Family Details */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h3 className="mb-6">Family Details</h3>
          
          <div className="mb-6">
            <label className="block mb-2">Marital Status</label>
            <div className="flex gap-3">
              {(['Married', 'Unmarried'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setMaritalStatus(status)}
                  className={`px-8 py-3 rounded-lg transition-all ${
                    maritalStatus === status
                      ? 'bg-[#1E3A8A] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:shadow-md'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="guardianName" className="block mb-2">
                {maritalStatus === 'Married' ? 'Husband Name' : 'Father Name'}
              </label>
              <input
                id="guardianName"
                type="text"
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
                placeholder="Sri Ramesh Kumar"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="guardianPhone" className="block mb-2">Guardian Phone</label>
              <input
                id="guardianPhone"
                type="tel"
                value={guardianPhone}
                onChange={(e) => setGuardianPhone(e.target.value)}
                placeholder="9876543210"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Identification & Contact */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h3 className="mb-6">Identification {'&'} Contact</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block mb-2">Phone Number</label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876543210"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="aadhaar" className="block mb-2">Aadhaar Number</label>
              <input
                id="aadhaar"
                type="text"
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value)}
                placeholder="xxxx-xxxx-1234"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="uhid" className="block mb-2">UHID</label>
              <input
                id="uhid"
                type="text"
                value={uhid}
                onChange={(e) => setUhid(e.target.value)}
                placeholder="UHID-IND-9087"
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
                placeholder="Malleshwaram, Bengaluru"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Section 5: Clinical Notes */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h3 className="mb-6">Clinical Notes</h3>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="complaints" className="block mb-2">Complaints</label>
              <textarea
                id="complaints"
                value={complaints}
                onChange={(e) => setComplaints(e.target.value)}
                placeholder="Lower abdominal pain"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label htmlFor="remarks" className="block mb-2">Remarks</label>
              <textarea
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Second trimester"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>

        {/* Section 6: Doctor Selection */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h3 className="mb-6">Select Doctor</h3>
          
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
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl px-8 py-4 no-print">
        <div className="max-w-5xl mx-auto flex gap-4">
          <button
            onClick={() => handleSave('save')}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#152D6B] transition-colors shadow-md hover:shadow-lg"
          >
            <Save className="w-5 h-5" />
            Save
          </button>
          <button
            onClick={() => handleSave('print')}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#C2185B] text-white rounded-lg hover:bg-[#9C1549] transition-colors shadow-md hover:shadow-lg"
          >
            <Printer className="w-5 h-5" />
            Save {'&'} Print
          </button>
          <button
            onClick={() => handleSave('whatsapp')}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#25D366] text-white rounded-lg hover:bg-[#1EAD52] transition-colors shadow-md hover:shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            Save {'&'} WhatsApp
          </button>
        </div>
      </div>

      {/* Print Preview */}
      {showPrintPreview && savedPatient && (
        <RegistrationPrintPreview 
          patient={savedPatient} 
          onClose={() => setShowPrintPreview(false)} 
          onPrint={() => window.print()}
        />
      )}
    </div>
  );
}