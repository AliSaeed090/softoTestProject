import React from "react";
import Pages from "../src/Pages";
import { AppProviders } from "./providers/AppProviders";

function App() {
  return (
    <AppProviders>
      <Pages />
    </AppProviders>
  );
}

export default App;
