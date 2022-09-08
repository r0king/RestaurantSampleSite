import * as React from 'react';
import { getAuth, signOut } from "firebase/auth";
import {app} from '../firebase';

class Home extends React.Component {
  constructor() {
    super();
    this.state = { color: "red" }  
      
    this.logout = this.logout.bind(this)

  }
logout(e){
    const auth = getAuth(app);
    signOut(auth).then(()=>{
      window.location.pathname = '/login'
    })
  };
  render() {
    return (
      <div className="bg-[url('https://source.unsplash.com/BCkLxilDvJU')] h-screen 	bg-center bg-cover	 " >
        
        <div className="flex justify-center flex-wrap m-auto ">
          <div className=" p-5 ...">
            <div className="card w-96 bg-base-100 shadow-xl ">
              <figure className="px-10 pt-10">
                <img src="https://source.unsplash.com/-YHSwy6uqvk/900×700/" alt="Menu" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Main Menu</h2>
                <p>Choose from the top dishes in India prepared by stared chefs</p>
                <div className="card-actions">
                  <a href="/main">
                  <button className="btn btn-primary">Order Now</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className=" p-5 ...">
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <img src="https://source.unsplash.com/jpkfc5_d-DI/900×700/" alt="Shoes" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Special Menu</h2>
                <p>Why not go unique and native tastes of india?</p>
                <div className="card-actions">
                  <a href="/special">
                    <button className="btn btn-primary">Order Now</button>
                  </a>                  
                </div>
              </div>
            </div>
          </div>
          <div className="p-5 ...">
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <img src="https://source.unsplash.com/0ZUoBtLw3y4/900×700/" alt="Shoes" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Reviews</h2>
                <div className="rating rating-lg rating-half">
                  <input type="radio" name="rating-10" className="rating-hidden" />
                  <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" />
                  <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" />
                  <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" />
                  <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" />
                  <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" />
                  <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" />
                  <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" />
                  <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" />
                  <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" checked />
                  <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" />
                </div>    <div className="card-actions">
                  <a href='/rating'>
                  <button className="btn btn-primary">Open</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button onClick={this.logout} className="btn btn-primary justify-center ml-[45vw] mr-auto">Log out</button>

      </div>
    );
  }
}

export default Home;
