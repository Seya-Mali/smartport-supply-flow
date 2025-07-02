
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Ship, Clock, Users, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const portData = [
  {
    id: 1,
    name: 'Los Angeles/Long Beach',
    code: 'LALB',
    status: 'High Congestion',
    waitTime: '4.2 days',
    berthsAvailable: 12,
    berthsTotal: 45,
    vesselsWaiting: 28,
    throughput: '95%',
    statusColor: 'destructive'
  },
  {
    id: 2,
    name: 'New York/New Jersey',
    code: 'NYNJ',
    status: 'Moderate',
    waitTime: '1.8 days',
    berthsAvailable: 18,
    berthsTotal: 32,
    vesselsWaiting: 14,
    throughput: '78%',
    statusColor: 'secondary'
  },
  {
    id: 3,
    name: 'Savannah',
    code: 'SAVG',
    status: 'Normal',
    waitTime: '0.5 days',
    berthsAvailable: 8,
    berthsTotal: 22,
    vesselsWaiting: 6,
    throughput: '65%',
    statusColor: 'default'
  },
  {
    id: 4,
    name: 'Seattle',
    code: 'SEAT',
    status: 'Low Congestion',
    waitTime: '0.2 days',
    berthsAvailable: 15,
    berthsTotal: 25,
    vesselsWaiting: 3,
    throughput: '45%',
    statusColor: 'outline'
  }
];

const recentVessels = [
  { name: 'MSC Lucinda', eta: '2 hours', berth: 'A-12', status: 'Arriving' },
  { name: 'OOCL Hamburg', eta: '4 hours', berth: 'B-8', status: 'Scheduled' },
  { name: 'Evergreen Marine', eta: '6 hours', berth: 'C-5', status: 'Delayed' },
  { name: 'COSCO Shipping', eta: '8 hours', berth: 'A-15', status: 'On Time' }
];

const Ports = () => {
  const [selectedPort, setSelectedPort] = useState(portData[0]);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Port Monitor</h1>
          <p className="text-slate-600">
            Real-time monitoring of global port congestion and berth availability
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Ports Monitored
              </CardTitle>
              <Ship className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">24</div>
              <p className="text-xs text-green-600 mt-1">+2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Average Wait Time
              </CardTitle>
              <Clock className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">1.7 days</div>
              <p className="text-xs text-green-600 mt-1">-0.8 days improved</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Vessels in Queue
              </CardTitle>
              <Users className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">51</div>
              <p className="text-xs text-red-600 mt-1">+12% from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Berth Utilization
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">73%</div>
              <p className="text-xs text-green-600 mt-1">Optimal range</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Port Overview</TabsTrigger>
            <TabsTrigger value="vessels">Vessel Tracking</TabsTrigger>
            <TabsTrigger value="berths">Berth Management</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {portData.map((port) => (
                <Card key={port.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedPort(port)}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold">{port.name}</CardTitle>
                      <Badge variant={port.statusColor as any}>{port.status}</Badge>
                    </div>
                    <p className="text-sm text-slate-600">Code: {port.code}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Wait Time</span>
                      <span className="font-semibold">{port.waitTime}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Berth Availability</span>
                        <span>{port.berthsAvailable}/{port.berthsTotal}</span>
                      </div>
                      <Progress value={(port.berthsAvailable / port.berthsTotal) * 100} className="h-2" />
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Vessels Waiting</span>
                      <span className="font-semibold text-orange-600">{port.vesselsWaiting}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Throughput</span>
                      <span className="font-semibold text-blue-600">{port.throughput}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vessels" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Incoming Vessels - {selectedPort.name}</CardTitle>
                <p className="text-sm text-slate-600">Next arrivals and berth assignments</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentVessels.map((vessel, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Ship className="w-5 h-5 text-blue-600" />
                        <div>
                          <h4 className="font-semibold">{vessel.name}</h4>
                          <p className="text-sm text-slate-600">Berth: {vessel.berth}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          {vessel.status === 'On Time' && <CheckCircle className="w-4 h-4 text-green-500" />}
                          {vessel.status === 'Delayed' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                          {vessel.status === 'Arriving' && <Clock className="w-4 h-4 text-blue-500" />}
                          <Badge variant={vessel.status === 'Delayed' ? 'destructive' : 'default'}>
                            {vessel.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">ETA: {vessel.eta}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="berths" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Berth Status - {selectedPort.name}</CardTitle>
                <p className="text-sm text-slate-600">Real-time berth occupancy and scheduling</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {Array.from({ length: selectedPort.berthsTotal }, (_, i) => {
                    const berthNumber = i + 1;
                    const isOccupied = i >= selectedPort.berthsAvailable;
                    
                    return (
                      <div
                        key={berthNumber}
                        className={`p-4 border-2 rounded-lg text-center ${
                          isOccupied 
                            ? 'border-red-200 bg-red-50' 
                            : 'border-green-200 bg-green-50'
                        }`}
                      >
                        <div className="font-semibold">Berth {berthNumber}</div>
                        <div className={`text-sm mt-1 ${
                          isOccupied ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {isOccupied ? 'Occupied' : 'Available'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Ports;
