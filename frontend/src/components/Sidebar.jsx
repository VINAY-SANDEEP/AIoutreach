import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UploadCloud,
  Users,
  MessageSquareText,
  BarChart3,
  Mic,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Upload",
      path: "/upload",
      icon: <UploadCloud size={20} />,
    },
    {
      name: "Contacts",
      path: "/contacts",
      icon: <Users size={20} />,
    },
    {
      name: "Responses",
      path: "/responses",
      icon: <MessageSquareText size={20} />,
    },
    {
      name: "History",
      path: "/history",
      icon: <BarChart3 size={20} />,
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl border-r border-slate-700">

      {/* Logo */}
      <div className="h-24 flex items-center gap-4 px-6 border-b border-slate-700">

        <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
          <Mic size={28} />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            VoicePoll AI
          </h2>

          <p className="text-sm text-slate-400">
            Admin Dashboard
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-8 px-4 space-y-2">

        {menus.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300
              
              ${
                active
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg"
                  : "hover:bg-slate-800 hover:translate-x-2"
              }
              
              `}
            >
              <span
                className={`${
                  active
                    ? "text-white"
                    : "text-slate-400 group-hover:text-green-400"
                }`}
              >
                {item.icon}
              </span>

              <span className="font-medium tracking-wide">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Card */}
     

    </aside>
  );
}