
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Clock, Ship, AlertTriangle } from "lucide-react";

const metrics = [
  {
    title: "Active Shipments",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: Ship,
    color: "text-blue-600"
  },
  {
    title: "Average Delay",
    value: "0.3 days",
    change: "-65%",
    trend: "down",
    icon: Clock,
    color: "text-green-600"
  },
  {
    title: "Port Congestion",
    value: "23%",
    change: "-8%",
    trend: "down",
    icon: AlertTriangle,
    color: "text-orange-600"
  },
  {
    title: "Cost Savings",
    value: "$2.4M",
    change: "+18%",
    trend: "up",
    icon: TrendingUp,
    color: "text-emerald-600"
  }
];

export const MetricsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              {metric.title}
            </CardTitle>
            <metric.icon className={`w-4 h-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{metric.value}</div>
            <div className="flex items-center mt-1">
              {metric.trend === 'up' ? (
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 text-green-500 mr-1" />
              )}
              <span className="text-xs text-green-600 font-medium">
                {metric.change} from last month
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
