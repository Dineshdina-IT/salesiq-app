import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const go = (path) => navigate(`/settings/${path}`);

  const columns = [
    {
      title: "GENERAL",
      items: [
        { label: "My Profile", path: "my-profile" },
        { label: "Company Profile", path: "company-profile" },
        { label: "Operators", path: "operators" },
        { label: "Departments", path: "departments" },
        { label: "Usage Statistics", path: "usage-statistics" },
        { label: "Recycle Bin", path: "recycle-bin" },
        { label: "Conversation Layout", path: "conversation-layout" },
      ],
    },
    {
      title: "PERSONALIZE",
      items: [
        { label: "Brands", path: "brands" },
        { label: "Global Settings", path: "global-settings" },
        { label: "Email Templates", path: "email-templates" },
        { label: "Profanity Library", path: "profanity-library" },
        { label: "Tags", path: "tags" },
        { label: "TV App", path: "tv-app" },
      ],
    },
    {
      title: "MESSAGING CHANNELS",
      items: [
        { label: "Facebook Messenger", path: "fb-messenger" },
        { label: "Telegram", path: "telegram" },
        { label: "Instagram", path: "instagram" },
        { label: "WhatsApp", path: "whatsapp" },
        { label: "LINE", path: "line" },
      ],
    },
    {
      title: "AUTOMATE",
      items: [
        { label: "Triggers", path: "triggers" },
        { label: "Visitor Routing", path: "visitor-routing" },
        { label: "Chat Routing", path: "chat-routing" },
        { label: "Call Routing", path: "call-routing" },
        { label: "Lead Scoring", path: "lead-scoring" },
        { label: "Company Scoring", path: "company-scoring" },
        { label: "Schedule Report", path: "schedule-report" },
      ],
    },
    {
      title: "CONTROLS",
      items: [
        { label: "Conversation Monitor", path: "conversation-monitor" },
        { label: "Block IP", path: "block-ip" },
        { label: "Do Not Track", path: "do-not-track" },
        { label: "Import", path: "import" },
        { label: "Profiles", path: "profiles" },
        { label: "Spammers", path: "spammers" },
      ],
    },
    {
      title: "BOT",
      items: [
        { label: "Zobot", path: "zobot" },
        { label: "Answer Bot", path: "answer-bot" },
      ],
    },
    {
      title: "DEVELOPERS",
      items: [
        { label: "Integrations", path: "integrations" },
        { label: "Workflows", path: "workflows" },
        { label: "Widgets", path: "widgets" },
        { label: "Form Controllers", path: "form-controllers" },
        { label: "Plugs", path: "plugs" },
      ],
    },
  ];

  return (
    <div className="siq-settings-page">
      <div className="siq-settings-header">
        <div className="siq-settings-icon">⚙</div>
        <h1>Settings</h1>
      </div>

      <div className="siq-settings-search-wrapper">
        <input className="siq-settings-search" placeholder="Search" />
      </div>

      <div className="siq-settings-columns">
        {columns.map((col, index) => (
          <div key={index} className="siq-settings-column">
            <h3>{col.title}</h3>
            <ul>
              {col.items.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => go(item.path)}
                  className="siq-link"
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
