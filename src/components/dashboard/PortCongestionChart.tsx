
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { port: 'LA/LB', current: 45, predicted: 38, optimal: 20 },
  { port: 'NY/NJ', current: 32, predicted: 28, optimal: 18 },
  { port: 'Savannah', current: 28, predicted: 24, optimal: 15 },
  { port: 'Seattle', current: 22, predicted: 19, optimal: 12 },
  { port: 'Charleston', current: 18, predicted: 15, optimal: 10 },
  { port: 'Houston', current: 15, predicted: 12, optimal: 8 }
];

export const PortCongestionChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">Port Congestion Analysis</CardTitle>
        <p className="text-sm text-slate-600">Wait times in hours by major ports</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="port" 
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis 
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1e293b',
                border: 'none',
                borderRadius: '8px',
                color: 'white'
              }}
            />
            <Bar dataKey="current" fill="#ef4444" name="Current Wait" radius={[2, 2, 0, 0]} />
            <Bar dataKey="predicted" fill="#f59e0b" name="Predicted Wait" radius={[2, 2, 0, 0]} />
            <Bar dataKey="optimal" fill="#10b981" name="Optimal Wait" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
