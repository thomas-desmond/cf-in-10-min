import React from 'react';
import { Activity } from 'lucide-react';
import StatusBadge from './StatusBadge';

interface Service {
  name: string;
  status: 'operational' | 'partial' | 'major';
}

const services: Service[] = [
  { name: 'API', status: 'operational' },
  { name: 'Cloudflare.com', status: 'operational'},
  { name: 'developers.cloudflare.com', status: 'partial'},
  { name: 'CDN', status: 'operational'},
  { name: 'Authentication', status: 'major' },
  { name: 'Storage', status: 'operational' },
];

export default function ServiceStatus() {
  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Activity className="h-8 w-8 text-indigo-600" />
          <h1 className="ml-3 text-2xl font-bold text-gray-900">System Status</h1>
        </div>
        <div className="text-sm text-gray-500">
          Last checked: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg w-full">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Services
          </h3>
        </div>
        <div className="bg-gray-50 w-full">
          {services.map((service, index) => (
            <div
              key={service.name}
              className={`w-full px-4 py-5 sm:px-6 ${
                index !== services.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              <div className="flex items-center w-full justify-between">
                <div className="flex w-full items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900 w-40">
                    {service.name}
                  </h4>
                  <StatusBadge status={service.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Status Legend
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(['operational', 'partial', 'major'] as const).map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <StatusBadge status={status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}