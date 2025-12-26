import type { NodeData } from "../types/index.ts";
import {
  getSizeClass,
  getShapeClass,
  getColorWarmth,
  getBackgroundColor,
  getTitleOpacity,
  calculateRecency,
} from "../utils/nodeStyles.ts";
import usernode from "../../public/usernode-removebg-preview.png";

interface GraphNodeProps {
  data: NodeData;
  isSelected: boolean;
}

export const GraphNode = ({ data, isSelected }: GraphNodeProps) => {
  const isActive = !data.endDate;
  const recency = calculateRecency(data.startDate, data.endDate);

  return (
    <div className="flex flex-col gap-1 items-center">
      <h3 className={`${getTitleOpacity(data.category)} text-sm`}>
        {data.jobName}
      </h3>

      {data.category === "root" ? (
        <img
          src={usernode}
          className={`
          ${getSizeClass(data.category)}
          ${getShapeClass(data.category)}
          cursor-pointer
          `}
        ></img>
      ) : (
        <div
          className={`
          ${getShapeClass(data.category)}
          ${getBackgroundColor(data.category, isSelected)}
          ${!isSelected ? getColorWarmth(recency) : ""}
          ${isActive ? "ring-4 ring-emerald-600" : ""}
          ${getSizeClass(data.category)}
          flex items-center justify-center
          transition-all cursor-pointer
        `}
        />
      )}

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
