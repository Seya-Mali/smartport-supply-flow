
import React from 'react';
import { Layout } from '@/components/Layout';

const Alerts = () => {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Alerts & Notifications</h1>
        <p className="text-slate-600 mb-6">
          Critical alerts and notifications for supply chain disruptions
        </p>
        <div className="bg-white rounded-lg border p-6">
          <p className="text-slate-500">Alerts dashboard coming soon...</p>
        </div>
      </div>
    </Layout>
  );
};

export default Alerts;
