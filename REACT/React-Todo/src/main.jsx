
import { createRoot } from 'react-dom/client'
import "./index.css";
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import Wrapper from './Wrapper.jsx';

createRoot(document.getElementById('root')).render(
    <Wrapper>
        <App />
        <ToastContainer position='top-center'/>
    </Wrapper>

)
