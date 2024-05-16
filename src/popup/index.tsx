import { createRoot } from "react-dom/client";

import { Popup } from "./Popup";

const container = document.getElementById("popup") as HTMLElement;
createRoot(container).render(<Popup />);
