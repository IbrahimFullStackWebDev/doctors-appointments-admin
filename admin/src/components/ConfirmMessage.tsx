import type { ConfirmMessageProps, ResponseType } from "../types";
import axios from "axios";
import { useAdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";
import { useDoctorContext } from "../context/DoctorContext";

const ConfirmMessage = ({
  selectedId,
  setShowModal: setShowModule,
  showModal,
  status = "cancelled" as string,
}: ConfirmMessageProps) => {
  const { aToken } = useAdminContext();
  const { dToken } = useDoctorContext();
  const { backendUrl, setAppointments } = useAppContext();

  const changeStatus = async (appointmentID: number) => {
    try {
      const { data } = await axios.put<ResponseType>(
        `${backendUrl}/api/${aToken ? "admin" : "doctor"}/change-status`,
        { status: status, appointmentID },
        {
          headers: {
            aToken,
            dToken,
          },
        },
      );
      if (data.success) {
        toast.success(data.message);

        setAppointments((prev) =>
          prev?.map((item) =>
            item.AppointmentInfo.id === appointmentID
              ? {
                  ...item,
                  AppointmentInfo: {
                    ...item.AppointmentInfo,
                    status: status,
                  },
                }
              : item,
          ),
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
      console.log(error);
    }
  };
  return (
    showModal && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl transform transition-all animate-in fade-in zoom-in duration-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Confirm Cancellation
          </h3>
          <p className="text-gray-500 mb-6">
            Are you sure you want to{" "}
            {status === "cancelled" ? "cancel" : "complete"} this appointment?
            This action cannot be undone.
          </p>

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setShowModule(false)}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              No, Keep it
            </button>
            <button
              onClick={() => {
                if (selectedId) changeStatus(selectedId);
                setShowModule(false);
              }}
              className={`px-4 py-2 ${status === "cancelled" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} text-white rounded-lg shadow-md shadow-red-200 transition-colors cursor-pointer`}
            >
              {status === "cancelled" ? "Yes, Cancel" : "Yes, Complete"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmMessage;
