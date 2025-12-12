import { Route, Routes } from 'react-router-dom';

import Home from '@/pages/Home';
import NotFoundPage from '@/pages/NotFound';

import ListOwners from '@/pages/Owner/ListOwners';
import CreateOwners from '@/pages/Owner/CreateOwners';
import UpdateOwners from '@/pages/Owner/UpdateOwners';

import ListPets from '@/pages/Pet/ListPets';
import CreatePet from '@/pages/Pet/CreatePet';
import UpdatePet from '@/pages/Pet/UpdatePet';

import ListAppointment from '@/pages/Appointment/ListAppointment';
import CreateAppointment from '@/pages/Appointment/CreateAppointment';
import UpdateAppointment from '@/pages/Appointment/UpdateAppointment';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFoundPage />} /> 
      <Route path="/owners" element={<ListOwners />} />
      <Route path='/owners/new' element={<CreateOwners />}/>
      <Route path="/owners/edit/:id" element={<UpdateOwners />} />
      <Route path='/pets' element={<ListPets />} />
      <Route path='/pets/new' element={<CreatePet />} />
      <Route path="/pets/edit/:id" element={<UpdatePet />} />
      <Route path="/appointments" element={<ListAppointment />} />
      <Route path="/appointments/new" element={<CreateAppointment />} />
      <Route path="/appointments/edit/:id" element={<UpdateAppointment />} />
    </Routes>
  );
}
