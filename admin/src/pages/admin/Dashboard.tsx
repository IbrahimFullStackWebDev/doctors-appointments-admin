import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { useAdminContext } from "../../context/AdminContext";
import ConfirmMessage from "../../components/ConfirmMessage";
import type {
  AppointmentsType,
  ResponseType,
  AdminStatisticsType,
} from "../../types";
import { toast } from "react-toastify";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";

const AdminDashboard = () => {
  const { aToken } = useAdminContext();
  const { appointments, backendUrl } = useAppContext();
  const [statisticsInfo, setStatisticsInfo] = useState<AdminStatisticsType>();
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  let filterdAppointments: AppointmentsType[] = [];
  if (appointments) {
    filterdAppointments = appointments.filter(
      (item) => item.AppointmentInfo.status === "scheduled",
    );
  }

  useEffect(() => {
    const getAllStatistics = async () => {
      try {
        const { data } = await axios.post<ResponseType>(
          `${backendUrl}/api/admin/get-statistics`,
          {},
          {
            headers: { aToken },
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
    if (aToken) {
      getAllStatistics();
    }
  }, [aToken, backendUrl]);

  return statisticsInfo ? (
    <div className="w-full flex flex-col flex-start gap-20 p-2 lg:p-8 overflow-auto">
      <div className="w-full flex flex-row items-center gap-8">
        <div className="flex flex-col flex-shrink-0 items-start gap-2 bg-white py-2 pl-6 pr-14 rounded-lg">
          <p className="text-gray-500">
            Doctors:{" "}
            <span className="text-gray-700 font-semibold">
              {statisticsInfo?.doctors.total}
            </span>
          </p>
          <div className="flex flex-row items-center gap-2 ">
            <img src={assets.doctor_icon} className="w-20" alt="doctor icon" />

            <div className="flex flex-col items-start gap-1">
              <div className="flex flex-row items-center gap-1">
                <div className="p-1 bg-blue-500 rounded-full"></div>
                <p className="text-sm text-green-500">
                  Available: {statisticsInfo?.doctors.available}
                </p>
              </div>
              <div className="flex flex-row items-center gap-1">
                <div className="p-1 bg-red-500 rounded-full"></div>
                <p className="text-sm text-red-500">
                  notAvailable: {statisticsInfo?.doctors.notAvailable}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-shrink-0 items-start gap-2 bg-white py-2 pl-6 pr-14 rounded-lg">
          <p className="text-gray-500">
            Appointments:{" "}
            <span className="text-gray-700 font-semibold">
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
                  Scheduled: {statisticsInfo?.appointments.scheduled}
                </p>
              </div>
              <div className="flex flex-row items-center gap-1">
                <div className="p-1 bg-green-500 rounded-full"></div>
                <p className="text-sm text-green-500">
                  Completed: {statisticsInfo?.appointments.completed}
                </p>
              </div>
              <div className="flex flex-row items-center gap-1">
                <div className="p-1 bg-red-500 rounded-full"></div>
                <p className="text-sm text-red-500">
                  Cancelled: {statisticsInfo?.appointments.cancelled}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col  flex-shrink-0  items-start gap-2 bg-white py-2 pl-6 pr-14 rounded-lg">
          <p className="text-gray-500">
            Patients:{" "}
            <span className="text-gray-700 font-semibold">
              {statisticsInfo?.users.total}
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
                <div className="p-1 bg-green-500 rounded-full"></div>
                <p className="text-sm text-green-500">
                  Active: {statisticsInfo?.users.active}
                </p>
              </div>

              <div className="flex flex-row items-center gap-1">
                <div className="p-1 bg-red-500 rounded-full"></div>
                <p className="text-sm text-red-500">
                  notActive: {statisticsInfo?.users.notActive}
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
        status="cancelled"
      />
    </div>
  ) : (
    <div className="p-10 animate-pulse text-gray-400">Loading Dashboard...</div>
  );
};

export default AdminDashboard;
