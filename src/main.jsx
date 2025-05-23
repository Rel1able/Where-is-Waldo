import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Game from "./components/Game.jsx"
import ErrorElement from './components/ErrorElement.jsx'
import { Context } from './components/Context.jsx'
import LeaderBoard from './components/Leaderboard.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorElement/>
  },
  {
    path: "/game",
    element: <Game/>
  },
  {
    path: "/leaderboard",
    element: <LeaderBoard/>
  }
])

createRoot(document.getElementById('root')).render(
  <Context>
     <RouterProvider router={router} />
  </Context>
   

)
