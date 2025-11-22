import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AnimeDetail from './AnimeDetail.tsx'
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router';
import Header from './Header.tsx';

const router = createBrowserRouter([
  { path: "/", Component: App },
  {path: "/animes/:id", Component: AnimeDetail},
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header>
      <RouterProvider router={router} />
    </Header>
  </StrictMode>
)
