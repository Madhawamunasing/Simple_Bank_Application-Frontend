import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import DrawerAppBar from './components/AppBar/AppBar'
import { UserProvider } from './Utils/UserContext'

function App() {
  const [user, setUser] = useState({
    userId: null,
    role: null,
  })

  return (
    <>
      <div>
        <UserProvider setUser={setUser} user={user}>
          <Router>
            <DrawerAppBar />
          </Router>
        </UserProvider>
      </div>
    </>
  )
}

export default App
