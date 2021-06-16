import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './AppContext';
import { Router, RouterData } from './base/index';
import './App.scss';

function App(): JSX.Element {
    return (
        <div className="app-root">
            <AppContextProvider>
                <BrowserRouter>
                    <Router data={RouterData} />
                </BrowserRouter>
            </AppContextProvider>
        </div>
    );
}

export default App;
