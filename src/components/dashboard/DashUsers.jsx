import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {useContext, useEffect, useState} from "react";
import {type} from "@testing-library/user-event/dist/type";
import {Alert, Backdrop, Button, CircularProgress, InputAdornment, TextField, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {AuthContext} from "../../context/authContext";
import api from "../../helpers/axiosSetting";


const DashUsers = () => {

    const [rows, setRows] = useState([]);
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const { currentUser, accessToken } = useContext(AuthContext);

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try{
                const row = []
                const res = await api.get('/user',{
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                await Promise.all(res?.data?.info?.map(async (user) => {
                    const rawRow = {
                        image: user.avatar,
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        isActive: user.isActive,
                        isStaff: user.isStaff,
                        createdAt: user.createdAt,
                        lastLogin: user.lastLogin,
                    }
                    row.push(rawRow)
                }))
                setRows(row);
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        fetchData().then()
    }, [])

    const columns = [
        {
            field: 'image',
            headerName: 'Avatar',
            flex: 0.1,
            minWidth: 60,
            editable: true,
            renderCell: (params) => <img height='50px' src={params.value} />, // renderCell will render the component
        },
        { field: 'id', headerName: 'ID',flex: 0.8, minWidth: 260 },
        {
            field: 'username',
            headerName: 'Username',
            flex: 0.3,
            minWidth: 100,
            editable: false,
        },
        {
            field: 'email',
            headerName: 'Email Address',
            flex: 0.5,
            minWidth: 240,
            editable: false,
        },
        {
            field: 'isActive',
            headerName: 'isActive',
            flex: 0.25,
            type: 'boolean',
            minWidth: 60,
            editable: true,
        },
        {
            field: 'isStaff',
            headerName: 'isStaff',
            flex: 0.2,
            type: 'boolean',
            minWidth: 60,
            editable: true,
        },
        {
            field: 'createdAt',
            headerName: 'createdAt (GMT)',
            flex: 0.4,
            minWidth: 150,
            editable: true,
        },
        {
            field: 'lastLogin',
            headerName: 'lastLogin (GMT)',
            flex: 0.4,
            minWidth: 150,
            editable: true,
        },
        {
            field: "action",
            headerName: "Action",
            flex: 0.3,
            minWidth: 100,
            renderCell: (params) => {
                // console.log(params);
                return (
                    <>
                        <Button
                            onClick={() => {
                                // setUserId(params?.id)
                                // handleUpdate(params).then(r => setSuccessMessage(true))
                            }}
                            variant="contained"
                            sx={{margin:'0 10px', color:'#ffffff', backgroundColor:'#c1beff'}}
                        >Update</Button>
                        {/*{*/}
                        {/*    selected.length > 0 && <Button*/}
                        {/*        onClick={() => {*/}
                        {/*            // setUserId(params?.id)*/}
                        {/*            handleUpdateAll(selected).then(r => setSuccessMessage(true))*/}
                        {/*        }}*/}
                        {/*        variant="contained"*/}
                        {/*        sx={{margin:'0 10px', color:'#c1beff', backgroundColor:'#ffffff',*/}
                        {/*            position: 'fixed', left: '50%', top: '2%'*/}
                        {/*    }}*/}
                        {/*    >Update All</Button>*/}
                        {/*}*/}
                    </>
                );
            }
        },
    ];

    // const handleUpdate = async (params) => {
    //     setLoading(true)
    //     try {
    //         const docRef = doc(db, "users", params?.id);
    //         const data = {
    //             isActive: params.row.isActive,
    //             isStaff: params.row.isStaff,
    //         };
    //         await updateDoc(docRef, data)
    //             .then(msg => {
    //                 setSuccessMessage(true)
    //                 setLoading(false)
    //             })
    //             .catch(error => {
    //                 setErrMessage(error)
    //                 setLoading(false)
    //             })
    //     } catch (err) {
    //         setErrMessage(err)
    //         setLoading(false)
    //     }
    // }

    // const handleUpdateAll = async (selected) => {
    //     setLoading(true)
    //     console.log("=========",selected)
    //
    //     try {
    //         await Promise.all(selected?.map(async (params, index) => {
    //             const docRef = doc(db, "users", params?.id);
    //             const data = {
    //                 isActive: params.isActive,
    //                 isStaff: params.isStaff,
    //             };
    //             console.log("=========",data)
    //             await updateDoc(docRef, data)
    //         })).then(msg => {
    //                 setSuccessMessage(true)
    //                 setLoading(false)
    //             })
    //             .catch(error => {
    //                 setErrMessage(error)
    //                 setLoading(false)
    //             })
    //     } catch (err) {
    //         setErrMessage(err)
    //         setLoading(false)
    //     }
    // }
    // // console.log("=========",selected)
    // const processRowUpdate = (newRow) => {
    //     // const updatedRow = { ...newRow, isNew: false };
    //     selected.map((value, index)=>{
    //         if (value.id === newRow.id) {
    //             selected[index] = newRow;
    //         }
    //     })
    //     // console.log("111111111",newRow)
    // };

    const handleClose =()=>{
        setLoading(false)
    }

    // const handleSearch = async (e) => {
    //         try{
    //             const row = []
    //             const q = query(collection(db, "users"), where("uid", "==", e));
    //             const userSnapshot = await getDocs(q).then((querySnapshot) => {
    //                 querySnapshot.forEach((doc) => {
    //                     // doc.data() is never undefined for query doc snapshots
    //                     const timestamp = doc.data().createAt.seconds
    //                     const createAt =new Date(timestamp * 1000)
    //                     const createAt1 = createAt.toString()
    //                     const createAt2 = createAt1.split(' ')
    //                     const createAt3 = createAt2[1]+ ' ' +
    //                         createAt2[2] + ' ' +
    //                         createAt2[3] + ' ' +
    //                         createAt2[4]
    //                     // console.log("=======",doc.data().createAt)
    //                     const rawRow = {
    //                         image: doc.data().photoURL,
    //                         id: doc.id,
    //                         username: doc.data().displayName,
    //                         email: doc.data().email,
    //                         isActive: doc.data().isActive,
    //                         isStaff: doc.data().isStaff,
    //                         createAt: createAt3
    //                     }
    //                     row.push(rawRow)
    //                 });
    //
    //                 // console.log("----------", doc.data())
    //                 // row.push(rawRow)
    //                 // });
    //
    //                 setRows(row);
    //             })
    //             // userSnapshot.forEach((doc) => {
    //                 // doc.data() is never undefined for query doc snapshots
    //
    //             console.log("----------", rows)
    //             setLoading(false)
    //         } catch (error) {
    //             console.log(error)
    //             setLoading(false)
    //         }
    //     }

    // const handleClear = async () => {
    //     setLoading(true)
    //     setInputValue("")
    //     try{
    //         const row = []
    //         const userData = await collection(db, "users");
    //         const userSnapshot =  await getDocs(userData)
    //         userSnapshot.forEach((doc) => {
    //             // doc.data() is never undefined for query doc snapshots
    //             const timestamp = doc.data().createAt.seconds
    //             const createAt =new Date(timestamp * 1000)
    //             const createAt1 = createAt.toString()
    //             const createAt2 = createAt1.split(' ')
    //             const createAt3 = createAt2[1]+ ' ' +
    //                 createAt2[2] + ' ' +
    //                 createAt2[3] + ' ' +
    //                 createAt2[4]
    //             // console.log("=======",doc.data().createAt)
    //             const rawRow = {
    //                 image: doc.data().photoURL,
    //                 id: doc.id,
    //                 username: doc.data().displayName,
    //                 email: doc.data().email,
    //                 isActive: doc.data().isActive,
    //                 isStaff: doc.data().isStaff,
    //                 createAt: createAt3
    //             }
    //             // console.log("----------", doc.data())
    //             row.push(rawRow)
    //         });
    //
    //         setRows(row);
    //         setLoading(false)
    //     } catch (error) {
    //         console.log(error)
    //         setLoading(false)
    //     }
    // }

    return (
        <Box sx={{ height:400, width: '100%' }}>
            <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                pageSize={9}
                rowsPerPageOptions={[5]}
                checkboxSelection
                onSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids);
                    const selectedRowData = rows.filter((row) =>
                    selectedIDs.has(row.id.toString())
                    );
                    setSelected(selectedRowData);
                }}
                // selectionModel={selected}
                // processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={(error) => {
                    console.log(error);
                }}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
            />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {
                errMessage.length > 0 &&
                <Alert
                    severity="error"
                    onClose={() => setErrMessage('')}
                    sx={{
                        position: 'fixed',
                        top: '5%',
                        left: '50%',
                        zIndex: '1131'
                    }}
                >{errMessage}</Alert>
            }
            {
                successMessage &&
                <Alert
                    severity="success"
                    onClose={() => setSuccessMessage(false)}
                    sx={{
                        position: 'fixed',
                        top: '2%',
                        left: '50%',
                        zIndex: '1131',
                        minWidth: '300px',
                        "& .MuiAlert-message": {
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center'
                        }
                    }}
                >
                    Done!
                </Alert>
            }
            {
                selected.length > 0 && <Button
                    onClick={() => {
                        // handleUpdateAll(selected).then(r => setSuccessMessage(true))
                    }}
                    variant="contained"
                    sx={{margin:'0 10px', color:'#c1beff', backgroundColor:'#ffffff',
                        position: 'fixed', right: '2%', top: '2%', zIndex: '1122'}}
                >Update All</Button>
            }
            <Box
                sx={{
                    position: 'fixed',
                    top: '0.5%',
                    left: '30%',
                    zIndex: '1130',
                }}
            >
                <TextField sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: '5px',
                    color: '#c1beff',
                    ":hover": {
                        borderColor: '#c1beff',
                    },
                    "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                        padding: '15px 10px',
                    }
                }}
                           hiddenLabel
                           value={inputValue}
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <SearchIcon/>
                                   </InputAdornment>
                               ),
                           }}
                    onChange={(e) => setInputValue(e.target.value)}
                    // onKeyDown={(e) => {e.key === 'Enter' && handleSearch(e.target.value)}}
                        id="filled-hidden-label-normal"  variant="outlined"
                />
                <Button
                    sx={{
                        height: '100%',
                        backgroundColor: '#c1beff',
                        color: '#ffffff',
                        border: '1px solid #ffffff',
                        padding: '14px 10px',
                        ":hover": {
                            backgroundColor: '#ffffff',
                            color: '#c1beff',
                            border: '1px solid #ffffff'
                        }
                    }}
                    // onClick={handleClear}
                >Clear</Button>
            </Box>
        </Box>
    );
};

export default DashUsers;
