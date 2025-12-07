import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import NotFoundPage from '../pages/NotFound';

import ListOwners from '../pages/Owner/ListOwners';
import CreateOwners from '../pages/Owner/CreateOwners';
import UpdateOwners from '../pages/Owner/UpdateOwners';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFoundPage />} /> 
      <Route path="/owners" element={<ListOwners />} />
      <Route path='/owners/new' element={<CreateOwners />}/>
      <Route path="/owners/edit/:id" element={<UpdateOwners />} />
    </Routes>
  );
}
