import { Link } from 'react-router-dom'
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    //console.log(user?.photoURL)

    const logOut = async () => {
        await signOut(auth);
        navigate('/login');
    }

    return (
        <nav>
            <div className='links'>
                <Link to='/'>Home</Link>
                {!user ?
                    (<Link to='/login'>Login</Link>) :
                    (<Link to='/createpost'>Create Post</Link>)}
            </div>
            {user && <div className='profile'>
                <p>{user?.displayName}</p>
                <img src={user?.photoURL || ""} referrerPolicy='no-referrer' />
                <button onClick={logOut}>Log out</button>
            </div>}
        </nav>
    )
}
