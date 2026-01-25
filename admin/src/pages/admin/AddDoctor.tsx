import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { specialityData } from "../../assets/assets";
import { type ResponseType, type SpecialityDataType } from "../../types";
import { toast } from "react-toastify";
import axios from "axios";
import { useAdminContext } from "../../context/AdminContext";
import { useAppContext } from "../../context/AppContext";

const AddDoctor = () => {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [experience, setExperience] = useState<string>("1 Year");
  const [fees, setFees] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [speciality, setSpeciality] = useState<string>("Genaral Physician");
  const [degree, setDegree] = useState<string>("");
  const [addressLine1, setAddressLine1] = useState<string>("");
  const [addressLine2, setAddressLine2] = useState<string>("");
  const { aToken } = useAdminContext();
  const { backendUrl } = useAppContext();

  console.log(image);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!image) {
        return toast.error("Please select an image");
      }
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email.toLocaleLowerCase());
      formData.append("password", password);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("experience", experience);
      formData.append("about", about);
      formData.append("fees", fees);
      formData.append("image", image);

      formData.append(
        "address",
        JSON.stringify({
          line1: addressLine1,
          line2: addressLine2,
        }),
      );

      const { data } = await axios.post<ResponseType>(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        { headers: { aToken: aToken } },
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const err = error as Error;
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="w-full mt-8 flex flex-col items-start gap-2">
      <h1 className="text-lg font-semibold">Add Doctor</h1>
      <form
        onSubmit={(e) => submitHandler(e)}
        className="w-full xl:w-2/3 bg-white flex flex-col gap-4 items-start p-8 rounded-md max-h-[80vh] overflow-y-scroll border border-gray-300"
      >
        <div className="flex flex-row items-center gap-4">
          <label htmlFor="image">
            <input
              type="file"
              id="image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files?.[0] ?? null)}
            />
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              className="w-20 cursor-pointer"
              alt=""
            />
          </label>
          <p className="text-gray-500">
            Upload doctor <br /> picture
          </p>
        </div>
        <div className="w-full flex flex-col sm:flex-row items-start gap-4">
          <div className="w-full flex flex-col items-start gap-4">
            <div className="w-full flex flex-col items-start gap-1">
              <label htmlFor="name" className="text-gray-500 text-sm">
                Doctor name
              </label>
              <input
                type="text"
                id="name"
                className="text-sm text-gray-500 w-full border border-gray-300 p-2 rounded-md"
                placeholder="Full name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                value={name}
                required
              />
            </div>
            <div className="w-full flex flex-col items-start gap-1">
              <label htmlFor="email" className="text-gray-500 text-sm">
                Doctor Email
              </label>
              <input
                type="email"
                id="email"
                className="text-sm text-gray-500 w-full border border-gray-300 p-2 rounded-md"
                placeholder="Email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                value={email}
                required
              />
            </div>
            <div className="w-full flex flex-col items-start gap-1">
              <label htmlFor="password" className="text-gray-500 text-sm">
                Doctor Password
              </label>
              <input
                type="password"
                id="password"
                className="text-sm text-gray-500 w-full border border-gray-300 p-2 rounded-md"
                placeholder="Password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                value={password}
                required
              />
            </div>
            <div className="w-full flex flex-col items-start gap-1">
              <label htmlFor="experience" className="text-gray-500 text-sm">
                Experience
              </label>
              <select
                id="experience"
                className="text-sm text-gray-500 w-full border border-gray-300 p-2 rounded-md cursor-pointer"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setExperience(e.target.value)
                }
                value={experience}
                required
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div className="w-full flex flex-col items-start gap-1">
              <label htmlFor="fees" className="text-gray-500 text-sm">
                Fees
              </label>
              <input
                type="number"
                id="fees"
                className="text-sm text-gray-500 w-full border border-gray-300 p-2 rounded-md"
                placeholder="Doctor Fees"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFees(e.target.value)
                }
                value={fees}
                required
              />
            </div>
          </div>
          <div className="w-full flex flex-col items-start gap-4">
            <div className="w-full flex flex-col items-start gap-1">
              <label htmlFor="speciality" className="text-gray-500 text-sm">
                Speciality
              </label>
              <select
                id="speciality"
                className="text-sm text-gray-500 w-full border border-gray-300 p-2 rounded-md cursor-pointer"
                required
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSpeciality(e.target.value)
                }
                value={speciality}
              >
                {specialityData.map((item: SpecialityDataType) => (
                  <option value={item.speciality} key={item.id}>
                    {item.speciality}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full flex flex-col items-start gap-1">
              <label htmlFor="degree" className="text-gray-500 text-sm">
                Degree
              </label>
              <input
                type="text"
                id="degree"
                className="text-sm text-gray-500 w-full border border-gray-300 p-2 rounded-md"
                placeholder="Degree"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDegree(e.target.value)
                }
                value={degree}
                required
              />
            </div>
            <div className="w-full flex flex-col items-start gap-2">
              <label htmlFor="address" className="text-gray-500 text-sm">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="text-sm text-gray-500 w-full border border-gray-300 p-2 rounded-md"
                placeholder="Address line 1"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAddressLine1(e.target.value)
                }
                value={addressLine1}
                required
              />
              <input
                type="text"
                id="address"
                className="text-sm text-gray-500 w-full border border-gray-300 p-2 rounded-md"
                placeholder="Address line 2"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAddressLine2(e.target.value)
                }
                value={addressLine2}
                required
              />
            </div>
          </div>
        </div>
        <label htmlFor="about" className="text-gray-500 text-sm">
          About Doctor
        </label>
        <textarea
          id="about"
          title="about"
          className="text-sm text-gray-500 w-full border border-gray-300 p-2 rounded-md flex-shrink-0"
          rows={6}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setAbout(e.target.value)
          }
          value={about}
        ></textarea>

        <button
          type="submit"
          className="px-10 py-3 rounded-full bg-blue-500 text-white hover:bg-blue-700 transition-all duration-300 cursor-pointer"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
