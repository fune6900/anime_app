import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AnimeDetail from './AnimeDetail.tsx'
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router'

const router = createBrowserRouter([
  { path: "/", Component: App },
  {path: "/animes/:id", Component: AnimeDetail},
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
