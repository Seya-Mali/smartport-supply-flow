
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Clock, Bell, CheckCircle, XCircle, Info } from 'lucide-react';

const alertsData = [
  {
    id: 'ALT-001',
    title: 'Port Congestion Critical',
    description: 'LA/LB port experiencing severe delays. 45+ hour wait times reported.',
    type: 'critical',
    category: 'port',
    timestamp: '2 minutes ago',
    affectedShipments: 12,
    status: 'active',
    actionRequired: true,
    recommendedAction: 'Reroute to Oakland or Long Beach alternatives'
  },
  {
    id: 'ALT-002',
    title: 'Weather Alert: Pacific Storm',
    description: 'Severe weather conditions expected in Pacific shipping lanes.',
    type: 'warning',
    category: 'weather',
    timestamp: '15 minutes ago',
    affectedShipments: 8,
    status: 'active',
    actionRequired: true,
    recommendedAction: 'Delay departure or adjust route'
  },
  {
    id: 'ALT-003',
    title: 'Fuel Price Spike',
    description: 'Bunker fuel prices increased by 12% across major ports.',
    type: 'info',
    category: 'economic',
    timestamp: '1 hour ago',
    affectedShipments: 25,
    status: 'acknowledged',
    actionRequired: false,
    recommendedAction: 'Review fuel hedging strategies'
  },
  {
    id: 'ALT-004',
    title: 'Dock Strike Resolved',
    description: 'Houston port workers agreement reached. Normal operations resumed.',
    type: 'resolved',
    category: 'labor',
    timestamp: '3 hours ago',
    affectedShipments: 6,
    status: 'resolved',
    actionRequired: false,
    recommendedAction: 'Resume scheduled operations'
  }
];

const Alerts = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'warning': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'info': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'info': return <Info className="w-5 h-5 text-blue-600" />;
      case 'resolved': return <CheckCircle className="w-5 h-5 text-green-600" />;
      default: return <Bell className="w-5 h-5 text-slate-600" />;
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'critical': return 'destructive';
      case 'warning': return 'secondary';
      case 'info': return 'outline';
      case 'resolved': return 'default';
      default: return 'outline';
    }
  };

  const filteredAlerts = alertsData.filter(alert => 
    selectedFilter === 'all' || alert.type === selectedFilter
  );

  const activeAlerts = alertsData.filter(alert => alert.status === 'active');
  const criticalAlerts = alertsData.filter(alert => alert.type === 'critical');

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Alerts & Notifications</h1>
          <p className="text-slate-600">
            Critical alerts and notifications for supply chain disruptions and opportunities
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active Alerts</CardTitle>
              <Bell className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{activeAlerts.length}</div>
              <p className="text-xs text-orange-600 mt-1">Requires attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Critical Issues</CardTitle>
              <XCircle className="w-4 h-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{criticalAlerts.length}</div>
              <p className="text-xs text-red-600 mt-1">Immediate action needed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Affected Shipments</CardTitle>
              <AlertTriangle className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {alertsData.reduce((sum, alert) => sum + alert.affectedShipments, 0)}
              </div>
              <p className="text-xs text-slate-600 mt-1">Total impacted</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Response Time</CardTitle>
              <Clock className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">4.2 min</div>
              <p className="text-xs text-green-600 mt-1">Average response</p>
            </CardContent>
          </Card>
        </div>

        {/* Alert Filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedFilter('all')}
            size="sm"
          >
            All Alerts
          </Button>
          <Button
            variant={selectedFilter === 'critical' ? 'default' : 'outline'}
            onClick={() => setSelectedFilter('critical')}
            size="sm"
          >
            Critical
          </Button>
          <Button
            variant={selectedFilter === 'warning' ? 'default' : 'outline'}
            onClick={() => setSelectedFilter('warning')}
            size="sm"
          >
            Warning
          </Button>
          <Button
            variant={selectedFilter === 'info' ? 'default' : 'outline'}
            onClick={() => setSelectedFilter('info')}
            size="sm"
          >
            Info
          </Button>
          <Button
            variant={selectedFilter === 'resolved' ? 'default' : 'outline'}
            onClick={() => setSelectedFilter('resolved')}
            size="sm"
          >
            Resolved
          </Button>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <Card key={alert.id} className={`border-l-4 ${getAlertColor(alert.type)}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-lg text-slate-900">{alert.title}</h3>
                        <Badge variant={getBadgeVariant(alert.type) as any}>
                          {alert.type.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-slate-600 mb-2">{alert.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {alert.timestamp}
                        </span>
                        <span>{alert.affectedShipments} shipments affected</span>
                        <span className="capitalize">{alert.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {alert.status === 'active' && (
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                    <Badge variant="outline">{alert.status.toUpperCase()}</Badge>
                  </div>
                </div>

                {alert.actionRequired && (
                  <div className="bg-slate-50 p-4 rounded-lg mb-4">
                    <div className="flex items-start space-x-2">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-slate-900 mb-1">Recommended Action</h4>
                        <p className="text-sm text-slate-600">{alert.recommendedAction}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    {alert.status === 'active' && (
                      <>
                        <Button size="sm">Take Action</Button>
                        <Button size="sm" variant="outline">Acknowledge</Button>
                      </>
                    )}
                    {alert.status === 'acknowledged' && (
                      <Button size="sm" variant="outline">Mark Resolved</Button>
                    )}
                    {alert.status === 'resolved' && (
                      <Button size="sm" variant="ghost">View Report</Button>
                    )}
                  </div>
                  <Button size="sm" variant="ghost">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Alerts;
