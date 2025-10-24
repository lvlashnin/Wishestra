import { FilterPanel } from "./components/FilterPanel.tsx";
import { Header } from "./components/Header.tsx";
import { Pagination } from "./components/Pagination.tsx";
import { WishList } from "./components/WishList.tsx";
import { WishProvider } from "./context/WishContext";

function App() {
  return (
    <WishProvider>
      <div className="container mx-auto px-4">
        <Header />
        <FilterPanel />
        <WishList />
        <Pagination />
      </div>
    </WishProvider>
  );
}

export default App;
