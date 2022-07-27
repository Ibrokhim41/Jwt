import { useRef } from 'react'
import { loginAction } from './store/appSlice'
function App() {
  const email = useRef()
  const password = useRef()
  const Login = () => {
    const data = {
      email: email.current.value,
      password: password.current.value
    }
    loginAction(data)
  }
  return (
    <div className="flex">
      <input type="text" ref={email} />
      <input type="password" ref={password} />
      <button onClick={Login} className="">login</button>
    </div>
  )
}

export default App
