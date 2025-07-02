
import React from 'react';
import { Layout } from '@/components/Layout';
import { MetricsCards } from '@/components/dashboard/MetricsCards';
import { PortCongestionChart } from '@/components/dashboard/PortCongestionChart';
import { ShipmentTimeline } from '@/components/dashboard/ShipmentTimeline';
import { ActiveAlerts } from '@/components/dashboard/ActiveAlerts';
import { RecentShipments } from '@/components/dashboard/RecentShipments';

const Index = () => {
  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">SmartPort Dashboard</h1>
          <p className="text-slate-600">
            AI-powered port intelligence and scheduling platform for Walmart's global supply chain
          </p>
        </div>

        {/* Key Metrics */}
        <MetricsCards />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PortCongestionChart />
          <ShipmentTimeline />
        </div>

        {/* Secondary Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActiveAlerts />
          <RecentShipments />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
