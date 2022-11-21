// import React, {useContext, useEffect, useState} from 'react';
// import {AuthContext} from "../../../context/authContext";
// import {Alert, CircularProgress} from "@mui/material";
//
// const Suggestions = () => {
//     const [suggestions, setSuggestions] = useState([]);
//     const [successMessage, setSuccessMessage] = useState(false);
//     const [errMessage, setErrMessage] = useState("");
//     const [loading, setLoading] = useState(false);
//     const { currentUser, userInfo } = useContext(AuthContext);
//
//     const handleFollow = async (id) => {
//         try {
//             const ref = doc(db, "userFollows", currentUser.uid)
//             const docSnap = await getDoc(ref);
//             const following = docSnap.data().following
//             if (docSnap.exists()) {
//                 following?.includes(id) === false && following.push(id)
//                 console.log("00000000000000",following)
//                 await setDoc(doc(db, "userFollows", currentUser.uid), {
//                     following: following
//                 })
//             } else {
//                 await setDoc(doc(db, "userFollows", currentUser.uid), {
//                     following: [id]
//                 })
//             }
//             setSuccessMessage(true)
//             return window.location.reload()
//         } catch (e) {
//             console.log(e)
//             setErrMessage(e.message)
//         }
//     }
//
//     useEffect(()=>{
//         setLoading(true)
//         const fetchUser = async () => {
//             const userData = await collection(db, "users");
//             const userSnapshot =  await getDocs(userData)
//             const rawSuggestions = []
//             let following = []
//             try{
//                 const ref = doc(db, "userFollows", currentUser.uid)
//                 const docSnap = await getDoc(ref);
//                 if (docSnap.exists()) {
//                     following = docSnap?.data().following
//                 }
//             } catch (e) {
//                 console.log(e)
//                 setLoading(false)
//             }
//             userSnapshot.forEach((doc) => {
//                 const rawRow = {
//                     image: doc.data().photoURL,
//                     username: doc.data().displayName,
//                     id: doc.id,
//                 }
//                 if (doc.id !== currentUser.uid) {
//                     following?.includes(doc.id) === false && rawSuggestions.push(rawRow)
//                 }
//             })
//             setSuggestions(rawSuggestions.slice(0, 3))
//             setLoading(false)
//         }
//         fetchUser().then()
//     }, [])
//
//     return (
//         <>
//             <span>Suggestions For You</span>
//             {
//                 suggestions.map((suggestion, index) => {
//                     return <div className="user" key={index}>
//                         <div className="userInfo">
//                             <img
//                                 src={suggestion.image}
//                                 alt=""
//                             />
//                             <span>{suggestion.username}</span>
//                         </div>
//                         <div className="buttons">
//                             <button onClick={() => handleFollow(suggestion.id)}>follow</button>
//                             <button>dismiss</button>
//                         </div>
//                     </div>
//                 })
//             }
//             {
//                 errMessage.length > 0 &&
//                 <Alert
//                     severity="error"
//                     onClose={() => setErrMessage('')}
//                     sx={{
//                         position: 'fixed',
//                         top: '5%',
//                         left: '50%',
//                         zIndex: '1101'
//                     }}
//                 >{errMessage}</Alert>
//             }
//             {
//                 successMessage &&
//                 <Alert
//                     severity="success"
//                     onClose={() => setSuccessMessage(false)}
//                     sx={{
//                         position: 'fixed',
//                         top: '2%',
//                         left: '50%',
//                         zIndex: '1101',
//                         minWidth: '300px',
//                         "& .MuiAlert-message": {
//                             width: '100%',
//                             display: 'flex',
//                             justifyContent: 'center'
//                         }
//                     }}
//                 >
//                     Done!
//                 </Alert>
//             }
//             {
//                 loading && <CircularProgress />
//             }
//         </>
//     );
// };
//
// export default Suggestions;
