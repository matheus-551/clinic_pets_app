import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import NotFoundPage from '../pages/NotFound';

import ListOwners from '../pages/Owner/ListOwners';
import CreateOwners from '../pages/Owner/CreateOwners';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFoundPage />} /> 
      <Route path="/owners" element={<ListOwners />} />
      <Route path='/owners/new' element={<CreateOwners />}/>
    </Routes>
  );
}
