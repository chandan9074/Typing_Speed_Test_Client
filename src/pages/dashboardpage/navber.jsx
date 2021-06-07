import React from 'react';

import option from './../../pictures/option.png';
import logout from './../../pictures/logout.png';
import { Link } from 'react-router-dom';

const Navber = (props) => {
    return ( 
        <div className="nav_align">
            <div className="option_align">
                <button className="option_btn"><img src={option} style={{width:"3.7vh", height:"3.7vh"}} alt="option.." /></button>
                <div className="option">
                    <Link to={{pathname:`/dashboard/easy_mood/${props.token.username}`, state:{token:props.token}}}  className="option_style easy">Easy</Link>
                    <Link to={{pathname:`/dashboard/medium_mood/${props.token.username}`, state:{token:props.token}}} className="option_style medium">Medium</Link >
                    <Link to={{pathname:`/dashboard/hard_mood/${props.token.username}`, state:{token:props.token}}} className="option_style hard">Hard</Link>
                </div>
            </div>
           <a href="/"><button className="log_btn" title="Logout"><img src={logout} style={{width:"3.7vh", height:"3.7vh"}} alt="logout.." /></button></a>
        </div>
     );
}
 
export default Navber;