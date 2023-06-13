import { collection, addDoc, getDocs, deleteDoc, query, where, doc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { Post as IPost } from './main'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

interface Props {
    post: IPost
}

interface Like {
    likeId: string;
    userId: string;
}

export const Post = (props: Props) => {
    const { post } = props;
    const [user] = useAuthState(auth);
    const [likes, setLikes] = useState<Like[] | null>(null);

    const likesRef = collection(db, "likes");

    const likesDoc = query(likesRef, where('postId', '==', post.id))

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
    };

    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, {
                userId: user?.uid,
                postId: post.id,
            });
            if (user) {
                setLikes((prev) => prev ? [...prev, { userId: user.uid, likeId: newDoc.id }] : [{ userId: user.uid, likeId: newDoc.id }])
            };
        } catch (err) {
            console.log(err);
        }
    };

    const removeLike = async () => {
        try {
            const likeToRemoveQuery = query(
                likesRef,
                where('postId', '==', post.id),
                where('userId', '==', user?.uid));

            const likeToRemoveData = await getDocs(likeToRemoveQuery);
            const likeId = likeToRemoveData.docs[0].id;
            const likeToRemove = doc(db, 'likes', likeId);
            await deleteDoc(likeToRemove);

            if (user) {
                setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
            };
        } catch (err) {
            console.log(err);
        }
    };


    const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

    useEffect(() => {
        getLikes();
    }, []);

    return (
        <div className='posts-box'>
            <div className='title'>
                <h1>{post.title}</h1>
            </div>
            <div className="body">
                <p>{post.description}</p>
            </div>
            <div className="footer">
                <div className="likes">
                    <button
                        onClick={hasUserLiked ? removeLike : addLike}
                        style={{ backgroundColor: hasUserLiked ? "blue" : "white" }}
                    >&#x1F44D;</button>
                    {likes && <p> {likes?.length == 0 ? "" : likes?.length}</p>}
                </div>
                <div className="user-handle">
                    <p>@{post.username}</p>
                </div>
            </div>
        </div>
    )
}