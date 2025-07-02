
import React from 'react';
import { Layout } from '@/components/Layout';

const Shipments = () => {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Active Shipments</h1>
        <p className="text-slate-600 mb-6">
          Track all active shipments and their current status
        </p>
        <div className="bg-white rounded-lg border p-6">
          <p className="text-slate-500">Shipments tracking dashboard coming soon...</p>
        </div>
      </div>
    </Layout>
  );
};

export default Shipments;
