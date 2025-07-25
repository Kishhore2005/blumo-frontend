import { useEffect, useState } from "react";
import { EnvelopeIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useAppSelector } from '../../app/hooks';
import { API_BASE } from "../../Config/Env";
interface CampaignSummary {
  senderMail?: string;
  campaignName?: string;
  subject?: string;
}

export default function DashboardIndex() {
  const [totalEmails, setTotalEmails] = useState<number | null>(null);
  const [campaigns, setCampaigns] = useState<CampaignSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/dashboard/summary`);
        const data = await res.json();
        setTotalEmails(data.totalEmails);
        setCampaigns(data.campaigns || []);
      } catch (err) {
        setTotalEmails(0);
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { label: 'Campaigns Sent', value: totalEmails !== null ? totalEmails : '—', icon: <EnvelopeIcon className="w-7 h-7 text-purple-500" /> },
  ];

  const quickActions = [
    {
      label: 'Create Campaign',
      desc: 'Start a new email campaign',
      icon: <PlusIcon className="w-7 h-7 text-white" />, bg: 'bg-purple-500',
      text: 'text-purple-600',
      arrow: 'text-purple-400',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1 flex items-center gap-2">
            Good morning! <span className="text-2xl">👋</span>
          </h1>
          <p className="text-gray-500">Here's what's happening with your email campaigns today.</p>
        </div>
        {user && (
          <div className="flex flex-col items-end bg-purple-50 rounded-lg p-4 min-w-[180px]">
            <div className="font-semibold text-gray-900 text-base truncate">{user.name || user.email}</div>
            {user.email && <div className="text-xs text-gray-500 truncate">{user.email}</div>}
          </div>
        )}
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start ">
        {/* Left: Campaigns Sent + Create Campaign */}
        <div className="flex flex-col gap-8 h-full mt-10 ">
          {/* Campaigns Sent Stat Card */}
          <div className="bg-white rounded-xl shadow flex flex-col items-center justify-center p-8 gap-3 border border-gray-100 min-h-[180px]">
            <div>{stats[0].icon}</div>
            <div className="text-3xl font-bold text-gray-900">{stats[0].value}</div>
            <div className="text-gray-500 text-base font-medium">{stats[0].label}</div>
          </div>
          {/* Create Campaign Quick Action */}
          <div className="bg-white rounded-xl shadow p-8 flex flex-col gap-3 border border-gray-100 min-h-[180px] justify-between mt-13">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-2 bg-purple-500">{quickActions[0].icon}</div>
            <div className="font-semibold text-gray-900 text-xl">{quickActions[0].label}</div>
            <div className="text-gray-500 text-base mb-2">{quickActions[0].desc}</div>
            <div className="flex items-center gap-1 mt-auto text-base font-medium cursor-pointer group">
              <span className="group-hover:underline text-purple-600">→</span>
            </div>
          </div>
        </div>
        {/* Right: Recent Campaigns fills half screen */}
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-3">  
            <div className="font-semibold text-gray-900 text-2xl">Recent Campaigns</div>
         
          </div>
          <div className="bg-white rounded-xl shadow border border-gray-100 flex-1 min-h-[380px] max-h-[500px] overflow-y-auto divide-y divide-gray-100 scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-gray-50">
            {loading ? (
              <div className="flex items-center justify-center h-40 text-gray-400">Loading...</div>
            ) : campaigns.length === 0 ? (
              <div className="flex items-center justify-center h-40 text-gray-400">No campaigns found.</div>
            ) : (
              [...campaigns].reverse().map((c, i) => (
                <div key={i} className="flex flex-col px-8 py-6 gap-1">
                  <div className="flex flex-col md:flex-row md:items-center font-medium text-gray-900 text-lg gap-1 md:gap-3">
                    <span className="truncate max-w-xs">{c.campaignName || '—'}</span>
                    <span className="text-xs text-gray-400 font-normal">{c.senderMail || '—'}</span>
                  </div>
                  <div className="text-xs text-gray-500 truncate">{c.subject || '—'}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}