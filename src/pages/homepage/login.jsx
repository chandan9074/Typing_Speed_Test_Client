import React, { useState } from 'react';
import Signup from './signup'
import axios from 'axios';

import {
  Redirect
} from "react-router-dom";

const Login = () => {

    const [token, setToken] = useState("");
    const [incorrect, setIncorrect] = useState(false)
    const [isLogin, setIslogin] = useState(false)
    const [cliksign, setCliksign] = useState(false)

    const hendelLogin = () =>{
        var u_name = document.getElementById('u_name').value;
        var pass = document.getElementById('pass').value;

        const postLoginData=async ()=>{ 
            var loginData = {
                username:u_name,
                password:pass
            }
            var config={
                headers:{'Content-Type':'application/json'}
            }
            axios.post('https://type-speed-test.herokuapp.com/accounts_api/login/', loginData, config).then(async response=> {
                if(response.status===200){
                    await setToken(response.data)
                    setIslogin(true)
                    setIncorrect(false)
                }
            })
            .catch(function(error){
                setIncorrect(true)
            })
        }
        postLoginData();
    }


    const clickSignup = () =>{
        setCliksign(true);
    }

    return ( 
        <div>
            {isLogin? <Redirect to={{pathname:`/dashboard/easy_mood/${token.username}`, state:{token:token}}} /> :<div>
            {cliksign ? <Signup />: <div className="login_card_style" >
                <div className="login_title">LOGIN</div>
                <input type="text" id="u_name" className="login_field" placeholder="Username"/>
                <input type="password" id="pass" className="login_field" placeholder="Password"/>
                {incorrect?<div class="alert alert-warning" role="alert" style={{marginBottom:"0",backgroundColor:"salmon" , height:"2vh", width:"20vh", fontSize:"1.5vh", padding:"1vh", textAlign:"center", borderRadius:".5vh"}}>
                            Invalid Username or Password
                            </div>:null}
                <button onClick={hendelLogin} className="login_btn" >Login</button>

                <div className="sing_text">Don't have account? <a onClick={clickSignup} style={{color:"salmon", cursor:"pointer"}}>Singup</a> </div>
            </div>
            }
            </div>
        }
        </div>
     );
}
 
export default Login;