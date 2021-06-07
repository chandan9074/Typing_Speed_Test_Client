import React from 'react';
import './homeStyle.css'
import Login from './login'

const Home = () => {
    return (
        <div className="home_style">
            <div className="home_header">
                {/* <img src={logo} alt="logo..." style={{width:"6vh", height:"6vh"}}/> */}
                <span className="header_title">MAKE YOUR TYPE FAST</span>
                <div className="underling"></div>
            </div>
            <div className="login_align" >
                <Login/>
            </div>
        </div>
     );
}
 
export default Home;