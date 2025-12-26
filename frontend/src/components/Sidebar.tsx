import type { SidebarData } from "../types/index";

interface SidebarProps {
  data: SidebarData;
}

export const Sidebar = ({ data }: SidebarProps) => {
  if (!data.isOpen) {
    return <div></div>;
  } else {
    return (
      <>
        <div
          className={`
            fixed top-20 right-5 h-5/6 w-80 bg-neutral-800 z-50 rounded-3xl
            flex flex-col items-center
            transform transition-transform duration-300 ease-in-out
            ${data.isOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <h1 className="pt-3 font-bold">{data.nodeInfo?.title}</h1>
          <h3 className="font-bold">{data.nodeInfo?.jobName}</h3>
          <p className="p-3">{data.nodeInfo?.description}</p>
        </div>
      </>
    );
  }
};
