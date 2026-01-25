import { useState } from "react";
import { assets } from "../../assets/assets";
import { calculateAge } from "../../utils/CalculateAge";
import ConfirmMessage from "../../components/ConfirmMessage";
import { useAppContext } from "../../context/AppContext";

const AdminAppointmentsPage = () => {
  const { currency, appointments } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="w-full flex flex-col gap-4 items-start m-4 overflow-auto">
      <p className="text-xl text-gray-700 font-medium">All Appointments</p>
      <div className="flex flex-col items-center bg-white w-full pt-4 border border-gray-300 rounded-lg overflow-y-auto h-[400px] shadow-sm">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-gray-300 w-full text-gray-600 font-semibold">
          <p className="text-gray-700">#</p>
          <p>Patient</p>
          <p>Paid</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Active</p>
        </div>
        {appointments &&
          appointments?.map((item, index) => (
            <div
              key={item.AppointmentInfo.id}
              className="w-full sm:grid grid-cols-[0.5fr_3fr_1fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col items-center py-3 px-6 border-b border-gray-300 hover:bg-green-100 cursor-pointer transition-all duration-300"
            >
              <p className="text-gray-500 text-sm">{index + 1}</p>
              <div className="flex flex-row items-center gap-2 text-gray-500 text-sm">
                <img
                  src={item.patientInfo.image}
                  className="w-12 rounded-full bg-blue-100"
                  alt=""
                />
                <p>{item.patientInfo.name}</p>
              </div>
              {item.AppointmentInfo.payment ? (
                <p className="text-sm text-gray-500">paid</p>
              ) : (
                <p className="text-sm text-gray-500">cash</p>
              )}

              <p className="text-sm text-gray-500">
                {calculateAge(item.patientInfo?.dob)}
              </p>
              <p className="text-sm text-gray-500">
                {item.AppointmentInfo.slotDate} &{" "}
                {item.AppointmentInfo.slotTime}
              </p>
              <div className="flex flex-row items-center gap-2 text-gray-500 text-sm">
                <img
                  className="w-12 rounded-full bg-blue-100"
                  src={item.doctorInfo.image}
                  alt=""
                />
                <p>{item.doctorInfo.name}</p>
              </div>
              <p className="text-sm text-gray-500">
                {item.AppointmentInfo.amount + " " + currency}
              </p>
              {item.AppointmentInfo.status === "scheduled" ? (
                <img
                  className="w-12 rounded-full"
                  src={assets.cancel_icon}
                  onClick={() => {
                    setShowModal(true);
                    setSelectedId(item.AppointmentInfo.id);
                  }}
                  alt=""
                />
              ) : item.AppointmentInfo.status === "cancelled" ? (
                <p className="text-red-500">cancelled</p>
              ) : (
                <p className="text-green-500">completed</p>
              )}
            </div>
          ))}
        {appointments?.length === 0 && (
          <p className="py-10 text-center text-gray-400">
            No appointments found.
          </p>
        )}
      </div>
      <ConfirmMessage
        selectedId={selectedId}
        showModal={showModal}
        setShowModal={setShowModal}
        status="cancelled"
      />
    </div>
  );
};

export default AdminAppointmentsPage;
