import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import ConfirmMessage from "../../components/ConfirmMessage";
import type {
  AppointmentsType,
  ResponseType,
  DoctorStatisticsType,
} from "../../types";
import { toast } from "react-toastify";
import axios from "axios";
import { useDoctorContext } from "../../context/DoctorContext";
import { useAppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const { appointmentsForDoctor, dToken } = useDoctorContext();
  const { backendUrl, currency } = useAppContext();
  const [statisticsInfo, setStatisticsInfo] = useState<DoctorStatisticsType>();
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  let filterdAppointments: AppointmentsType[] = [];
  if (appointmentsForDoctor) {
    filterdAppointments = appointmentsForDoctor.filter(
      (item) => item.AppointmentInfo.status === "scheduled",
    );
  }

  useEffect(() => {
    const getAllStatistics = async () => {
      try {
        const { data } = await axios.post<ResponseType>(
          `${backendUrl}/api/doctor/get-statistics`,
          {},
          {
            headers: { dToken },
          },
        );
        if (data.success) {
          setStatisticsInfo(data.statistics);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        const err = error as Error;
        toast.error(err.message);
        console.log(error);
      }
    };
    if (dToken) {
      getAllStatistics();
    }
  }, []);

  return (
    <div className="w-full flex flex-col flex-start gap-20 p-2 lg:p-8">
      <div className="w-full flex flex-row items-center gap-8 overflow-auto">
        <div className="flex flex-col flex-shrink-0 items-start gap-2 bg-white py-2 pl-6 pr-14 rounded-lg">
          <p className="text-gray-500">
            Total Earnings:{" "}
            <span className="text-gray-900">
              {statisticsInfo?.earnings.totalEarnings + currency}
            </span>
          </p>
          <div className="flex flex-row items-center gap-2 ">
            <img src={assets.earning_icon} className="w-20" alt="doctor icon" />

            <div className="flex flex-col items-start gap-1">
              <div className="flex flex-row items-center gap-1">
                <div className="p-1 bg-blue-500 rounded-full"></div>
                <p className="text-sm text-green-500">
                  Paid:{" "}
                  <span className="text-gray-500">
                    {statisticsInfo?.earnings.paidEarnings + currency}
                  </span>
                </p>
              </div>
              <div className="flex flex-row items-center gap-1">
                <div className="p-1 bg-blue-500 rounded-full"></div>
                <p className="text-sm text-blue-500">
                  Cash:{" "}
                  <span className="text-gray-500">
                    {statisticsInfo?.earnings.cashEarnings + currency}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-shrink-0 items-start gap-2 bg-white py-2 pl-6 pr-14 rounded-lg">
          <p className="text-gray-500">
            Appointments:{" "}
            <span className="text-gray-900">
              {statisticsInfo?.appointments.total}
            </span>
          </p>
          <div className="flex flex-row items-center gap-2 ">
            <img
              src={assets.appointments_icon}
              className="w-20"
              alt="doctor icon"
            />

            <div className="flex flex-col items-start gap-1">
              <div className="flex flex-row items-center gap-1">
                <div className="p-1 bg-blue-500 rounded-full"></div>
                <p className="text-sm text-blue-500">
                  Scheduled:{" "}
                  <span className="text-gray-500">
                    {statisticsInfo?.appointments.scheduled}
                  </span>
                </p>
              </div>
              <div className="flex flex-row items-center gap-1">
                <div className="p-1 bg-green-500 rounded-full"></div>
                <p className="text-sm text-green-500">
                  Completed:{" "}
                  <span className="text-gray-500">
                    {statisticsInfo?.appointments.completed}
                  </span>
                </p>
              </div>
              <div className="flex flex-row items-center gap-1">
                <div className="p-1 bg-red-500 rounded-full"></div>
                <p className="text-sm text-red-500">
                  Cancelled:{" "}
                  <span className="text-gray-500">
                    {statisticsInfo?.appointments.cancelled}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col  flex-shrink-0  items-start gap-2 bg-white py-2 pl-6 pr-14 rounded-lg">
          <p className="text-gray-500">
            Patients:{" "}
            <span className="text-gray-900">
              {statisticsInfo?.patients.total_patients}
            </span>
          </p>
          <div className="flex flex-row items-center gap-2 ">
            <img
              src={assets.patients_icon}
              className="w-20"
              alt="doctor icon"
            />

            <div className="flex flex-col items-start gap-1">
              <div className="flex flex-row items-center gap-1">
                <div className="p-1 bg-blue-500 rounded-full"></div>
                <p className="text-sm text-blue-500">
                  Active:{" "}
                  <span className="text-gray-500">
                    {statisticsInfo?.patients.active_patients}
                  </span>
                </p>
              </div>

              <div className="flex flex-row items-center gap-1">
                <div className="p-1 bg-red-500 rounded-full"></div>
                <p className="text-sm text-red-500">
                  Loast Patients:{" "}
                  <span className="text-gray-500">
                    {statisticsInfo?.patients.lost_patients}
                  </span>
                </p>
              </div>

              <div className="flex flex-row items-center gap-1">
                <div className="p-1 bg-green-500 rounded-full"></div>
                <p className="text-sm text-green-500">
                  Completed Patients:{" "}
                  <span className="text-gray-500">
                    {statisticsInfo?.patients.complete_patients}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-3/4 xl:w-1/2 bg-white rounded-lg">
        <div className="flex flex-row text-xl items-start gap-2 p-4 border-b border-gray-300">
          <img src={assets.list_icon} className="w-6" alt="" />
          <p className="text-gray-500 font-semibold">Latest Appointment</p>
        </div>
        {filterdAppointments &&
          filterdAppointments.map((item) => (
            <div
              key={item.AppointmentInfo.id}
              className="w-full flex flex-row items-center justify-between p-4 border-b border-gray-300 cursor-pointer hover:bg-green-100 transition-all duration-300"
            >
              <div className="flex flex-row items-start gap-2">
                <img
                  src={item.doctorInfo.image}
                  className="w-14 rounded-full bg-blue-100"
                  alt=""
                />
                <div className="flex flex-col items-start gap-1">
                  <p className="font-semibold text-gray-700">
                    {item.doctorInfo.name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Booking on {item.AppointmentInfo.slotDate} |{" "}
                    {item.AppointmentInfo.slotTime}
                  </p>
                </div>
              </div>

              <img
                src={assets.cancel_icon}
                onClick={() => {
                  setSelectedId(item.AppointmentInfo.id);
                  setShowModal(true);
                }}
                alt=""
              />
            </div>
          ))}
      </div>
      <ConfirmMessage
        selectedId={selectedId}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default DoctorDashboard;
