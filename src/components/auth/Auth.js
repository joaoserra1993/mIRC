import {auth, provider} from '../../firebase-config';
import {signInWithPopup} from 'firebase/auth';
import './Auth.css';
import React, { useState } from 'react';



// with this, after you signed in, if you refresh the page you'll maintain signed in
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const Auth = (props) => {
    const {setIsAuth} = props;
    const [loading, setLoading] = useState(false);

// async waits for an outcome (here the outcome is the sign-in process) and only after that the function will terminate
    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
     };

    if (loading) {
        return <div class="lds-default"></div>;
    }
    return (
        <div className={`auth-container ${loading ? 'loading-page' : ''}`}>
        <div className="auth-container">
            <div className="background"></div>
            <div className="auth">
            <button className="sign-in" onClick={signInWithGoogle}>
                </button>
            </div>
        </div>
    </div>
    );
 }