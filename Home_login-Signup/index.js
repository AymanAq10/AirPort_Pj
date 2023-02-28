import ReactDOM from 'react-dom/client';
import App from './App';
// import './index.css';
// import App from './App';
// import App from './Components/App';
// // import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.js';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <App/>
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

