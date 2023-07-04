import GlobalStyle from "./theme/GlobalStyles";
import CarsList from "./features/carsList/CarsList";
import Header from "./features/header/Header";

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <CarsList />
    </>
    
  );
}

export default App;
