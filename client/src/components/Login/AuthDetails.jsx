import React,{useEffect, useState} from 'react'
import {auth,Googleprovider,Gitprovider} from '../../firebase';
import { BrowserRouter as Router, Route, Routes,Link} from 'react-router-dom';
import { onAuthStateChanged , signOut} from 'firebase/auth';
import LogSignIn from './LogSignIn';
import expa from './logsignIn.module.css';
import ExApp from '../../ExApp';
const AuthDetails = () => {
    const [authUser,setAuthUser]=useState(null);
    useEffect(()=>{
        const listen=onAuthStateChanged(auth,(user)=>{
            if(user){
                setAuthUser(user)
            }else{
                setAuthUser(null)
            }
        });
        return ()=>{
            listen();
        }
    },[]);
    const usersignOut=()=>{
        signOut(auth).then(()=>{
            console.log('Signout');
        }).catch(error=>console.log(error))
    } 
    return (
        <div>
          <Router>
            <Link to=""></Link>
            {authUser ? (
              <div>
                {`Signed with ${authUser.email}`}
              <p style={{float:'right'}}>  <button className={expa.button} onClick={usersignOut}>Sign out</button></p>  
                <ExApp />
              
              </div>
            ) : (
              <Routes>
                <Route index element={<LogSignIn />} />
              </Routes>
            )}
          </Router>
    {/* <ExApp/> */}
        </div>
      );
    };
    
    export default AuthDetails;