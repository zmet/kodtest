import './App.css';
import MainComponent from './main-component';
import Menu from './menu/menu';
import { MenuProvider } from './menu/provider';
import './spinner.css';

function App() {
  return (
    <div className="App">
      <MenuProvider>
        <header className="App-header flex flex-column"> 
          <div className="flex align-items-center justify-content-center"> App </div>       
        </header>      
        <nav>
          <Menu></Menu>        
        </nav>
        <main>
          <MainComponent></MainComponent>
        </main>      
      </MenuProvider>
    </div>
  );
}

export default App;
