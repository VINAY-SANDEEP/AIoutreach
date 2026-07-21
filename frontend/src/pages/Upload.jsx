import { useState } from "react";
import axios from "axios";
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  FolderOpen,
} from "lucide-react";

const API = "http://localhost:5000/api/upload/excel";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setSuccess(false);
      setMessage("Please select an Excel file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await axios.post(API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);
      setMessage(res.data.message || "Upload Successful");
      setFile(null);
    } catch (err) {
      console.log(err);
      setSuccess(false);
      setMessage("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 p-8">

      {/* Header */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
          Upload Contacts
        </h1>

        <p className="text-gray-500 mt-2">
          Import Excel files containing contact information.
        </p>

      </div>

      {/* Upload Card */}

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-8 text-white">

          <div className="flex items-center gap-4">

            <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center">

              <UploadCloud size={34} />

            </div>

            <div>

              <h2 className="text-3xl font-bold">
                Excel Upload
              </h2>

              <p className="text-green-100">
                Upload .xlsx or .xls contact files
              </p>

            </div>

          </div>

        </div>

        <div className="p-8">

          {/* Upload Area */}

          <label className="border-2 border-dashed border-green-300 rounded-3xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition">

            <FolderOpen
              size={60}
              className="text-green-500 mb-5"
            />

            <p className="text-xl font-semibold">
              Click to choose an Excel file
            </p>

            <p className="text-gray-500 mt-2">
              Supported formats: .xlsx, .xls
            </p>

            <input
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />

          </label>

          {/* File Preview */}

          {file && (

            <div className="mt-8 bg-green-50 rounded-2xl border border-green-200 p-5 flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div className="h-14 w-14 rounded-2xl bg-green-100 flex items-center justify-center">

                  <FileSpreadsheet
                    className="text-green-600"
                    size={30}
                  />

                </div>

                <div>

                  <h3 className="font-semibold text-lg">
                    {file.name}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>

                </div>

              </div>

            </div>

          )}

          {/* Upload Button */}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-8 w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white py-4 rounded-2xl text-lg font-semibold shadow-lg transition hover:scale-[1.02]"
          >
            {loading ? "Uploading..." : "Upload Excel File"}
          </button>

          {/* Message */}

          {message && (

            <div
              className={`mt-8 rounded-2xl p-5 flex items-center gap-3 ${
                success
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >

              {success ? (
                <CheckCircle size={22} />
              ) : (
                <AlertCircle size={22} />
              )}

              <span className="font-medium">
                {message}
              </span>

            </div>

          )}

        </div>

      </div>

      {/* Information Card */}

      <div className="max-w-3xl mx-auto mt-8 bg-white rounded-3xl shadow-lg p-8">

        <h2 className="text-2xl font-bold mb-4">
          Excel Format
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <div className="bg-green-50 rounded-2xl p-5 text-center">

            <h3 className="font-semibold">
              Name
            </h3>

            <p className="text-gray-500 text-sm">
              Contact Name
            </p>

          </div>

          <div className="bg-green-50 rounded-2xl p-5 text-center">

            <h3 className="font-semibold">
              Phone
            </h3>

            <p className="text-gray-500 text-sm">
              Mobile Number
            </p>

          </div>

          <div className="bg-green-50 rounded-2xl p-5 text-center">

            <h3 className="font-semibold">
              Village
            </h3>

            <p className="text-gray-500 text-sm">
              Optional
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}