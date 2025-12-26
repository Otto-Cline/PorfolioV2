import "./App.css";
import GraphNode from "./components/GraphNode";
import { useEffect, useState } from "react";
import musicImage from "../public/mppcover.png";
import githubLogo from "../public/githubLogo.png";
import { Sidebar } from "./components/Sidebar.tsx";
import { useSpring, animated } from "@react-spring/web";
import { nodes } from "./utils/nodes.ts";

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

  const [isSidebarOpen, toggleSidebarOpen] = useState(false);
  const [lastClickedNode, setLastClickedNode] = useState(0);

  const graphTransform = useSpring({
    transform: isSidebarOpen ? "translateX(-160px)" : "translateX(0px)",
    config: { tension: 280, friction: 60 },
  });

  return (
    <>
      <div className="relative min-h-screen bg-neutral-900 text-white max-w-s m-0 flex flex-col items-center justify-center">
        <div className="absolute top-4 left-4">hi! click on a node</div>
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={() => toggleSidebarOpen(!isSidebarOpen)}
            className="bg-neutral-800 px-4 py-2 rounded cursor-pointer"
          >
            sidebar
          </button>
        </div>

        <Sidebar
          data={{ isOpen: isSidebarOpen, nodeInfo: nodes[lastClickedNode] }}
        ></Sidebar>

        <img
          src={musicImage}
          className="absolute left-15 bottom-4 w-10 h-10 cursor-pointer"
        ></img>

        <img
          src={githubLogo}
          className="absolute left-4 bottom-4 w-10 h-10 cursor-pointer"
        ></img>

        <animated.div style={graphTransform} className="absolute inset-0">
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

          {nodes.map((node) => (
            <div
              key={node.id}
              className={`absolute`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => {
                if (lastClickedNode == node.id) {
                  toggleSidebarOpen(!isSidebarOpen);
                } else {
                  toggleSidebarOpen(true);
                }

                setLastClickedNode(node.id);
              }}
            >
              <GraphNode data={node} isSelected={lastClickedNode == node.id} />
            </div>
          ))}
        </animated.div>
      </div>
    </>
  );
}

export default App;
