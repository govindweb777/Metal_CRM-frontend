import React from 'react';
import { Bell, User } from 'lucide-react';

const Header = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                <User className="h-5 w-5" />
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-900">
                  {userInfo.firstName} {userInfo.lastName}
                </div>
                <div className="text-xs text-gray-500">{userInfo.accountType}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;