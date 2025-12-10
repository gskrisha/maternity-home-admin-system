import { Heart } from 'lucide-react';
import { Patient } from '../App';

interface RegistrationPrintPreviewProps {
  patient: Patient;
  onClose: () => void;
  onPrint: () => void;
}

export function RegistrationPrintPreview({ patient, onClose, onPrint }: RegistrationPrintPreviewProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Print Actions - Hidden on Print */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between no-print">
          <h3 className="m-0">Registration Form Preview</h3>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
            <button
              onClick={onPrint}
              className="px-6 py-2 bg-[#C2185B] text-white rounded-lg hover:bg-[#9C1549] transition-colors"
            >
              Print
            </button>
          </div>
        </div>

        {/* Printable Content */}
        <div className="p-12">
          {/* Hospital Header */}
          <div className="text-center mb-8 pb-6 border-b-2 border-[#C2185B]">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-[#C2185B] rounded-full flex items-center justify-center">
                <Heart className="w-10 h-10 text-white" fill="white" />
              </div>
            </div>
            <h2 className="m-0 mb-2">MANJUNATHA MATERNITY HOME  {'&'} SURGICAL CENTER</h2>
            <p className="m-0 text-sm mb-1">90/1 Between 17th and 18th Cross, West Park Road, Malleshwaram, Bangalore -560055</p>
            <p className="m-0 text-sm">Phone: 23341332 / 23562349 | Email: info@maternitycare.in</p>
          </div>

          {/* Form Title */}
          <div className="text-center mb-8">
            <h3 className="m-0 mb-2">Patient Registration Form</h3>
            <div className="inline-block bg-[#FDE7F0] px-6 py-3 rounded-lg">
              <p className="text-sm mb-1 opacity-70">Application Number</p>
              <p className="m-0">{patient.applicationNumber}</p>
            </div>
          </div>

          {/* Visit Information */}
          <div className="mb-6">
            <div className="bg-[#E8F2FF] px-4 py-2 rounded-t-lg">
              <p className="m-0">Visit Information</p>
            </div>
            <div className="border-2 border-[#E8F2FF] border-t-0 rounded-b-lg p-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm opacity-70 mb-1">Visit Type</p>
                  <p className="m-0">
                    {patient.visitType === 'OP' ? 'Out Patient' : 
                     patient.visitType === 'IP' ? 'In Patient' : 'Emergency'}
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-70 mb-1">Registration Date</p>
                  <p className="m-0">{new Date(patient.createdAt).toLocaleDateString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70 mb-1">Assigned Doctor</p>
                  <p className="m-0">{patient.doctor}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Details */}
          <div className="mb-6">
            <div className="bg-[#FDE7F0] px-4 py-2 rounded-t-lg">
              <p className="m-0">Patient Details</p>
            </div>
            <div className="border-2 border-[#FDE7F0] border-t-0 rounded-b-lg p-4">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <p className="text-sm opacity-70 mb-1">Patient Name</p>
                  <p className="m-0">{patient.name}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70 mb-1">Sex</p>
                  <p className="m-0">{patient.sex}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70 mb-1">Date of Birth</p>
                  <p className="m-0">{new Date(patient.dob).toLocaleDateString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70 mb-1">Age</p>
                  <p className="m-0">{patient.age} years</p>
                </div>
                <div>
                  <p className="text-sm opacity-70 mb-1">Blood Group</p>
                  <p className="m-0">
                    <span className="inline-block bg-[#C2185B] text-white px-3 py-1 rounded-full text-sm">
                      {patient.bloodGroup}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-70 mb-1">Marital Status</p>
                  <p className="m-0">{patient.maritalStatus}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Family Details */}
          <div className="mb-6">
            <div className="bg-[#E8F2FF] px-4 py-2 rounded-t-lg">
              <p className="m-0">Family Details</p>
            </div>
            <div className="border-2 border-[#E8F2FF] border-t-0 rounded-b-lg p-4">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <p className="text-sm opacity-70 mb-1">
                    {patient.maritalStatus === 'Married' ? 'Husband Name' : 'Father Name'}
                  </p>
                  <p className="m-0">{patient.guardianName}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70 mb-1">Guardian Phone</p>
                  <p className="m-0">{patient.guardianPhone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Identification */}
          <div className="mb-6">
            <div className="bg-[#FDE7F0] px-4 py-2 rounded-t-lg">
              <p className="m-0">Contact {'&'} Identification</p>
            </div>
            <div className="border-2 border-[#FDE7F0] border-t-0 rounded-b-lg p-4">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <p className="text-sm opacity-70 mb-1">Phone Number</p>
                  <p className="m-0">{patient.phone}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70 mb-1">Aadhaar Number</p>
                  <p className="m-0">{patient.aadhaar}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70 mb-1">UHID</p>
                  <p className="m-0">{patient.uhid}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70 mb-1">Address</p>
                  <p className="m-0">{patient.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Clinical Information */}
          <div className="mb-6">
            <div className="bg-[#E8F2FF] px-4 py-2 rounded-t-lg">
              <p className="m-0">Clinical Information</p>
            </div>
            <div className="border-2 border-[#E8F2FF] border-t-0 rounded-b-lg p-4">
              <div className="mb-4">
                <p className="text-sm opacity-70 mb-1">Complaints</p>
                <p className="m-0">{patient.complaints || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm opacity-70 mb-1">Remarks</p>
                <p className="m-0">{patient.remarks || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="mt-12 grid grid-cols-2 gap-12">
            <div>
              <div className="border-t-2 border-gray-300 pt-2">
                <p className="text-sm m-0">Patient / Guardian Signature</p>
              </div>
            </div>
            <div>
              <div className="border-t-2 border-gray-300 pt-2">
                <p className="text-sm m-0">Authorized Signature</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600 m-0">
              This is a computer-generated document. Please preserve this form for future reference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
