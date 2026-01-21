import type { ConfirmMessageProps, ResponseType } from "../types";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const ConfirmMessage = ({
  selectedId,
  setShowModal: setShowModule,
  showModal,
}: ConfirmMessageProps) => {
  const { backendUrl, aToken, setAppointments } = useAppContext();

  const cancelAppointment = async (appointmentID: number) => {
    try {
      const { data } = await axios.put<ResponseType>(
        `${backendUrl}/api/admin/change-status`,
        { status: "cancelled", appointmentID },
        {
          headers: { aToken: aToken },
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
                    status: "cancelled",
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
            Are you sure you want to cancel this appointment? This action cannot
            be undone.
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
                if (selectedId) cancelAppointment(selectedId);
                setShowModule(false);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md shadow-red-200 transition-colors cursor-pointer"
            >
              Yes, Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmMessage;
