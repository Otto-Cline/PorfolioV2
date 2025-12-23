import type { NodeData } from "../types/index.ts";
import {
  getSizeClass,
  getShapeClass,
  getColorWarmth,
  getTitleOpacity,
  calculateRecency,
} from "../utils/nodeStyles.ts";

interface GraphNodeProps {
  data: NodeData;
}

export const GraphNode = ({ data }: GraphNodeProps) => {
  const isActive = !data.endDate;
  const recency = calculateRecency(data.startDate, data.endDate);

  return (
    <div className="flex flex-col gap-1 items-center">
      <h3 className={`${getTitleOpacity(data.category)} text-sm`}>
        {data.jobName}
      </h3>

      <div
        className={`
          ${getShapeClass(data.category)}
          ${getColorWarmth(recency)}
          ${isActive ? "ring-4 ring-emerald-600" : ""}
          ${getSizeClass(data.category)}
          flex items-center justify-center
          transition-all
        `}
      />

      <div
        className={`bg-neutral-900 pt-1 rounded-md ${getTitleOpacity(
          data.category
        )}`}
      >
        <h3 className="text-xs">{data.title}</h3>
      </div>
    </div>
  );
};

export default GraphNode;
