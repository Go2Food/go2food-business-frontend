import { React } from 'react';
import Navbar from '../Navbar';

function NoAuthWithNavbar({ children }) {

return (
    <div>
    <Navbar />
    {children}
    </div>
)

};

export default NoAuthWithNavbar;