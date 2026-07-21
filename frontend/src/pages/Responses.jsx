import { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  Download,
  MessageSquare,
  Phone,
  CalendarDays,
  User,
  FileText,
} from "lucide-react";

import { API_BASE_URL } from "../config";

const API = `${API_BASE_URL}/api/responses`;

export default function Responses() {
  const [responses, setResponses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const res = await axios.get(API);
      setResponses(res.data?.data || []);
    } catch (err) {
      console.error(err);
      setResponses([]);
    }
  };

  const exportExcel = () => {
    window.open(`${API_BASE_URL}/api/export`);
  };

  const filtered = (responses || []).filter((item) => {
    if (!item) return false;
    const transcript = item.transcript || "";
    const name = item.name || "";
    const phone = item.phone || "";

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      phone.includes(search) ||
      transcript.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 p-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-8">

        <div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            Survey Responses
          </h1>

          <p className="text-gray-500 mt-2">
            View and manage all AI voice survey responses
          </p>

        </div>

        <button
          onClick={exportExcel}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-lg transition hover:scale-105"
        >
          <Download size={20} />
          Export Excel
        </button>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-3xl shadow-lg p-6 flex justify-between items-center">

          <div>

            <p className="text-gray-500">
              Total Responses
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {responses.length}
            </h2>

          </div>

          <div className="h-16 w-16 rounded-2xl bg-green-100 flex items-center justify-center">

            <MessageSquare
              size={30}
              className="text-green-600"
            />

          </div>

        </div>

      </div>

      {/* Search */}

      <div className="relative mb-8">

        <Search
          className="absolute left-4 top-3.5 text-gray-400"
          size={20}
        />

        <input
          type="text"
          placeholder="Search by Name, Phone or Transcript..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-5 py-3 rounded-2xl border border-gray-200 shadow-sm outline-none focus:ring-2 focus:ring-green-500"
        />

      </div>

      {/* Table */}

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">

              <tr>

                <th className="text-left px-6 py-4">
                  User
                </th>

                <th className="text-left px-6 py-4">
                  Phone
                </th>

                <th className="text-left px-6 py-4">
                  Transcript
                </th>

                <th className="text-left px-6 py-4">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {filtered.length > 0 ? (

                filtered.map((item) => (

                  <tr
                    key={item._id}
                    className="border-b hover:bg-green-50 transition"
                  >

                    {/* User */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700">

                          {item.name.charAt(0).toUpperCase()}

                        </div>

                        <span className="font-semibold">
                          {item.name}
                        </span>

                      </div>

                    </td>

                    {/* Phone */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2">

                        <Phone
                          size={18}
                          className="text-green-600"
                        />

                        {item.phone}

                      </div>

                    </td>

                    {/* Transcript */}

                    <td className="px-6 py-5">

                      <div className="flex gap-2 max-w-md">

                        <FileText
                          size={18}
                          className="text-blue-600 mt-1"
                        />

                        <p className="text-gray-600 text-sm max-h-24 overflow-y-auto leading-6">
                          {item.transcript || "-"}
                        </p>

                      </div>

                    </td>

                    {/* Date */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2">

                        <CalendarDays
                          size={18}
                          className="text-purple-600"
                        />

                        <span className="text-sm">
                          {new Date(item.createdAt).toLocaleString()}
                        </span>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="4"
                    className="text-center py-16 text-gray-500"
                  >
                    No responses found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}