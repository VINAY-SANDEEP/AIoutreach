import { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  Users,
  Phone,
  Trash2,
  CheckCircle,
  Clock,
} from "lucide-react";

import { API_BASE_URL } from "../config";

const API = `${API_BASE_URL}/api/contacts`;

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchContacts = async () => {
    try {
      const res = await axios.get(API);
      setContacts(res.data?.contacts || []);
    } catch (err) {
      console.error(err);
      setContacts([]);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const deleteContact = async (id) => {
    if (!window.confirm("Delete this contact?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      fetchContacts();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredContacts = (contacts || []).filter(
    (c) =>
      c &&
      ((c.name && c.name.toLowerCase().includes(search.toLowerCase())) ||
        (c.phone && c.phone.includes(search)))
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            Contacts
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all uploaded phone contacts
          </p>
        </div>

        {/* Search */}
        <div className="relative mt-5 md:mt-0">

          <Search
            className="absolute left-4 top-3.5 text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 pr-5 py-3 w-80 rounded-2xl border border-gray-200 bg-white shadow-sm outline-none focus:ring-2 focus:ring-green-500"
          />

        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-3xl shadow-lg p-6 flex items-center justify-between">

          <div>
            <p className="text-gray-500">Total Contacts</p>

            <h2 className="text-4xl font-bold mt-2">
              {contacts.length}
            </h2>
          </div>

          <div className="h-16 w-16 rounded-2xl bg-green-100 flex items-center justify-center">
            <Users className="text-green-600" size={30} />
          </div>

        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">

              <tr>
                <th className="text-left px-6 py-4">Name</th>
                <th className="text-left px-6 py-4">Phone</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-center px-6 py-4">Action</th>
              </tr>

            </thead>

            <tbody>

              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <tr
                    key={contact._id}
                    className="border-b hover:bg-green-50 transition"
                  >
                    {/* Name */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700">
                          {contact.name.charAt(0).toUpperCase()}
                        </div>

                        <span className="font-semibold">
                          {contact.name}
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

                        {contact.phone}

                      </div>

                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">

                      {contact.status === "Completed" ? (
                        <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                          <CheckCircle size={16} />
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium">
                          <Clock size={16} />
                          {contact.status}
                        </span>
                      )}

                    </td>

                    {/* Delete */}
                    <td className="px-6 py-5 text-center">

                      <button
                        onClick={() => deleteContact(contact._id)}
                        className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl transition-all hover:scale-105 shadow-md"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>

                  <td
                    colSpan="4"
                    className="text-center py-16 text-gray-500"
                  >
                    No contacts found.
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