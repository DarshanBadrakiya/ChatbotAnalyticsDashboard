import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ llm, lex,rag }) {

  const data = {
    labels: ["LLM", "Lex","Rag"],
    datasets: [
      {
        data: [llm, lex,rag],
        backgroundColor: ["#2563eb", "#22c55e","#E9967A"]
      }
    ]
  };

  return <Pie data={data} />;
}
