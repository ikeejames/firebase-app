import { auth, GoogleProvider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, GoogleProvider);
        navigate('/');
    };

    return (
        <div className='login'>
            <p>Sign In to Continue</p>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    )
}
