'use client'
import LayoutEl from '../layout';
import { useEffect, useState } from 'react';


const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Runs only in the browser
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <LayoutEl>


      <div className='px-20' >
        {/* Main content container */}
        <div className="flex flex-1">
          <main className="flex-1 p-6">
            <h2 className="text-2xl">Welcome, {user?.name}</h2>
            <span>Email: {user?.email}</span>
          </main>
        </div>
      </div>
    </LayoutEl>
  )
}

export default ProfilePage
