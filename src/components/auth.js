import {auth, provider} from '../firebase-config';
import {signInWithPopup} from 'firebase/auth';

// with this, after you signed in, if you refresh the page you'll maintain signed in
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const Auth = () => {
// async waits for an outcome (here the outcome is the sign-in process) and only after that the function will terminate
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            cookies.set("auth-token", result.user.refreshToken)
        } catch (err) {
            console.log(err);
        }
    };

    return <div className="auth">
        <p>
            Sign in with google to continue
        </p>
        <button onClick={signInWithGoogle}>
            Sign In
        </button>
    </div>;
}