import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
// import { store } from "./services/store/store.js";
import { AppContextProvider } from "./services/contextApi/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  // <Provider store={store}>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  // </Provider>,
);
