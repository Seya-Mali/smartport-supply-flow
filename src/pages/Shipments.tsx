
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Ship, MapPin, Clock, Search, Filter, AlertTriangle, CheckCircle } from 'lucide-react';

const shipmentData = [
  {
    id: 'WM-2024-001',
    vessel: 'Ever Given',
    route: 'Shanghai → LA/LB',
    status: 'in-transit',
    progress: 75,
    eta: '2024-12-15',
    cargo: 'Electronics, Apparel',
    containers: 2847,
    delay: null,
    priority: 'high'
  },
  {
    id: 'WM-2024-002',
    vessel: 'MSC Gülsün',
    route: 'Rotterdam → NY/NJ',
    status: 'delayed',
    progress: 45,
    eta: '2024-12-18',
    cargo: 'Home Goods, Toys',
    containers: 1923,
    delay: '6 hours',
    priority: 'medium'
  },
  {
    id: 'WM-2024-003',
    vessel: 'OOCL Hong Kong',
    route: 'Busan → Seattle',
    status: 'arrived',
    progress: 100,
    eta: '2024-12-12',
    cargo: 'Automotive Parts',
    containers: 1456,
    delay: null,
    priority: 'high'
  },
  {
    id: 'WM-2024-004',
    vessel: 'CMA CGM Marco Polo',
    route: 'Hamburg → Savannah',
    status: 'rerouted',
    progress: 30,
    eta: '2024-12-20',
    cargo: 'Food Products',
    containers: 3124,
    delay: '2 days',
    priority: 'low'
  }
];

const Shipments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-transit': return 'bg-blue-100 text-blue-700';
      case 'delayed': return 'bg-red-100 text-red-700';
      case 'arrived': return 'bg-green-100 text-green-700';
      case 'rerouted': return 'bg-orange-100 text-orange-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-slate-500';
    }
  };

  const filteredShipments = shipmentData.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.vessel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || shipment.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Active Shipments</h1>
          <p className="text-slate-600">
            Track all active shipments and their current status in real-time
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Active</CardTitle>
              <Ship className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{shipmentData.length}</div>
              <p className="text-xs text-green-600 mt-1">+3 from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">In Transit</CardTitle>
              <MapPin className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {shipmentData.filter(s => s.status === 'in-transit').length}
              </div>
              <p className="text-xs text-blue-600 mt-1">On schedule</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Delayed</CardTitle>
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {shipmentData.filter(s => s.status === 'delayed').length}
              </div>
              <p className="text-xs text-red-600 mt-1">Requires attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Arrived</CardTitle>
              <CheckCircle className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {shipmentData.filter(s => s.status === 'arrived').length}
              </div>
              <p className="text-xs text-green-600 mt-1">This week</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search shipments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('all')}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={selectedFilter === 'in-transit' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('in-transit')}
              size="sm"
            >
              In Transit
            </Button>
            <Button
              variant={selectedFilter === 'delayed' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('delayed')}
              size="sm"
            >
              Delayed
            </Button>
          </div>
        </div>

        {/* Shipments List */}
        <div className="grid gap-4">
          {filteredShipments.map((shipment) => (
            <Card key={shipment.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-1 h-12 rounded ${getPriorityColor(shipment.priority)}`}></div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-lg">{shipment.id}</h3>
                        <Badge className={getStatusColor(shipment.status)}>
                          {shipment.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                        {shipment.delay && (
                          <Badge variant="destructive">+{shipment.delay}</Badge>
                        )}
                      </div>
                      <p className="text-slate-600 font-medium">{shipment.vessel}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">ETA</p>
                    <p className="font-medium">{new Date(shipment.eta).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{shipment.route}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Ship className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{shipment.containers} containers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{shipment.cargo}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{shipment.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${shipment.progress}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Shipments;
