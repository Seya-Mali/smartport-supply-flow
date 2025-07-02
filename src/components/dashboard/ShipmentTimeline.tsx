
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const timelineData = [
  { date: 'Jan', delays: 1.8, savings: 0.2 },
  { date: 'Feb', delays: 1.6, savings: 0.4 },
  { date: 'Mar', delays: 1.4, savings: 0.8 },
  { date: 'Apr', delays: 1.2, savings: 1.1 },
  { date: 'May', delays: 0.9, savings: 1.6 },
  { date: 'Jun', delays: 0.6, savings: 2.1 },
  { date: 'Jul', delays: 0.4, savings: 2.4 },
  { date: 'Aug', delays: 0.3, savings: 2.6 }
];

export const ShipmentTimeline = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">SmartPort Impact Over Time</CardTitle>
        <p className="text-sm text-slate-600">Average delays (days) vs Cost savings ($M)</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="date" 
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
            <Line 
              type="monotone" 
              dataKey="delays" 
              stroke="#ef4444" 
              strokeWidth={3}
              name="Avg Delays (days)"
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="savings" 
              stroke="#10b981" 
              strokeWidth={3}
              name="Cost Savings ($M)"
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
