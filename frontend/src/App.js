import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import Home from './components/pages/Home'
import Profile from './components/pages/User/Profile'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Container from './components/layout/Container'
import { UserProvider } from './context/UserContext'
import Message from './components/layout/Message'
import MyPets from './components/pages/Pet/MyPets'
import AddPet from './components/pages/Pet/AddPet'
import EditPet from './components/pages/Pet/EditPet'
import PetDetails from './components/pages/Pet/PetDetails'
import MyAdoptions from './components/pages/Pet/MyAdoptions'

function App() {
    return ( 
   <Router>
    <UserProvider>
      <Navbar />
      <Message></Message>
      <Container>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/user/profile" element={<Profile />}></Route>
          <Route path="/pet/mypets" element={<MyPets />}></Route>
          <Route path="/pet/add" element={<AddPet />}></Route>
          <Route path="/pet/edit/:id" element={<EditPet />}></Route>
          <Route path="/pet/:id" element={<PetDetails />}></Route>
          <Route path="/pet/myadoptions" element={<MyAdoptions />}></Route>
        </Routes>
      </Container>
      <Footer />
    </UserProvider>
   </Router>
    );
}

export default App;