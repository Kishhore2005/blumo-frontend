// src/Pages/Campaign/Index.tsx
import React from "react";
import CampaignForm from '../../Components/Forms/CampaignForm';
import { PaperClipIcon } from '@heroicons/react/24/outline';

const CampaignIndex: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="flex items-center gap-2 text-4xl font-extrabold text-gray-900 mb-1">
          <PaperClipIcon className="w-9 h-9 text-purple-500" />
          Create Campaign
        </h1>
        <p className="text-gray-400 text-lg">Set up your email campaign details</p>
      </div>
      <CampaignForm />
    </div>
  );
};

export default CampaignIndex;
