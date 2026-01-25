import { useEffect, useState } from "react";
import type { DoctorDataType, ResponseType } from "../../types";
import axios from "axios";
import { useAdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/AppContext";

const Doctors = () => {
  const [doctors, setDoctors] = useState<DoctorDataType[]>([]);
  const { aToken } = useAdminContext();
  const { backendUrl } = useAppContext();

  const changeAvailability = async (doctorId: number, available: boolean) => {
    try {
      const { data } = await axios.put<ResponseType>(
        `${backendUrl}/api/admin/change-availability`,
        { doctorId, available },
        { headers: { aToken } },
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
      console.log(error);
    }
  };

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const { data } = await axios.get<ResponseType>(
          `${backendUrl}/api/admin/doctors`,
          {
            headers: { aToken },
          },
        );
        if (data.success) {
          setDoctors(data.doctors as DoctorDataType[]);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        const err = error as Error;
        toast.error(err.message);
        console.log(error);
      }
    };
    getDoctors();
  }, [changeAvailability]);
  return (
    <div className="w-full flex flex-col items-start gap-10 mt-5">
      <h2 className="text-2xl font-medium">Doctors List</h2>

      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6 overflow-y-scroll h-screen p-4">
        {doctors &&
          doctors.map((item) => (
            <div
              key={item.id}
              className="w-full flex flex-col items-start gap-4 pb-4 border border-gray-300 rounded-lg cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <img
                src={item.image}
                className="bg-blue-200 rounded-lg hover:bg-blue-500 transition-all duration-500"
                alt="doctor image"
              />
              <div className="flex flex-col items-start gap-2 px-4">
                <div className="flex flex-row items-center gap-2">
                  <input
                    id="Availability"
                    type="checkbox"
                    checked={item.available}
                    onChange={() =>
                      changeAvailability(item.id as number, !item.available)
                    }
                  />
                  <label
                    htmlFor="Availability"
                    className="text-sm text-gray-500"
                  >
                    Availability
                  </label>
                </div>
                <p className="text-xl">{item.name}</p>
                <p className="text-gray-500">{item.speciality}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Doctors;
