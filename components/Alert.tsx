import React from 'react';
import { ExclamationCircleIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/24/solid';

type AlertType = 'error' | 'success' | 'info';

interface AlertProps {
  type: AlertType;
  message: string;
}

const alertStyles = {
  error: 'bg-red-50 text-red-700 border-red-200',
  success: 'bg-green-50 text-green-700 border-green-200',
  info: 'bg-blue-50 text-blue-700 border-blue-200',
};

const icons = {
  error: ExclamationCircleIcon,
  success: CheckCircleIcon,
  info: InformationCircleIcon,
};

export const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const Icon = icons[type];

  return (
    <div className={`p-4 rounded-lg border ${alertStyles[type]} flex items-start`}>
      <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
      <p>{message}</p>
    </div>
  );
}; 