import React from 'react';
import Database from '@replit/database';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: ''
    };
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangePass = this.handleChangePass.bind(this)
    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this)
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }
  handleChangePass(event) {
    this.setState({ password: event.target.value });
  }
  signup() {
    const auth = getAuth(app);
    if (this.state.name) {
      createUserWithEmailAndPassword(auth, this.state.name, this.state.password).then((userCredential) => {
        const user = userCredential.user;
      }).catch(error=>{
        alert(error.message)
      })
    }
  }
  login() {
    const auth = getAuth(app);
    if (this.state.name) {
      signInWithEmailAndPassword(auth, this.state.name, this.state.password).then((userCredential) => {
        const user = userCredential.user;
      }).catch(error=>{
        alert(error.message)
      })
    }
  }
  componentDidMount() {

  }
  render() {
    return <div >
      <div className="hero min-h-screen bg-base-200 bg-[url('https://source.unsplash.com/BCkLxilDvJU')] h-screen bg-no-repeat	bg-center bg-cover">
        <div className="hero-overlay bg-opacity-60"></div>

        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Royal Restaurant!</h1>
            <p className="py-6">Although a great restaurant experience must include great food, a bad restaurant experience can be achieved through bad service alone. Ideally, service is invisible. You notice it only when something goes wrong. ― Dana Spiotta.</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input onChange={this.handleChangeName} value={this.state.name} type="text" placeholder="email" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="text" onChange={this.handleChangePass} value={this.state.password} placeholder="password" className="input input-bordered" />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <div className="btn-group">
                  <button onClick={this.login} className="btn btn-primary">Login</button>
                  <button onClick={this.signup} className="btn btn-active">Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default Login;
