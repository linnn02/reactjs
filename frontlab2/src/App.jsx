import FragmentLayout from "./task1/FragmentLayout";
import ItemList from "./task1/ItemList";
import CombinedFragment from "./task1/CombinedFragment";

import Section from "./task2/Section";
import ProductList from "./task2/ProductList";
//главный компонент объединяющий 2.1 и 2.2
function App() {
  return (
    <>
    {/*задания 2.1*/}
    <p><b>task 2.1</b></p>
      <FragmentLayout />
      <ItemList />
      <CombinedFragment />

      <hr />
      {/*задания 2.2*/}
      <p><b>task 2.2</b></p>
      <Section title="Products">
      <ProductList />
      </Section>
    </>
  );
}

export default App;
