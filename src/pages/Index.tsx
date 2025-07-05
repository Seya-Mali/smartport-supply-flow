
import React from 'react';
import { Layout } from '@/components/Layout';
import { MetricsCards } from '@/components/dashboard/MetricsCards';
import { PortCongestionChart } from '@/components/dashboard/PortCongestionChart';
import { ShipmentTimeline } from '@/components/dashboard/ShipmentTimeline';
import { ActiveAlerts } from '@/components/dashboard/ActiveAlerts';
import { RecentShipments } from '@/components/dashboard/RecentShipments';
import { VesselTrackingMini } from '@/components/dashboard/VesselTrackingMini';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/vessel-tracking')}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Navigation className="h-5 w-5 text-blue-600" />
                Live Vessel Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Track vessels in real-time with interactive map and filtering options
              </p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/ports')}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-green-600" />
                Port Monitor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Monitor port congestion and optimize operations
              </p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/analytics')}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Navigation className="h-5 w-5 text-purple-600" />
                Analytics Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Advanced analytics and performance insights
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Key Metrics */}
        <MetricsCards />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VesselTrackingMini />
          <PortCongestionChart />
        </div>

        {/* Secondary Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ShipmentTimeline />
          <ActiveAlerts />
        </div>

        {/* Third Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <RecentShipments />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
