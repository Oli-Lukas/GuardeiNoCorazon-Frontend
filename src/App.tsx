// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home     from './pages/Home';
import Desafeto from './pages/Desafeto';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />
//   },
//   {
//     path: '/desafeto/:id',
//     element: <Desafeto />
//   }
// ]);

function App() {
  return (
    // <RouterProvider router={router} />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/desafeto/:id' element={<Desafeto />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
