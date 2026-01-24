import { useState } from "react";
import { useDoctorContext } from "../../context/DoctorContext";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import type { ResponseType } from "../../types";

const Profile = () => {
  const { doctorInfo, dToken, setDoctorInfo } = useDoctorContext();
  const { backendUrl, currency } = useAppContext();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [fees, setFees] = useState<number>(doctorInfo.fees);
  const [addressLine1, setAddressLine1] = useState<string>(
    doctorInfo.address.line1,
  );
  const [addressLine2, setAddressLine2] = useState<string>(
    doctorInfo.address.line2,
  );
  const [isAvailable, setIsAvailable] = useState<boolean>(
    doctorInfo.available as boolean,
  );

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("fees", fees.toString());
    formData.append(
      "address",
      JSON.stringify({ line1: addressLine1, line2: addressLine2 }),
    );
    formData.append("available", String(isAvailable));

    try {
      const { data } = await axios.put<ResponseType>(
        `${backendUrl}/api/doctor/update-profile`,
        formData,
        { headers: { dToken } },
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        const updatedData = {
          ...doctorInfo,
          fees: fees,
          available: isAvailable,
          address: {
            line1: addressLine1,
            line2: addressLine2,
          },
        };
        setDoctorInfo(updatedData);
        localStorage.setItem("doctorInfo", JSON.stringify(updatedData));
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
    <div className="w-full flex flex-col items-start gap-4 mt-4">
      <img
        src={doctorInfo?.image}
        className="w-55 rounded-lg bg-blue-500"
        alt="doctor image"
      />
      <div className="flex lg:w-1/2 flex-col gap-4 items-start border border-gray-300 rounded-lg py-10 px-8 bg-white">
        <p className="text-3xl font-medium">{doctorInfo?.name}</p>

        <div className="flex flex-row items-start gap-2 text-lg text-gray-700 mt-[-10px]">
          <p>{doctorInfo?.degree} - </p>
          <p>{doctorInfo?.speciality}</p>
          <p className="px-4 py-1 border border-gray-200 rounded-full text-sm">
            {doctorInfo?.experience}
          </p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <p className="text-sm">About</p>
          <p className="text-sm text-gray-700">{doctorInfo?.about}</p>
        </div>
        {isEdit ? (
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-4 items-center">
              <label
                htmlFor="fees"
                className="text-gray-700 font-semibold mt-2"
              >
                Appointment fee:
              </label>
              <input
                type="number"
                id="fees"
                value={fees}
                className="p-1 border border-gray-300 rounded-md text-sm text-gray-500"
                onChange={(e) => setFees(Number(e.target.value))}
              />
            </div>

            <div className="flex flex-row items-center gap-10">
              <p className="text-gray-700">Address:</p>
              <div className="flex flex-col items-center gap-2">
                <input
                  type="text"
                  id="fees"
                  value={addressLine1}
                  className="p-1 border border-gray-300 rounded-md text-sm text-gray-500"
                  placeholder="line 1"
                  onChange={(e) => setAddressLine1(e.target.value)}
                />
                <input
                  type="text"
                  id="fees"
                  value={addressLine2}
                  className="p-1 border border-gray-300 rounded-md text-sm text-gray-500"
                  placeholder="line 2"
                  onChange={(e) => setAddressLine2(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <label
                htmlFor="availability"
                className={`text-sm ${doctorInfo.available ? "text-green-500" : "text-red-500"}`}
              >
                {doctorInfo.available ? "Available:" : "Not available:"}
              </label>
              <input
                type="checkbox"
                name=""
                id="availability"
                checked={isAvailable}
                onChange={() => setIsAvailable((prev) => !prev)}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="text-gray-500 font-semibold mt-2">
              Appointment fee:{" "}
              <span className="text-gray-700">
                {doctorInfo?.fees + currency}
              </span>
            </p>
            <div className="flex flex-row items-center gap-10">
              <p className="text-gray-700">Address:</p>
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">
                  {doctorInfo.address.line1}
                </p>
                <p className="text-sm text-gray-500">
                  {doctorInfo.address.line2}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <label
                htmlFor="availability"
                className={`text-sm ${doctorInfo.available ? "text-green-500" : "text-red-500"}`}
              >
                {doctorInfo.available ? "Available:" : "Not available:"}
              </label>
              <input
                type="checkbox"
                name=""
                id="availability"
                checked={doctorInfo.available}
              />
            </div>
          </div>
        )}
        <button
          className="py-2 px-8 border border-blue-500 rounded-full hover:bg-blue-500 hover:text-white cursor-pointer transition-all duration-300"
          onClick={() => (isEdit ? handleSubmit() : setIsEdit(true))}
        >
          {isEdit ? "Save Information" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
