
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ship, MapPin, Clock } from "lucide-react";

const shipments = [
  {
    id: "WM-2024-001",
    vessel: "Ever Given",
    route: "Shanghai → LA/LB",
    status: "en-route",
    eta: "Dec 15, 2024",
    delay: null,
    cargo: "Electronics, Apparel"
  },
  {
    id: "WM-2024-002", 
    vessel: "MSC Gülsün",
    route: "Rotterdam → NY/NJ",
    status: "delayed",
    eta: "Dec 18, 2024",
    delay: "6 hours",
    cargo: "Home Goods, Toys"
  },
  {
    id: "WM-2024-003",
    vessel: "OOCL Hong Kong",
    route: "Busan → Seattle",
    status: "docked",
    eta: "Dec 12, 2024",
    delay: null,
    cargo: "Automotive Parts"
  },
  {
    id: "WM-2024-004",
    vessel: "CMA CGM Marco Polo",
    route: "Hamburg → Savannah",
    status: "rerouted",
    eta: "Dec 20, 2024",
    delay: "2 days",
    cargo: "Food Products"
  }
];

export const RecentShipments = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en-route': return 'bg-blue-100 text-blue-700';
      case 'delayed': return 'bg-red-100 text-red-700';
      case 'docked': return 'bg-green-100 text-green-700';
      case 'rerouted': return 'bg-orange-100 text-orange-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
          <Ship className="w-5 h-5 mr-2 text-blue-500" />
          Recent Shipments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {shipments.map((shipment) => (
            <div 
              key={shipment.id}
              className="p-4 border border-slate-200 rounded-lg hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-slate-900">{shipment.id}</h4>
                    <Badge className={getStatusColor(shipment.status)}>
                      {shipment.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-slate-700 mb-1">{shipment.vessel}</p>
                  <div className="flex items-center space-x-4 text-xs text-slate-500 mb-2">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {shipment.route}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      ETA: {shipment.eta}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600">{shipment.cargo}</p>
                </div>
                {shipment.delay && (
                  <div className="text-right">
                    <div className="text-xs text-red-600 font-medium">
                      +{shipment.delay} delay
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
