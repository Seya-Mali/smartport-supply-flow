
import React from 'react';
import { Layout } from '@/components/Layout';

const Ports = () => {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Port Monitor</h1>
        <p className="text-slate-600 mb-6">
          Real-time monitoring of global port congestion and berth availability
        </p>
        <div className="bg-white rounded-lg border p-6">
          <p className="text-slate-500">Port monitoring dashboard coming soon...</p>
        </div>
      </div>
    </Layout>
  );
};

export default Ports;
