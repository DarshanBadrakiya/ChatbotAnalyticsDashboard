import { useEffect, useState } from "react";
import axios from "axios";
import StateCard from "../components/StateCard";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import "./Dashboard.css"
export default function Dashboard() {

  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4040/api/analytics/dashboard")
      .then(res => setData(res.data.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container-fluid dashboard-wrapper py-5 px-4 px-lg-5">

      <h2 className="dashboard-title mb-4">
        AI Chatbot Analytics Dashboard
      </h2>

      {/* Stats */}
      <div className="row g-4">
        <div className="col-sm-6 col-lg-3">
          <StateCard title="Total Conversations" value={data.overview.totalConversation} />
        </div>
        <div className="col-sm-6 col-lg-3">
          <StateCard title="Total Messages" value={data.overview.totalMessages} />
        </div>
        <div className="col-sm-6 col-lg-3">
          <StateCard title="Total LLM Usage" value={data.overview.totalLLM} />
        </div>
        <div className="col-sm-6 col-lg-3">
          <StateCard title="Total Lex Usage" value={data.overview.totalLex} />
        </div>
        <div className="col-sm-6 col-lg-3">
          <StateCard title="Total RAG Usage" value={data.overview.totalRAG} />
        </div>
      </div>

      {/* Charts */}
      <div className="row g-4 mt-3">
        <div className="col-lg-7">
          <div className="card chart-card p-4 border-0">
            <h5 className="fw-semibold mb-3">Conversations Per Day</h5>
            <LineChart data={data.conversationPerDay} />
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card chart-card p-4 border-0">
            <h5 className="fw-semibold mb-3">LLM vs Lex vs RAG Usage</h5>
            <PieChart
              llm={data.overview.totalLLM}
              lex={data.overview.totalLex}
              rag={data.overview.totalRAG}
            />
          </div>
        </div>
      </div>

    </div>
  );

}
