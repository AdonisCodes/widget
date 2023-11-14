
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import {ChatWidget}  from "./components/widget";
export default function App() {
  return <MantineProvider theme={theme}><ChatWidget/></MantineProvider>;
}
