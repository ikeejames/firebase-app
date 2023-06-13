import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './sass/main.scss'
import { Navbar } from './components/navbar'
import { Main } from './pages/main/main'
import { Login } from './pages/login'
import { CreatePost } from './pages/create-post/create-post'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createpost' element={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
