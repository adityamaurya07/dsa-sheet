'use client'

import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

interface LayoutElProps {
  children: ReactNode;
}

const LayoutEl: React.FC<LayoutElProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter()

  const navItems = [
    { name: 'Profile', href: '/profile' },
    { name: 'Topics', href: '/topics' },
    { name: 'Progress', href: '/progress' },
  ];
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "/api/logout",
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        console.log("✅", res.data.message);
        localStorage.clear();
        router.push('/profile')

      }
    } catch (error: any) {
      console.error("❌ Logout failed:", error.response?.data || error.message);
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-around items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <nav>
            <ul className="flex space-x-6 items-center">
              {
                navItems.map((nav, index) => (
                  <li key={index}>
                    <Link
                      href={nav.href}
                      className={`cursor-pointer ${nav.href === pathname ? 'text-white' : 'text-gray-300'} hover:text-white`}
                    >
                      {nav.name}
                    </Link>
                  </li>
                ))
              }
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white border cursor-pointer border-white rounded px-4 py-2 text-sm"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full p-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm py-4 mt-6">
        <p>&copy; 2025 Dashboard All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default LayoutEl;
