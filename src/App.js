import{createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import React, { useState, useEffect } from "react";
import './App.css';

import {Layout} from "./components/Layout/Layout";
import {Logout} from "./components/LogOut/LogOut";
import {Movies} from "./components/Movies/Movies";
import {MovieCreate} from "./components/MovieCreate/MovieCreate";
import {Home} from "./components/Home/Home";
import {Film} from "./components/Film/Film"
import {Sessions} from "./components/Session/Sessions";



function App() {
  const [user, setUser] = useState({ isAuthenticated: false, userName: "" , userRole: ""});
  const [movies, setMovies] = useState([]);
  const [sessions, setSessions] = useState([]);
  const addMovie = (movie) => setMovies([...movies, movie]);

  useEffect(() =>{
    const getUser = async () => {
      return await fetch("/api/account/isauthenticated")
        .then((response) => {
          if(response.status === 200){
            return response.json();
          }
        })
        .then((data) => {
          if(typeof data !== "undefined" && typeof data.userName !== "undefined"){
            setUser({isAuthenticated: true, userName: data.userName, userRole: "user"})
            console.log(data.userName);
          }
        }, (error) => {
          console.log(error)
        })
    }
    getUser()
  }, [setUser]);
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout user={user} setUser={setUser}/>}>
        <Route index path="/" element={<Home/>}/>
        <Route
         exact path="/movies"
         element={
           <>
           <MovieCreate user={user} addMovie={addMovie} genres countries/>
           <Movies sessions={sessions} setSessions={setSessions}/>
           </>
          }>
        </Route>
        <Route exact path="/raspisanie" element={<Sessions sessions={sessions} setSessions={setSessions}/>} />
        <Route path="/movies/:id" element={<Film sessions={sessions} user={user}  setUser={setUser} setSessions={setSessions}/>} />
        <Route exact path="/logout" element={<Logout setUser={setUser}/>}/>
      </Route>
    )
  );

  return <RouterProvider router={router}/>
}

export default App;
