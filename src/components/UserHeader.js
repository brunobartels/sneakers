import React, { Component } from 'react'
import imageTumbrl from '../images/user-tumbrl.jpg';

export default class UserHeader extends Component{
    render(){
        return(
            <div className="UserHeader">
            	<button className="userActios"><img src={imageTumbrl} className="App-logo" alt="logo" /></button>
            </div>
        )
    }
}