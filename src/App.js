import './App.scss';
import { Route, Routes } from 'react-router';
import { Layout } from './components/layout/Layout';
import { UsersList } from './components/users/users-list/UsersList';
import { UserForm } from './components/users/user-form/UserForm';
import { Login } from './components/auth/login/Login';
import { Register } from './components/auth/register/Register';
import { AuthenticatedRoute } from './utils/guards/AuthenticatedRoute';
import {  NonAuthenticatedRoute } from './utils/guards/NonAuthenticatedRoute';
import { VehicleForm } from './components/vehicles/vehicle-form/VehicleForm';
import { VehiclesList } from './components/vehicles/vehicles-list/VehiclesList';
import { RentForm } from './components/rentals/rent-form/RentForm';
import { RentalList } from './components/rentals/rentals-list/RentalList';
import { VehicleDetail } from './components/vehicles/vehicle-details/VehicleDetail';
import { Home } from './components/home/Home';
// import Layout from './components/layout/Layout';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<NonAuthenticatedRoute><Login /></NonAuthenticatedRoute> } ></Route>
        <Route path='/register' element={<NonAuthenticatedRoute><Register /></NonAuthenticatedRoute> } ></Route>
        <Route path="/" element={<AuthenticatedRoute><Layout /></AuthenticatedRoute> }> 
          <Route path="home" element={<Home/>} />
          
          <Route path="users" element={<UsersList/>} />
          <Route path="users/create" element={<UserForm/>} />
          <Route path="users/edit/:id" element={<UserForm/>} />
          

          <Route path="vehicles" element={<VehiclesList/>} />
          <Route path="vehicles/create" element={<VehicleForm/>} />
          <Route path="vehicles/edit/:id" element={<VehicleForm/>} />
          <Route path="vehicles/details/:id" element={<VehicleDetail/>} />

          <Route path="rentals" element={<RentalList/>} />
          <Route path="rentals/rent" element={<RentForm/>} />
          <Route path="rentals/rent/:id" element={<RentForm/>} />
          <Route path="rentals/edit/:id" element={<RentForm/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
