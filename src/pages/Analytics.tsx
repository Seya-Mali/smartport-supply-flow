
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Clock, Ship, Target } from 'lucide-react';

const performanceData = [
  { month: 'Jan', onTime: 85, delayed: 15, cost: 2.1 },
  { month: 'Feb', onTime: 88, delayed: 12, cost: 2.0 },
  { month: 'Mar', onTime: 91, delayed: 9, cost: 1.9 },
  { month: 'Apr', onTime: 93, delayed: 7, cost: 1.8 },
  { month: 'May', onTime: 89, delayed: 11, cost: 2.0 },
  { month: 'Jun', onTime: 95, delayed: 5, cost: 1.7 },
  { month: 'Jul', onTime: 97, delayed: 3, cost: 1.6 },
  { month: 'Aug', onTime: 94, delayed: 6, cost: 1.7 }
];

const routePerformance = [
  { route: 'Asia-West Coast', volume: 1250, efficiency: 94, savings: 0.8 },
  { route: 'Europe-East Coast', volume: 980, efficiency: 91, savings: 0.6 },
  { route: 'Asia-East Coast', volume: 850, efficiency: 88, savings: 0.5 },
  { route: 'Europe-Gulf', volume: 620, efficiency: 86, savings: 0.4 },
  { route: 'Intra-Asia', volume: 450, efficiency: 92, savings: 0.3 }
];

const portData = [
  { name: 'LA/LB', value: 35, color: '#ef4444' },
  { name: 'NY/NJ', value: 25, color: '#f59e0b' },
  { name: 'Savannah', value: 20, color: '#10b981' },
  { name: 'Seattle', value: 12, color: '#3b82f6' },
  { name: 'Others', value: 8, color: '#8b5cf6' }
];

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Analytics & Insights</h1>
          <p className="text-slate-600">
            Deep analytics and insights into supply chain performance and optimization opportunities
          </p>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">On-Time Performance</CardTitle>
              <Target className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">94.2%</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-xs text-green-600 font-medium">+2.1% vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Cost Efficiency</CardTitle>
              <DollarSign className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">$1.7M</div>
              <div className="flex items-center mt-1">
                <TrendingDown className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-xs text-green-600 font-medium">-12% reduction</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Average Transit Time</CardTitle>
              <Clock className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">12.3 days</div>
              <div className="flex items-center mt-1">
                <TrendingDown className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-xs text-green-600 font-medium">-1.2 days improved</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Route Optimization</CardTitle>
              <Ship className="w-4 h-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">87%</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-xs text-green-600 font-medium">Routes optimized</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Time Period Selector */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-900">Performance Trends</h2>
          <div className="flex space-x-2">
            <Button
              variant={selectedPeriod === 'week' ? 'default' : 'outline'}
              onClick={() => setSelectedPeriod('week')}
              size="sm"
            >
              Week
            </Button>
            <Button
              variant={selectedPeriod === 'month' ? 'default' : 'outline'}
              onClick={() => setSelectedPeriod('month')}
              size="sm"
            >
              Month
            </Button>
            <Button
              variant={selectedPeriod === 'quarter' ? 'default' : 'outline'}
              onClick={() => setSelectedPeriod('quarter')}
              size="sm"
            >
              Quarter
            </Button>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">On-Time Performance Trend</CardTitle>
              <p className="text-sm text-slate-600">Monthly performance metrics</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Line type="monotone" dataKey="onTime" stroke="#10b981" strokeWidth={3} name="On Time %" />
                  <Line type="monotone" dataKey="delayed" stroke="#ef4444" strokeWidth={3} name="Delayed %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Port Volume Distribution</CardTitle>
              <p className="text-sm text-slate-600">Traffic by major ports</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={portData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {portData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Route Performance Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Route Performance Analysis</CardTitle>
            <p className="text-sm text-slate-600">Efficiency metrics by major shipping routes</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-medium text-slate-900">Route</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-900">Volume (TEU)</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-900">Efficiency</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-900">Cost Savings</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {routePerformance.map((route, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 font-medium">{route.route}</td>
                      <td className="py-3 px-4">{route.volume.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${route.efficiency}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{route.efficiency}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">${route.savings}M</td>
                      <td className="py-3 px-4">
                        <Badge variant={route.efficiency > 90 ? 'default' : 'secondary'}>
                          {route.efficiency > 90 ? 'Excellent' : 'Good'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Cost Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Cost Analysis Trend</CardTitle>
            <p className="text-sm text-slate-600">Monthly cost optimization impact</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Bar dataKey="cost" fill="#3b82f6" name="Cost ($M)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Analytics;
