import { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Printer, MessageCircle, Receipt as ReceiptIcon, Heart } from 'lucide-react';
import { Patient } from '../App';

interface BillingReceiptProps {
  patient: Patient;
  onBack: () => void;
}

interface Charge {
  id: string;
  description: string;
  amount: number;
}

export function BillingReceipt({ patient, onBack }: BillingReceiptProps) {
  const [charges, setCharges] = useState<Charge[]>([
    { id: '1', description: 'Consultation', amount: 500 },
    { id: '2', description: 'Scan', amount: 1200 }
  ]);
  const [newDescription, setNewDescription] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState<'Cash' | 'UPI' | 'Card'>('Cash');
  const [showReceipt, setShowReceipt] = useState(false);

  const total = charges.reduce((sum, charge) => sum + charge.amount, 0);

  const handleAddCharge = () => {
    if (newDescription && newAmount) {
      const charge: Charge = {
        id: Date.now().toString(),
        description: newDescription,
        amount: parseFloat(newAmount)
      };
      setCharges([...charges, charge]);
      setNewDescription('');
      setNewAmount('');
    }
  };

  const handleRemoveCharge = (id: string) => {
    setCharges(charges.filter(c => c.id !== id));
  };

  const handleGenerateReceipt = () => {
    setShowReceipt(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsApp = () => {
    const message = `Receipt - Maternity & Nursing Home\n\nPatient: ${patient.name}\nDate: ${new Date().toLocaleDateString('en-IN')}\n\nCharges:\n${charges.map(c => `${c.description}: ₹${c.amount}`).join('\n')}\n\nTotal: ₹${total}\nPayment Mode: ${paymentMode}\n\nThank you!`;
    const whatsappUrl = `https://wa.me/91${patient.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const receiptNumber = `RCP-${Date.now().toString().slice(-8)}`;

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-white shadow-sm px-8 py-4 no-print">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#1E3A8A]" />
          </button>
          <h1 className="m-0">Billing {'&'} Receipt</h1>
        </div>
      </div>

      <div className="p-8 max-w-5xl mx-auto">
        {!showReceipt ? (
          <>
            {/* Patient Info */}
            <div className="bg-[#FDE7F0] rounded-2xl shadow-md p-6 mb-6 no-print">
              <h3 className="mb-4">Patient Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm opacity-70 mb-1">Name</p>
                  <p className="m-0">{patient.name}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70 mb-1">UHID</p>
                  <p className="m-0">{patient.uhid}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70 mb-1">Phone</p>
                  <p className="m-0">{patient.phone}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70 mb-1">Age</p>
                  <p className="m-0">{patient.age} years</p>
                </div>
              </div>
            </div>

            {/* Charges */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6 no-print">
              <h3 className="mb-6">Charges</h3>
              
              <div className="space-y-3 mb-6">
                {charges.map((charge) => (
                  <div key={charge.id} className="flex items-center justify-between bg-[#E8F2FF] p-4 rounded-lg">
                    <div className="flex-1">
                      <p className="m-0">{charge.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="m-0">₹{charge.amount.toFixed(2)}</p>
                      <button
                        onClick={() => handleRemoveCharge(charge.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Description (e.g., Medicine)"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
                />
                <input
                  type="number"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  placeholder="Amount"
                  className="w-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
                />
                <button
                  onClick={handleAddCharge}
                  className="px-6 py-3 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#152D6B] transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add
                </button>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center bg-[#FDE7F0] p-4 rounded-lg">
                  <p className="m-0">Total Amount</p>
                  <p className="m-0">₹{total.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Payment Mode */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6 no-print">
              <h3 className="mb-4">Payment Mode</h3>
              <div className="flex gap-3">
                {(['Cash', 'UPI', 'Card'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setPaymentMode(mode)}
                    className={`flex-1 px-8 py-4 rounded-lg transition-all ${
                      paymentMode === mode
                        ? 'bg-[#C2185B] text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:shadow-md'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 no-print">
              <button
                onClick={handleGenerateReceipt}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#C2185B] text-white rounded-lg hover:bg-[#9C1549] transition-colors shadow-md hover:shadow-lg"
              >
                <ReceiptIcon className="w-5 h-5" />
                Generate Receipt
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Receipt Preview */}
            <div className="bg-white rounded-2xl shadow-2xl p-12 mb-6">
              {/* Hospital Header */}
              <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-[#C2185B] rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" fill="white" />
                  </div>
                </div>
                <h2 className="m-0 mb-2">Maternity {'&'} Nursing Home</h2>
                <p className="m-0 text-sm">Bengaluru, Karnataka</p>
                <p className="m-0 text-sm">Phone: +91 80 1234 5678</p>
              </div>

              {/* Receipt Info */}
              <div className="mb-8">
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-sm opacity-70 mb-1">Receipt Number</p>
                    <p className="m-0">{receiptNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-70 mb-1">Date</p>
                    <p className="m-0">{new Date().toLocaleDateString('en-IN')}</p>
                  </div>
                </div>
                <div className="bg-[#FDE7F0] p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm opacity-70 mb-1">Patient Name</p>
                      <p className="m-0">{patient.name}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-70 mb-1">UHID</p>
                      <p className="m-0">{patient.uhid}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-70 mb-1">Age / Sex</p>
                      <p className="m-0">{patient.age} / {patient.sex}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-70 mb-1">Phone</p>
                      <p className="m-0">{patient.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charges Table */}
              <div className="mb-8">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3">Description</th>
                      <th className="text-right py-3">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {charges.map((charge) => (
                      <tr key={charge.id} className="border-b border-gray-200">
                        <td className="py-3">{charge.description}</td>
                        <td className="text-right py-3">₹{charge.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-300">
                      <td className="py-4">
                        <p className="m-0">Total Amount</p>
                      </td>
                      <td className="text-right py-4">
                        <p className="m-0">₹{total.toFixed(2)}</p>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Payment Info */}
              <div className="bg-[#E8F2FF] p-4 rounded-lg mb-8">
                <div className="flex justify-between">
                  <p className="m-0">Payment Mode</p>
                  <p className="m-0">{paymentMode}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center text-sm text-gray-600 pt-6 border-t border-gray-200">
                <p className="m-0">Thank you for choosing our services</p>
                <p className="m-0 mt-2">Get well soon!</p>
              </div>
            </div>

            {/* Print Actions */}
            <div className="flex gap-4 no-print">
              <button
                onClick={() => setShowReceipt(false)}
                className="flex-1 px-6 py-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#C2185B] text-white rounded-lg hover:bg-[#9C1549] transition-colors shadow-md hover:shadow-lg"
              >
                <Printer className="w-5 h-5" />
                Print Receipt
              </button>
              <button
                onClick={handleWhatsApp}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#25D366] text-white rounded-lg hover:bg-[#1EAD52] transition-colors shadow-md hover:shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Receipt
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
