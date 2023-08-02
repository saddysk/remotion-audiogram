import { FC } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import AudiogramIndex from "./views/Index";
import { AudioContextProvider } from "./contexts/AudioContext";

const App: FC = () => {
  return (
    <>
      <AudioContextProvider>
        <ChakraProvider>
          <AudiogramIndex />
        </ChakraProvider>
      </AudioContextProvider>
    </>
  );
};

export default App;
