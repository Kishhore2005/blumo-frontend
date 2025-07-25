import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SubmitButton from "../Buttons/SubmitButton";
import { campaignState } from "../../Utils/CampaignState";
import { sendCampaign } from "../../Services/CampaignService";
import { CampaignData } from "../../Types/CampaignTypes";

const QuillEditor: React.FC = () => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [campaignData, setCampaignData] = useState<CampaignData | null>(null);

  useEffect(() => {
    const storedData = campaignState.getCampaignData();
    if (storedData) setCampaignData(storedData);
  }, []);

  const handleSubmit = async () => {
    if (!campaignData) {
      alert("No campaign data found. Please go back and fill the form.");
      return;
    }
    if (!content.trim()) {
      alert("Please add some content to your campaign.");
      return;
    }
    setIsLoading(true);
    try {
      const completeData: CampaignData = {
        ...campaignData,
        content: content,
        status: 'sent'
      };
      const ejsContent = campaignState.convertToEJS(content);
      const finalData = { ...completeData, content: ejsContent };
      const response = await sendCampaign(finalData);
      if (response.success) {
        alert("Campaign sent successfully!");
        campaignState.clearCampaignData();
        // Navigate back to campaign list or dashboard
      } else {
        alert(`Error: ${response.message}`);
      }
    } catch (error) {
      console.error('Error sending campaign:', error);
      alert("Failed to send campaign. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="bg-white rounded-xl shadow p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Compose Your Campaign</h1>
          <p className="text-gray-500">Create beautiful email content with our rich text editor</p>
        </div>
        {campaignData && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8 flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-gray-600">Campaign:</span>
              <span className="text-gray-800">{campaignData.campaignName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-gray-600">Subject:</span>
              <span className="text-gray-800">{campaignData.subject}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-gray-600">From:</span>
              <span className="text-gray-800">{campaignData.senderMail}</span>
            </div>
          </div>
        )}
        <div className="mb-8">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="Start writing your email content here..."
            modules={{
              toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'align': [] }],
                ['link', 'image'],
                ['clean']
              ]
            }}
            className="bg-white rounded-lg"
          />
        </div>
        <div className="flex justify-center">
          <SubmitButton
            text="Send Campaign"
            onClick={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default QuillEditor;
