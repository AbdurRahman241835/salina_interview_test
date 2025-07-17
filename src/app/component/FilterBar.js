import React from "react";

function FilterBar({ setFilter }) {
  return (
    <div className="flex justify-between p-2 mt-2 rounded border border-black">
      <p
        className="text-black cursor-pointer"
        onClick={() => setFilter("all")}
      >
        All
      </p>
      <p
        className="text-black cursor-pointer"
        onClick={() => setFilter("completed")}
      >
        Completed
      </p>
      <p
        className="text-black cursor-pointer"
        onClick={() => setFilter("incomplete")}
      >
        Incomplete
      </p>
    </div>
  );
}

export default FilterBar;
