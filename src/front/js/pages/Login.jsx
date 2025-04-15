import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const { actions } = useContext(Context);
  const [ email, setEmail ] = useState('hola@test.com');
  const [ password, setPassword ] = useState('1234');
  const [ checkMe, setCheckMe ] = useState(false);
  const [ viewPassword, setViewPassword ] = useState(false)
  const navigate = useNavigate()
  const handleEmail = (event) => {setEmail(event.target.value.toLowerCase())}
  const handleCheckMe = (event) => setCheckMe(event.target.checked);
  const handleViewPassword = () => {setViewPassword(!viewPassword)}
  const handelSubmit = (event) => {
    event.preventDefault();
    const dataToSend = { email, password, checkMe }
    console.log(dataToSend)
    actions.setUser(email);
    const message = {
      text: `Bienvenido ${email}`,
      visible: true,
      background: 'warning'
    }
    actions.setAlert(message);
    actions.setIsLogged(true)
    navigate('/')
  }
  return (
    <div className="container">
      <h1 className="text-center text-primary">{'Login'}</h1>
      <div className="row text-start">
        <div className="col-10 col-md-6 col-lg-4 m-auto">
          <form onSubmit={handelSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                value={email} onChange={handleEmail} placeholder="Input your email"/>
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <div className="input-group">
                <input type={viewPassword ? 'text' : 'password'} className="form-control" id="exampleInputPassword1"
                  value={password} onChange={event => setPassword(event.target.value)}/>
                <div className="input-group-text" onClick={handleViewPassword}>
                  { viewPassword ?
                  <i className="fa fa-eye-slash text-danger"></i>
                  :
                  <i className="fa fa-eye text-primary"></i>
                  }
                </div>
              </div>
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1"
                checked={checkMe} onChange={handleCheckMe}/>
              <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary mx-2">Submit</button>
              <button type="reset" className="btn btn-secondary mx-2">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
