import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../../services/config";
import apiServices from "../../services/apiServices";

function BatchUpdate() {
  const { id } = useParams();
  const fileInputRef = useRef(null);

  const [batchData, setBatchData] = useState({});
  const [batchname, setBatchname] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [batchfee, setBatchfee] = useState("");
  const [batchclass, setBatchclass] = useState("");
  const [batchcategory, setBatchcategory] = useState("");
  const [batchdescription, setBatchdescription] = useState("");
  const [batchimagefile, setBatchimagefile] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    getBatchById();
    fetchDropdownData();
  }, []);

  const getBatchById = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL_TEST}batches/${id}`);
      setBatchData(response.data);

      setBatchname(response.data.batch_name || "");
      setStartDate(response.data.startDate || "");
      setEndDate(response.data.endDate || "");
      setBatchfee(response.data.price || "");
      setBatchclass(response.data.class || "");
      setBatchcategory(response.data.category || "");
      setBatchdescription(response.data.description || "");
      setSelectedSubjects(response.data.subjects || []);
      setSelectedTeachers(response.data.teachers || []);
      setBatchimagefile(response.data.banner_img_path || null);
    } catch (error) {
      console.error("Error fetching batch details:", error);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const fetchClass = await apiServices.fetchClasses();
      setClasses(fetchClass);

      const fetchCategories = await apiServices.fetchCategories();
      setCategories(fetchCategories);
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  const updateBatch = async () => {
    let formData = new FormData();
    formData.append("batch_name", batchname);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("price", batchfee);
    formData.append("class", batchclass);
    formData.append("category", batchcategory);
    formData.append("banner_img_path", batchimagefile);
    formData.append("description", batchdescription);
    formData.append("subjects", JSON.stringify(selectedSubjects));
    formData.append("teachers", JSON.stringify(selectedTeachers));

    try {
      await axios.put(`${config.BASE_URL_TEST}batches/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Batch Updated Successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error updating batch", error);
      toast.error("Failed to update batch");
    }
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBatchimagefile(file);
    }
  };

  return (
    <div>
      <h4 className="p-6">Batch details</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Left Side - Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">
              Batch Name <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              value={batchname}
              onChange={(e) => setBatchname(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Start Date <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="date"
                className="w-full border px-3 py-2 rounded-md"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                End Date <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="date"
                className="w-full border px-3 py-2 rounded-md"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Category <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                className="w-full border px-3 py-2 rounded-md"
                value={batchcategory}
                onChange={(e) => setBatchcategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((item) => (
                  <option key={item._id} value={item.categoryName}>
                    {item.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Class <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                className="w-full border px-3 py-2 rounded-md"
                value={batchclass}
                onChange={(e) => setBatchclass(e.target.value)}
              >
                <option value="">Select Class</option>
                {classes?.map((item) => (
                  <option key={item._id} value={item.className}>
                    {item.className}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium">
              Batch Fee <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              className="w-full border px-3 py-2 rounded-md"
              value={batchfee}
              onChange={(e) => setBatchfee(e.target.value)}
            />
          </div>
        </div>

        {/* Right Side - Image Upload & Preview */}
        <div className="flex flex-col items-center p-6 border rounded-lg shadow-md bg-gray-100">
          <label className="text-gray-700 font-medium">
            Upload Batch Banner
          </label>

          <div
            className="w-100 h-48   rounded-lg flex flex-col items-center justify-center cursor-pointer  mt-2"
            onClick={handleFileClick}
          >
            {batchimagefile && (
              <img
                src={
                  typeof batchimagefile === "string"
                    ? batchimagefile
                    : URL.createObjectURL(batchimagefile)
                }
                alt="Batch Banner"
                className="w-100 h-full object-contain rounded-lg"
              />
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <button
          onClick={updateBatch}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Update Batch
        </button>
      </div>{" "}
    </div>
  );
}

export default BatchUpdate;
