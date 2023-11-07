import React from "react";
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home";
import ShowTranslations from "./pages/ShowTranslations";
import CreateTranslations from "./pages/CreateTranslations";
import DeleteTranslations from "./pages/DeleteTranslations";
import EditTranslations from "./pages/EditTranslations";

const App = () => {
  return (
    <Routes>
      <Route path = '/' element={<Home />} />
      <Route path = '/translations/create' element={<CreateTranslations />} />
      <Route path = '/translations/details/:id' element={<ShowTranslations />} />
      <Route path = '/translations/edit/:id' element={<EditTranslations />} />
      <Route path = '/translations/delete/:id' element={<DeleteTranslations />} />

    </Routes>
    );
};

export default App;