import "./App.css";
import GraphNode from "./components/GraphNode";
import type { NodeData } from "./types/index.ts";
import { useEffect, useState } from "react";

const nodes: NodeData[] = [
  {
    id: 1,
    title: "Otto Cline",
    startDate: new Date("2006-10-24"),
    category: "root",
    description: "material agent in real space",
    primaryRelatedNodes: [2, 8, 4],
    secondaryRelatedNotes: [],
    x: 50,
    y: 50,
  },
  {
    id: 2,
    title: "AI and Search",
    jobName: "KMW Technology",
    startDate: new Date("2026-01-05"),
    category: "job",
    description:
      "Making search work for enterprise companies, researching NLP optimization",
    primaryRelatedNodes: [],
    secondaryRelatedNotes: [],
    x: 30,
    y: 40,
  },
  {
    id: 3,
    title: "CS and Biz Major",
    jobName: "Northeastern",
    startDate: new Date("2024-01-05"),
    category: "education",
    description:
      "Making search work for enterprise companies, researching NLP optimization",
    primaryRelatedNodes: [6],
    secondaryRelatedNotes: [7],
    x: 40,
    y: 75,
  },
  {
    id: 4,
    title: "Page",
    jobName: "NYPL Periodicals",
    startDate: new Date("2023-01-05"),
    endDate: new Date("2024-01-05"),
    category: "job",
    description:
      "Making search work for enterprise companies, researching NLP optimization",
    primaryRelatedNodes: [],
    secondaryRelatedNotes: [],
    x: 70,
    y: 50,
  },
  {
    id: 5,
    title: "Intern / Helper guy",
    jobName: "Zo Computer",
    startDate: new Date("2025-10-01"),
    category: "job",
    description: "Building the logical next step to AGI",
    primaryRelatedNodes: [],
    secondaryRelatedNotes: [],
    x: 50,
    y: 15,
  },

  {
    id: 6,
    title: "rev ^_^",
    startDate: new Date("2026-01-05"),
    category: "insig",
    description:
      "Making search work for enterprise companies, researching NLP optimization",
    primaryRelatedNodes: [],
    secondaryRelatedNotes: [],
    x: 30,
    y: 90,
  },
  {
    id: 7,
    title: "1st Place",
    jobName: "Remark + Google Hackathon",
    startDate: new Date("2026-01-05"),
    endDate: new Date("2026-01-05"),
    category: "insig",
    description:
      "Making search work for enterprise companies, researching NLP optimization",
    primaryRelatedNodes: [],
    secondaryRelatedNotes: [],
    x: 47,
    y: 90,
  },
  {
    id: 8,
    title: "Highschool",
    jobName: "BSGE",
    startDate: new Date("2020-01-05"),
    endDate: new Date("2024-06-30"),
    category: "insig",
    description:
      "Making search work for enterprise companies, researching NLP optimization",
    primaryRelatedNodes: [3],
    secondaryRelatedNotes: [],
    x: 40,
    y: 60,
  },
  {
    id: 9,
    title: "Captain",
    jobName: "Sting Robotics",
    startDate: new Date("2020-01-05"),
    endDate: new Date("2024-6-30"),
    category: "insig",
    description:
      "Making search work for enterprise companies, researching NLP optimization",
    primaryRelatedNodes: [8],
    secondaryRelatedNotes: [],
    x: 20,
    y: 61,
  },
  {
    id: 10,
    title: "Ambassador",
    jobName: "Zo Computer",
    startDate: new Date("2025-10-00"),
    category: "job",
    description:
      "Making search work for enterprise companies, researching NLP optimization",
    primaryRelatedNodes: [1, 5],
    secondaryRelatedNotes: [],
    x: 52,
    y: 33,
  },
  {
    id: 11,
    title: "Picture Collection DB",
    startDate: new Date("2025-05-00"),
    endDate: new Date("2025-07-00"),
    category: "project",
    description:
      "Making search work for enterprise companies, researching NLP optimization",
    primaryRelatedNodes: [4],
    secondaryRelatedNotes: [],
    x: 75,
    y: 63,
  },
];

const getNodePosition = (id: number) => {
  const node = nodes.find((n) => n.id === id);
  return node
    ? {
        x: (node.x / 100) * window.innerWidth,
        y: (node.y / 100) * window.innerHeight,
      }
    : { x: 0, y: 0 };
};

function App() {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      forceUpdate((prev) => prev + 1);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="relative min-h-screen bg-neutral-900 text-white max-w-s m-0 flex flex-col items-center justify-center">
        <div className="absolute top-4 right-4">
          <div className="bg-neutral-800 px-4 py-2 rounded">expand me..</div>
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {nodes.map((node) => (
            <>
              {node.primaryRelatedNodes.map((targetId) => {
                const from = getNodePosition(node.id);
                const to = getNodePosition(targetId);
                return (
                  <line
                    key={`${node.id}-${targetId}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="#d9e4eb"
                    strokeWidth={4}
                    opacity={0.8}
                  />
                );
              })}

              {/* Same for secondary connections */}
              {node.secondaryRelatedNotes.map((targetId) => {
                const from = getNodePosition(node.id);
                const to = getNodePosition(targetId);
                return (
                  <line
                    key={`${node.id}-${targetId}-sec`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="#6b7280"
                    strokeWidth={4}
                    opacity={0.5}
                    strokeDasharray="4 4"
                  />
                );
              })}
            </>
          ))}
        </svg>

        <div className="flex flex-row gap-4">
          {nodes.map((node) => (
            <div
              key={node.id}
              className="absolute"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)", // Center node on coordinates
              }}
            >
              <GraphNode data={node} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
