import { useEffect, useState } from "react";
import axios from "axios";
import {
  PhoneCall,
  Search,
  Clock3,
  CalendarDays,
  FileText,
  User,
} from "lucide-react";

export default function History() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/history");
      setHistory(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredHistory = history.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 p-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-8">

        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            Call History
          </h1>

          <p className="text-gray-500 mt-2">
            View all completed and pending voice calls
          </p>
        </div>

        <div className="relative">

          <Search
            className="absolute left-4 top-3.5 text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-80 pl-12 pr-4 py-3 rounded-2xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-green-500 outline-none"
          />

        </div>

      </div>

      {/* Stats Card */}

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-3xl shadow-lg p-6 flex justify-between items-center">

          <div>

            <p className="text-gray-500">
              Total Calls
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {history.length}
            </h2>

          </div>

          <div className="h-16 w-16 rounded-2xl bg-green-100 flex items-center justify-center">

            <PhoneCall
              className="text-green-600"
              size={30}
            />

          </div>

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">

              <tr>

                <th className="px-6 py-4 text-left">
                  User
                </th>

                <th className="px-6 py-4 text-left">
                  Phone
                </th>

                <th className="px-6 py-4 text-left">
                  Status
                </th>

                <th className="px-6 py-4 text-left">
                  Duration
                </th>

                <th className="px-6 py-4 text-left">
                  Transcript
                </th>

                <th className="px-6 py-4 text-left">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredHistory.length > 0 ? (

                filteredHistory.map((item) => (

                  <tr
                    key={item._id}
                    className="border-b hover:bg-green-50 transition"
                  >

                    {/* User */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="h-11 w-11 rounded-full bg-green-100 flex items-center justify-center">

                          <User
                            size={18}
                            className="text-green-700"
                          />

                        </div>

                        <span className="font-semibold">
                          {item.name}
                        </span>

                      </div>

                    </td>

                    {/* Phone */}

                    <td className="px-6 py-5">

                      {item.phone}

                    </td>

                    {/* Status */}

                    <td className="px-6 py-5">

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold
                        ${
                          item.callStatus === "Completed"
                            ? "bg-green-100 text-green-700"
                            : item.callStatus === "Failed"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.callStatus}
                      </span>

                    </td>

                    {/* Duration */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2">

                        <Clock3
                          size={17}
                          className="text-blue-600"
                        />

                        <span className="font-medium">
                          {item.duration} sec
                        </span>

                      </div>

                    </td>

                    {/* Transcript */}

                    <td className="px-6 py-5">

                      <div className="flex items-start gap-2 max-w-sm">

                        <FileText
                          size={18}
                          className="text-green-600 mt-1"
                        />

                        <p className="text-gray-600 text-sm max-h-24 overflow-y-auto">
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
                    colSpan="6"
                    className="text-center py-16 text-gray-500"
                  >
                    No call history found.
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