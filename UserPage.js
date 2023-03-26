import './Home_page/login_signup/style.css'
import { useEffect } from 'react';

const App = ({ Element }) => {

    useEffect(() => {
        document.body.className = 'bababoi';
    }, []);

    return (
        <>
            {Element ? Element : null}
        </>
    )
}
export default App;
