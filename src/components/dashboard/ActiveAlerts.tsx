import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, Ship, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const alerts = [
  {
    id: 1,
    type: "high",
    title: "Port Congestion Alert",
    description: "LA/LB port experiencing 45hr delays",
    location: "Los Angeles/Long Beach",
    shipments: 12,
    action: "Reroute to Oakland",
    time: "2 mins ago"
  },
  {
    id: 2,
    type: "medium",
    title: "Weather Delay",
    description: "Hurricane affecting Gulf Coast routes",
    location: "Houston Port",
    shipments: 8,
    action: "Monitor conditions",
    time: "15 mins ago"
  },
  {
    id: 3,
    type: "low",
    title: "Dock Availability",
    description: "Premium slots available at Savannah",
    location: "Savannah Port",
    shipments: 5,
    action: "Book slots",
    time: "1 hour ago"
  }
];

export const ActiveAlerts = () => {
  const navigate = useNavigate();

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'high': return 'bg-red-50 border-red-200';
      case 'medium': return 'bg-orange-50 border-orange-200';
      case 'low': return 'bg-blue-50 border-blue-200';
      default: return 'bg-slate-50 border-slate-200';
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-orange-100 text-orange-700';
      case 'low': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
          Active Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div 
            key={alert.id}
            className={`p-4 rounded-lg border ${getAlertColor(alert.type)} transition-colors hover:shadow-sm`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-slate-900">{alert.title}</h4>
                  <Badge className={getBadgeColor(alert.type)}>
                    {alert.type.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mb-2">{alert.description}</p>
                <div className="flex items-center space-x-4 text-xs text-slate-500">
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {alert.location}
                  </div>
                  <div className="flex items-center">
                    <Ship className="w-3 h-3 mr-1" />
                    {alert.shipments} shipments
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {alert.time}
                  </div>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="ml-4"
                onClick={() => navigate('/alerts')}
              >
                {alert.action}
              </Button>
            </div>
          </div>
        ))}
        
        <Button 
          variant="ghost" 
          className="w-full text-sm text-slate-600 hover:text-slate-900"
          onClick={() => navigate('/alerts')}
        >
          View All Alerts →
        </Button>
      </CardContent>
    </Card>
  );
};
