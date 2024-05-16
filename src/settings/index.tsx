import { createRoot } from "react-dom/client";

import { Settings } from "./Settings";

const container = document.getElementById("settings") as HTMLElement;
createRoot(container).render(<Settings />);
