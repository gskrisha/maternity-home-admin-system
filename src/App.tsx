import { useState } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { NewPatientRegistration } from './components/NewPatientRegistration';
import { SearchPatient } from './components/SearchPatient';
import { PatientProfile } from './components/PatientProfile';
import { BillingReceipt } from './components/BillingReceipt';
import { Reports } from './components/Reports';
import { Settings } from './components/Settings';
import { TodayAppointments } from './components/TodayAppointments';

type Screen = 
  | 'login' 
  | 'dashboard' 
  | 'new-patient' 
  | 'search-patient' 
  | 'patient-profile' 
  | 'billing'
  | 'reports'
  | 'settings'
  | 'appointments';

export interface Patient {
  id: string;
  applicationNumber: string;
  visitType: 'OP' | 'IP' | 'EM';
  name: string;
  sex: 'Female' | 'Male' | 'Other';
  dob: string;
  age: number;
  bloodGroup: string;
  maritalStatus: 'Married' | 'Unmarried';
  guardianName: string;
  guardianPhone: string;
  phone: string;
  aadhaar: string;
  uhid: string;
  address: string;
  complaints: string;
  remarks: string;
  doctor: string;
  visits: Visit[];
  createdAt: string;
}

export interface Visit {
  id: string;
  date: string;
  complaints: string;
  diagnosis: string;
  doctor: string;
  notes: string;
}

export interface BillingData {
  patientId: string;
  patientName: string;
  charges: { description: string; amount: number }[];
  paymentMode: 'Cash' | 'UPI' | 'Card';
  total: number;
  receiptNumber: string;
  date: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  age: number;
  doctor: string;
  timeSlot: string;
  type: 'Online' | 'Walk-in';
  status: 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled';
  date: string;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [billingData, setBillingData] = useState<BillingData | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleAddPatient = (patient: Patient) => {
    setPatients([...patients, patient]);
    setCurrentScreen('dashboard');
  };

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setCurrentScreen('patient-profile');
  };

  const handleAddVisit = (visit: Visit) => {
    if (selectedPatient) {
      const updatedPatient = {
        ...selectedPatient,
        visits: [...selectedPatient.visits, visit]
      };
      setSelectedPatient(updatedPatient);
      setPatients(patients.map(p => p.id === updatedPatient.id ? updatedPatient : p));
    }
  };

  const handleCreateBilling = (patient: Patient) => {
    setSelectedPatient(patient);
    setCurrentScreen('billing');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {currentScreen === 'dashboard' && (
        <Dashboard onNavigate={handleNavigate} />
      )}
      {currentScreen === 'new-patient' && (
        <NewPatientRegistration 
          onSave={handleAddPatient}
          onCancel={() => setCurrentScreen('dashboard')}
        />
      )}
      {currentScreen === 'search-patient' && (
        <SearchPatient 
          patients={patients}
          onSelectPatient={handleSelectPatient}
          onBack={() => setCurrentScreen('dashboard')}
        />
      )}
      {currentScreen === 'patient-profile' && selectedPatient && (
        <PatientProfile 
          patient={selectedPatient}
          onAddVisit={handleAddVisit}
          onCreateBilling={handleCreateBilling}
          onBack={() => setCurrentScreen('dashboard')}
        />
      )}
      {currentScreen === 'billing' && selectedPatient && (
        <BillingReceipt 
          patient={selectedPatient}
          onBack={() => setCurrentScreen('patient-profile')}
        />
      )}
      {currentScreen === 'reports' && (
        <Reports onBack={() => setCurrentScreen('dashboard')} />
      )}
      {currentScreen === 'settings' && (
        <Settings onBack={() => setCurrentScreen('dashboard')} />
      )}
      {currentScreen === 'appointments' && (
        <TodayAppointments onBack={() => setCurrentScreen('dashboard')} />
      )}
    </div>
  );
}

export default App;