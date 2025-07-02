
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Route, Clock, TrendingDown, TrendingUp, Zap } from 'lucide-react';

const routeData = [
  {
    id: 'RT-001',
    origin: 'Shanghai',
    destination: 'Los Angeles',
    currentRoute: 'Shanghai → Ningbo → LA/LB',
    optimizedRoute: 'Shanghai → Oakland',
    currentDuration: '14 days',
    optimizedDuration: '12 days',
    currentCost: '$4,200',
    optimizedCost: '$3,800',
    savings: '$400',
    timeSaved: '2 days',
    riskLevel: 'low',
    status: 'recommended'
  },
  {
    id: 'RT-002',
    origin: 'Rotterdam',
    destination: 'New York',
    currentRoute: 'Rotterdam → Hamburg → NY/NJ',
    optimizedRoute: 'Rotterdam → Savannah → NY/NJ',
    currentDuration: '11 days',
    optimizedDuration: '13 days',
    currentCost: '$3,500',
    optimizedCost: '$3,100',
    savings: '$400',
    timeSaved: '-2 days',
    riskLevel: 'medium',
    status: 'analyzing'
  },
  {
    id: 'RT-003',
    origin: 'Busan',
    destination: 'Seattle',
    currentRoute: 'Busan → Seattle',
    optimizedRoute: 'Busan → Vancouver → Seattle',
    currentDuration: '10 days',
    optimizedDuration: '9 days',
    currentCost: '$2,800',
    optimizedCost: '$2,600',
    savings: '$200',
    timeSaved: '1 day',
    riskLevel: 'low',
    status: 'implemented'
  }
];

const Routes = () => {
  const [selectedTab, setSelectedTab] = useState('optimization');

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'high': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recommended': return 'bg-blue-100 text-blue-700';
      case 'analyzing': return 'bg-orange-100 text-orange-700';
      case 'implemented': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Route Optimization</h1>
          <p className="text-slate-600">
            AI-powered route optimization and rerouting recommendations for maximum efficiency
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Routes Analyzed</CardTitle>
              <Route className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">147</div>
              <p className="text-xs text-green-600 mt-1">+23 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Cost Savings</CardTitle>
              <TrendingDown className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">$1.2M</div>
              <p className="text-xs text-green-600 mt-1">Monthly total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Time Saved</CardTitle>
              <Clock className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">34 days</div>
              <p className="text-xs text-green-600 mt-1">Cumulative</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Efficiency Gain</CardTitle>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">18%</div>
              <p className="text-xs text-green-600 mt-1">Average improvement</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="optimization" className="space-y-6">
          <TabsList>
            <TabsTrigger value="optimization">Route Optimization</TabsTrigger>
            <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
            <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="optimization" className="space-y-6">
            <div className="space-y-4">
              {routeData.map((route) => (
                <Card key={route.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg font-semibold">{route.id}</CardTitle>
                        <p className="text-sm text-slate-600">{route.origin} → {route.destination}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getRiskColor(route.riskLevel)}>
                          {route.riskLevel.toUpperCase()} RISK
                        </Badge>
                        <Badge className={getStatusColor(route.status)}>
                          {route.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-medium text-slate-900">Current Route</h4>
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <span className="text-sm">{route.currentRoute}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-slate-500">Duration:</span>
                              <span className="ml-2 font-medium">{route.currentDuration}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">Cost:</span>
                              <span className="ml-2 font-medium">{route.currentCost}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-slate-900">Optimized Route</h4>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Zap className="w-4 h-4 text-blue-600" />
                            <span className="text-sm">{route.optimizedRoute}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-slate-500">Duration:</span>
                              <span className="ml-2 font-medium">{route.optimizedDuration}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">Cost:</span>
                              <span className="ml-2 font-medium">{route.optimizedCost}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div className="flex space-x-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-700">{route.savings}</div>
                          <div className="text-xs text-green-600">Cost Savings</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-700">{route.timeSaved}</div>
                          <div className="text-xs text-green-600">Time Saved</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {route.status === 'recommended' && (
                          <>
                            <Button size="sm" variant="outline">Review</Button>
                            <Button size="sm">Implement</Button>
                          </>
                        )}
                        {route.status === 'analyzing' && (
                          <Button size="sm" variant="outline">View Analysis</Button>
                        )}
                        {route.status === 'implemented' && (
                          <Button size="sm" variant="outline">View Report</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Route Performance Analytics</CardTitle>
                <p className="text-sm text-slate-600">Historical performance data and trends</p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Performance Analytics Dashboard</h3>
                  <p className="text-slate-600 mb-4">Detailed analytics and reporting coming soon</p>
                  <Button variant="outline">Request Early Access</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Recommendations</CardTitle>
                <p className="text-sm text-slate-600">Smart recommendations based on real-time data</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs font-bold">AI</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 mb-1">Port Congestion Alert</h4>
                        <p className="text-sm text-slate-600 mb-3">
                          LA/LB port showing 40% congestion increase. Recommend rerouting 3 upcoming shipments to Oakland.
                        </p>
                        <div className="flex space-x-2">
                          <Button size="sm">Apply Recommendation</Button>
                          <Button size="sm" variant="outline">Learn More</Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs font-bold">AI</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 mb-1">Weather Optimization</h4>
                        <p className="text-sm text-slate-600 mb-3">
                          Clear weather window detected for Pacific routes. Expedite departure by 6 hours for optimal conditions.
                        </p>
                        <div className="flex space-x-2">
                          <Button size="sm">Schedule Change</Button>
                          <Button size="sm" variant="outline">View Forecast</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Routes;
