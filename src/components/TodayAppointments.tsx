import { useState } from 'react';
import { ArrowLeft, Plus, Clock, Phone, CheckCircle, XCircle, Calendar } from 'lucide-react';
import { Appointment } from '../App';

interface TodayAppointmentsProps {
  onBack: () => void;
}

const doctors = [
  { id: '1', name: 'Dr. Sushma Rao', specialty: 'OBG' },
  { id: '2', name: 'Dr. Meenakshi Iyer', specialty: 'Consultant' },
  { id: '3', name: 'Dr. Priya Sharma', specialty: 'Pediatrician' }
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
  '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM'
];

export function TodayAppointments({ onBack }: TodayAppointmentsProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patientName: 'Smt. Lakshmi Venkat',
      phone: '9876543210',
      age: 28,
      doctor: 'Dr. Sushma Rao',
      timeSlot: '10:00 AM',
      type: 'Online',
      status: 'Scheduled',
      date: new Date().toISOString()
    },
    {
      id: '2',
      patientName: 'Smt. Divya Reddy',
      phone: '9988776655',
      age: 26,
      doctor: 'Dr. Meenakshi Iyer',
      timeSlot: '11:00 AM',
      type: 'Online',
      status: 'Confirmed',
      date: new Date().toISOString()
    },
    {
      id: '3',
      patientName: 'Smt. Preethi Kumar',
      phone: '9123456789',
      age: 30,
      doctor: 'Dr. Sushma Rao',
      timeSlot: '11:30 AM',
      type: 'Walk-in',
      status: 'Scheduled',
      date: new Date().toISOString()
    },
    {
      id: '4',
      patientName: 'Smt. Ananya Sharma',
      phone: '9845678901',
      age: 25,
      doctor: 'Dr. Priya Sharma',
      timeSlot: '04:30 PM',
      type: 'Online',
      status: 'Scheduled',
      date: new Date().toISOString()
    },
    {
      id: '5',
      patientName: 'Smt. Meera Iyer',
      phone: '9767890123',
      age: 32,
      doctor: 'Dr. Meenakshi Iyer',
      timeSlot: '05:00 PM',
      type: 'Online',
      status: 'Confirmed',
      date: new Date().toISOString()
    }
  ]);

  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [newPatientName, setNewPatientName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAge, setNewAge] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const handleUpdateStatus = (id: string, status: Appointment['status']) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status } : apt
    ));
  };

  const handleScheduleAppointment = () => {
    if (!newPatientName || !newPhone || !newAge || !selectedDoctor || !selectedTimeSlot) {
      alert('Please fill in all fields');
      return;
    }

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      patientName: newPatientName,
      phone: newPhone,
      age: parseInt(newAge),
      doctor: selectedDoctor,
      timeSlot: selectedTimeSlot,
      type: 'Walk-in',
      status: 'Scheduled',
      date: new Date().toISOString()
    };

    setAppointments([...appointments, newAppointment].sort((a, b) => {
      const timeA = a.timeSlot.replace(/AM|PM/, '').trim();
      const timeB = b.timeSlot.replace(/AM|PM/, '').trim();
      return timeA.localeCompare(timeB);
    }));

    // Reset form
    setNewPatientName('');
    setNewPhone('');
    setNewAge('');
    setSelectedDoctor('');
    setSelectedTimeSlot('');
    setShowScheduleForm(false);
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-700';
      case 'Confirmed':
        return 'bg-green-100 text-green-700';
      case 'Completed':
        return 'bg-gray-100 text-gray-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const scheduledCount = appointments.filter(a => a.status === 'Scheduled').length;
  const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;
  const completedCount = appointments.filter(a => a.status === 'Completed').length;
  const onlineCount = appointments.filter(a => a.type === 'Online').length;

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-white shadow-sm px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-[#1E3A8A]" />
            </button>
            <h1 className="m-0">Today&apos;s Appointments</h1>
          </div>
          <button
            onClick={() => setShowScheduleForm(!showScheduleForm)}
            className="flex items-center gap-2 px-6 py-3 bg-[#C2185B] text-white rounded-lg hover:bg-[#9C1549] transition-colors shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Schedule Appointment
          </button>
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#E8F2FF] p-6 rounded-xl shadow-md">
            <p className="text-sm mb-2 opacity-70">Total Appointments</p>
            <p className="m-0">{appointments.length}</p>
          </div>
          <div className="bg-[#FDE7F0] p-6 rounded-xl shadow-md">
            <p className="text-sm mb-2 opacity-70">Online Bookings</p>
            <p className="m-0">{onlineCount}</p>
          </div>
          <div className="bg-[#E8F2FF] p-6 rounded-xl shadow-md">
            <p className="text-sm mb-2 opacity-70">Confirmed</p>
            <p className="m-0">{confirmedCount}</p>
          </div>
          <div className="bg-[#FDE7F0] p-6 rounded-xl shadow-md">
            <p className="text-sm mb-2 opacity-70">Completed</p>
            <p className="m-0">{completedCount}</p>
          </div>
        </div>

        {/* Schedule Form */}
        {showScheduleForm && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
            <h3 className="mb-6">Schedule New Appointment</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="patientName" className="block mb-2">Patient Name</label>
                <input
                  id="patientName"
                  type="text"
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  placeholder="Smt. Patient Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block mb-2">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="9876543210"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="age" className="block mb-2">Age</label>
                <input
                  id="age"
                  type="number"
                  value={newAge}
                  onChange={(e) => setNewAge(e.target.value)}
                  placeholder="25"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2">Select Doctor</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {doctors.map((doctor) => (
                  <button
                    key={doctor.id}
                    onClick={() => setSelectedDoctor(doctor.name)}
                    className={`p-4 rounded-xl transition-all text-left ${
                      selectedDoctor === doctor.name
                        ? 'bg-[#1E3A8A] text-white shadow-lg'
                        : 'bg-[#E8F2FF] text-[#1E3A8A] hover:shadow-md'
                    }`}
                  >
                    <p className="m-0 mb-1">{doctor.name}</p>
                    <p className={`text-sm m-0 ${selectedDoctor === doctor.name ? 'opacity-90' : 'opacity-70'}`}>
                      {doctor.specialty}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2">Select Time Slot</label>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`px-3 py-2 rounded-lg transition-all text-sm ${
                      selectedTimeSlot === slot
                        ? 'bg-[#C2185B] text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:shadow-md'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleScheduleAppointment}
                className="flex-1 px-6 py-3 bg-[#C2185B] text-white rounded-lg hover:bg-[#9C1549] transition-colors shadow-md hover:shadow-lg"
              >
                Schedule Appointment
              </button>
              <button
                onClick={() => setShowScheduleForm(false)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Appointments List */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="mb-6">Appointment Schedule</h3>
          
          {appointments.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No appointments scheduled for today</p>
            </div>
          ) : (
            <div className="space-y-3">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className={`p-6 rounded-xl ${
                    appointment.type === 'Online' ? 'bg-[#E8F2FF]' : 'bg-[#FDE7F0]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-[#1E3A8A]" />
                          <p className="m-0">{appointment.timeSlot}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          appointment.type === 'Online' 
                            ? 'bg-[#1E3A8A] text-white' 
                            : 'bg-[#C2185B] text-white'
                        }`}>
                          {appointment.type}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm opacity-70 mb-1">Patient Name</p>
                          <p className="m-0">{appointment.patientName}</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-70 mb-1">Phone</p>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <p className="m-0">{appointment.phone}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm opacity-70 mb-1">Age</p>
                          <p className="m-0">{appointment.age} years</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-70 mb-1">Doctor</p>
                          <p className="m-0">{appointment.doctor}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      {appointment.status === 'Scheduled' && (
                        <button
                          onClick={() => handleUpdateStatus(appointment.id, 'Confirmed')}
                          className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                          title="Confirm"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      )}
                      {(appointment.status === 'Scheduled' || appointment.status === 'Confirmed') && (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(appointment.id, 'Completed')}
                            className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            title="Complete"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(appointment.id, 'Cancelled')}
                            className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                            title="Cancel"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
