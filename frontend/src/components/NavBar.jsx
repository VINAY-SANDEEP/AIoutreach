import { Mic, Bell, UserCircle } from "lucide-react";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 flex items-center justify-center shadow-lg">
            <Mic className="text-white w-6 h-6" />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              VoicePoll AI
            </h1>

            <p className="text-sm text-gray-500">
              Smart Village Complaint Dashboard
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Notification */}
          <button className="relative h-11 w-11 rounded-xl bg-gray-100 hover:bg-green-100 transition-all duration-300 flex items-center justify-center">
            <Bell className="w-5 h-5 text-gray-700" />

            <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>
          </button>

          {/* Admin */}
          <div className="flex items-center gap-3 bg-gray-100 hover:bg-green-50 px-4 py-2 rounded-2xl transition-all duration-300 cursor-pointer">
            <UserCircle className="w-10 h-10 text-green-600" />

            <div className="hidden md:block">
              <h3 className="font-semibold text-gray-800">
                Admin
              </h3>
              <p className="text-xs text-gray-500">
                Dashboard Access
              </p>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}