import React from 'react';

type StatusType = 'operational' | 'degraded' | 'partial' | 'major';

interface StatusBadgeProps {
  status: StatusType;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'partial':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'major':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'operational':
        return 'Operational';
      case 'degraded':
        return 'Degraded';
      case 'partial':
        return 'Partial Outage';
      case 'major':
        return 'Major Outage';
      default:
        return 'Unknown';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles()}`}>
      <span className={`w-1.5 h-1.5 mr-1.5 rounded-full ${status === 'operational' ? 'bg-green-600' : status === 'degraded' ? 'bg-yellow-600' : status === 'partial' ? 'bg-orange-600' : 'bg-red-600'}`}></span>
      {getStatusText()}
    </span>
  );
}