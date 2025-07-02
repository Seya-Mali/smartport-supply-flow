
import React from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationDropdown } from './NotificationDropdown';

export const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="text-slate-600 hover:text-slate-900" />
        <div className="hidden md:flex items-center space-x-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search ports, shipments, or routes..."
              className="pl-10 pr-4 py-2 w-80 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-right hidden md:block">
          <div className="text-sm font-medium text-slate-900">Global Operations</div>
          <div className="text-xs text-slate-500">Live Status: Active</div>
        </div>
        
        <NotificationDropdown />
        
        <Button variant="ghost" size="sm">
          <User className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
};
