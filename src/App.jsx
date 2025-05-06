import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RoutesComponent } from '../src/routes/index';
import { RouterProvider } from "react-router-dom";



function App() {
  return (
    <RouterProvider router={RoutesComponent} />
  );
}

export default App;
