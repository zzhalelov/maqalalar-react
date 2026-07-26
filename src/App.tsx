import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {HomePage} from './pages/HomePage';
import {ArticlePage} from './pages/ArticlePage';

function App() {
    return (
        <BrowserRouter>
            <div style={{
                minHeight: '100vh',
                backgroundColor: '#fbf9f5',
                color: '#1a1a1a',
                fontFamily: '"Merriweather", Georgia, serif'
            }}>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/article/:id" element={<ArticlePage/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;