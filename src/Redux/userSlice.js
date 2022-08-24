import {createSlice} from  '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "User",
    initialState:{
        users: [],
        loading: false,
        dup: false,
        singleUser: {
                "number": "",
                "email": "",
                "region": "",
              },
              
    },
    reducers: {
        getUsers: (state) => {
            state.loading = true;
        },
        getUsersSuccess: (state,acton) => {
            state.loading = false;
            // cuentlly i am not doing anything on successfull loading of the user, "we can set users state from hear"
        },
        getUser: (state, action) => {
            state.singleUser = state.users.find((el) => el.id === action.payload)
        },
        clearUser: (state) => {
            state.singleUser = {
                "number": "",
                "email": "",
                "region": "",
              }
        },
        clearDup: (state) => {
            state.dup = false
        },
        addUser: (state, action) => {
            const dep = state.users.find(obj => obj.email === action.payload.email);
            if(dep){
             state.dup = true
            }  else {
                state.users = [action.payload, ...state.users];
            }
        },
        updateUser: (state, action) => {
            const dep = state.users.find(obj => obj.email === action.payload.user.email);
            if(dep){
                state.dup = true
               }  else {
                state.users = state.users.map((el) => el.id === action.payload.id ? action.payload.user : el)
            }
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter((el) => el.id !== action.payload)
        }
    },
});

export const {getUsers,getUsersSuccess,getUser,clearDup,addUser,clearUser,deleteUser,updateUser} = userSlice.actions;
export default userSlice.reducer;