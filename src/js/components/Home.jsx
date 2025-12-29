import React from "react";

import SecondsCounter from "./SecondsCounter";

export default function Home() {
  return (
    <div className="text-center mt-5">
      <SecondsCounter seconds={0} />
    </div>
  );
}
