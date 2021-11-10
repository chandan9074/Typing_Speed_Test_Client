import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './dashStyle.css';
import meter from './../../pictures/meter.png';
import Navber from './navber';

const HardMood = (props) => {

    const [qoute, setQoute] = useState("");
    const [records, setRecords] = useState()
    const [done, setDone] = useState(false)
    const [failed, setFailed] = useState(false)
    const [startmin, setStartmin] = useState("1")
    const [timeStart, setTimestart] = useState(false)
    const [showStartBtn, setShowStartBtn] = useState(true)
    const [speed, setSpeed] = useState()
    const [retry, setRetry] = useState(false)
    let acCount = 0;
    let count = 0;
    let timeInterval

    const qtInput = document.getElementById('inpt_qt');
    const qtDis = document.getElementById('dis_qt');

    useEffect(()=>{
        fatch();
    }, [])

    const fatch=()=>{
            var user = props.location.state.token.user_id;

            var config={
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Token ${props.location.state.token.token}`
                }
            }
            
            axios.get(`https://type-speed-test.herokuapp.com/main_app_api/records/${user}/`, config).then(response=>{
                var result = response.data               
                var record = result[0].hard
                axios.get(`https://type-speed-test.herokuapp.com/main_app_api/quotes/${record}/`, config).then(async response=>{
                    setQoute(response.data.quote)
                    setRecords(result[0].hard)
                })
                
            })
        }
    if(qtInput){
        qtInput.addEventListener('input', () =>{
            count = count + 1;
            const arrayQuote = qtDis.querySelectorAll('span');
            const arrayValue = qtInput.value.split('')
            let correct = true

            arrayQuote.forEach((characterSpan, index) => {
                const character = arrayValue[index]
                if (character == null) {
                    characterSpan.classList.remove('correct')
                    characterSpan.classList.remove('incorrect') 
                    correct = false
                } else if (character === characterSpan.innerText) {
                    characterSpan.classList.add('correct')
                    characterSpan.classList.remove('incorrect')
                    acCount = acCount + 1;
                } else {
                    characterSpan.classList.remove('correct')
                    characterSpan.classList.add('incorrect')
                    correct = false
                }
            })
            if (correct) renderNewQuote()
        })
    }

    const noting= () =>{
        if(qtDis){
            const quote = qoute
            qtDis.innerHTML = ""
            quote?.split('').forEach(character => {
                const characterSpan = document.createElement('span')
                characterSpan.innerText = character
                qtDis.appendChild(characterSpan)
            })
        }
    }
    noting()


    const renderNewQuote = () =>{
        
        var x = count/5;
        var y = Math.floor(x / startmin);
        setTimestart(false)
        clearInterval(timeInterval)
        setSpeed(y);
        acCount=0;
        document.getElementById("inpt_qt").setAttribute("readonly", "true");
        var user = props.location.state.token.user_id;

        var config={
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${props.location.state.token.token}`
            }
        }
        var url_data={
            "hard":records+1
        }
        console.log("hard")
        axios.put(`https://type-speed-test.herokuapp.com/main_app_api/records/${user}/`,url_data, config).then(response=>{
            setRetry(false)
            setDone(true)
        })
    }
    

    const nextQuote=()=>{
        fatch()
        setDone(false)
        qtInput.value = null
        setShowStartBtn(true)
        countdownEl.innerHTML = "00:00";
    }

    const handleTime = () =>{
        setFailed(false)
        setTimestart(true)
        setShowStartBtn(false)
        setRetry(true)
        qtInput.classList.remove('make_r_o')
        qtInput.value = null
        document.getElementById("inpt_qt").removeAttribute("readonly")
        document.getElementById("inpt_qt").focus();
    }

    let time = startmin * 60;

    const countdownEl = document.getElementById("countdown");


    const updateCountDown= () =>{
        let minute = Math.floor(time/60);
        let second = time % 60;

        second = second < 10? "0" + second : second;
        minute = minute < 1? "0" + minute : minute;

        if(countdownEl){
            countdownEl.innerHTML = `${minute}:${second}`;
            time--;
        }

        if(time<0){
            setTimestart(false)
            setRetry(false)
            setFailed(true)
            var x = count/5;
            var y = Math.floor(x / startmin);
            setSpeed(y);
            clearInterval(timeInterval)
            qtInput.classList.add('make_r_o')
            document.getElementById("inpt_qt").setAttribute("readonly", "true");
        }
    }

    if(timeStart===true){
        timeInterval= setInterval(updateCountDown, 1000);
    }

    return ( 
        <div className="fulpage_align">
            <div className="navber">Hello {props.location.state.token.username}!!</div>
            <div className="page_align">
                <div className="left_side">
                    <Navber token={props.location.state.token}/>
                    <div className="left_q_dis">
                        <div className="quote_head">Make Your Speed Fast</div>
                        <div className="quote_style" id="dis_qt"></div>
                        <textarea className="qt_inpt_style" name="" className="" id="inpt_qt"  readOnly/>
                    </div>
                </div>
                <div className="right_record_style">
                    <div className="box_part_style">
                        <div className="title_f_s">Mood</div>
                        <div className="underline"></div>
                        <div className="level_data">Hard</div>
                    </div>
                    <div className="box_part_style">
                        <div className="title_f_s">Level</div>
                        <div className="underline"></div>
                        <div className="level_data">{records}</div>
                    </div>
                    <div className="box_part_style">
                        <div className="title_f_s">Time Limit</div>
                        <div className="underline"></div>
                        <div className="timeLimit_data">{startmin} min</div>
                    </div>
                    <div className="box_part_style">
                        <div className="title_f_s">Time</div>
                        <div className="underline"></div>
                        <div id="countdown">00:00</div>
                    </div>
                    <div className="box_part_style">
                        <div className="title_f_s">Status</div>
                        <div className="underline status_margin"></div>
                        {showStartBtn?<div><div>--:--</div><button className="btn_style" onClick={handleTime}>Start test</button></div>:null}
                        {retry?<div>--:--</div>:null}
                        {done?<div> Well Done!!! <div className="status_box"><img src={meter} alt="meter.." style={{width:"3vh", height:"3vh"}} /> <br /> {speed} wpm</div>  <button className="btn_style" onClick={nextQuote}>Next Test</button></div>:null}
                        {failed?<div>Test Over!!! <div className="status_box"><img src={meter} alt="meter.." style={{width:"3vh", height:"3vh"}} /> <br /> {speed} wpm</div>  <button className="btn_style" onClick={handleTime}>Restart</button></div>:null}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default HardMood;

