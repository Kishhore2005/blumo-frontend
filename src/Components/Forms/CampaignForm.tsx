import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EnvelopeIcon, TagIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { campaignState } from "../../Utils/CampaignState";

const CampaignForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [mail, setMail] = useState("");
  const navigate = useNavigate();   

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store form data in campaign state
    campaignState.setCampaignData({
      senderMail: mail,
      campaignName: title,
      subject: subject,
      content: "",
    });
    navigate("/campaign/compose");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-8 flex flex-col gap-6"
    >
      {/* Sender Email */}
      <div>
        <label htmlFor="senderMail" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <EnvelopeIcon className="w-5 h-5 text-purple-500" />
          Sender Email
        </label>
        <input
          id="senderMail"
          type="email"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          placeholder="your-email@example.com"
          required
        />
      </div>
      {/* Campaign Name */}
      <div>
        <label htmlFor="campaignName" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <TagIcon className="w-5 h-5 text-purple-500" />
          Campaign Name
        </label>
        <input
          id="campaignName"
          type="text"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter campaign name"
          required
        />
      </div>
      {/* Email Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <PencilSquareIcon className="w-5 h-5 text-purple-500" />
          Email Subject
        </label>
        <input
          id="subject"
          type="text"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter email subject line"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-3 rounded-lg shadow hover:from-purple-600 hover:to-indigo-600 transition"
      >
        Create Campaign
      </button>
    </form>
  );
};

export default CampaignForm;
