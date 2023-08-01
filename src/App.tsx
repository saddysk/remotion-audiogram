import { FC } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import AudiogramIndex from "./views/Index";

const App: FC = () => {
  return (
    <>
      <ChakraProvider>
        <AudiogramIndex />
      </ChakraProvider>
    </>
  );
};

export default App;
