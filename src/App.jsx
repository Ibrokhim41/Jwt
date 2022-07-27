import axios from 'axios'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from './store/appSlice'

function App() {
  const dispatch = useDispatch()
  const { token, error } = useSelector(state => state.appreducer)
  const email = useRef()
  const password = useRef()
  const Login = () => {
    const data = {
      email: email.current.value,
      password: password.current.value
    }
    dispatch(loginAction(data))
  }
  const [users, setUsers] = useState([])
  async function getUsers() {
    const data = await axios.get('http://localhost:5000/api/users')
    await setUsers(data.data)
  }
  axios.interceptors.response.use(
    res => res,
    async err => {
      if (err.response.status === 401) {
        const token = JSON.parse(localStorage.getItem('auth'))
        const response = await axios.post(
          'http://localhost:5000/api/users', {
          refreshToken: token.refreshToken
        },
          { withCredentials: true }
        )
        if (response.status === 200) {
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${response.data['refreshToken']}`
          localStorage.setItem('auth', JSON.stringify(response.data))
          return axios(err.config)
        }
      }
      return err
    }
  )
  return (
    <div className="flex">
      {token}
      <input type="text" ref={email} />
      <input type="password" ref={password} />
      <button onClick={Login} className="">login</button>
      <button onClick={getUsers}>getUsers</button>
      {users.length && users.map(user => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  )
}

export default App
