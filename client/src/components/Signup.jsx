import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/style.css';

/**
 * 
 */
const Signup = () => (
  <div>
    <header className="header">
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top scrolling-navbar">
            <div className="container">
                <Link className="navbar-brand" to="/">Events Manager</Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul className="navbar-nav mr-auto smooth-scroll">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav ml-auto nav-flex-icons">
                        <li className="nav-item">
                            <a className="nav-link waves-effect waves-light"><i className="fa fa-twitter"></i></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link waves-effect waves-light"><i className="fa fa-google-plus"></i></a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle waves-effect waves-light" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user"></i> 
                </a>
                            <div className="dropdown-menu dropdown-menu-right dropdown-unique" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item waves-effect btn btn-size waves-light ml-1 text-center" href="signin.html">Sign In</a>
                                <a className="dropdown-item waves-effect btn btn-size waves-light ml-1 text-center" href="addcenter.html">Admin</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div id="intro-signup" className="view hm-black-strong">
            <div className="container-fluid full-bg-img d-flex align-items-center justify-content-center">
               
                <form className="signup z-depth-1-half test mb-6">
                    <h3 className="text-center mt-4 font-weight-bold teal-text">Sign up</h3>

                    <div className="md-form">
                        <i className="fa fa-user prefix teal-text"></i>
                        <input type="text" id="first-name" className="form-control" />
                        <label htmlFor="orangeForm-name" className="teal-text">First name</label>
                    </div>
                    <div className="md-form">
                        <i className="fa fa-user prefix teal-text"></i>
                        <input type="text" id="last-name" className="form-control" />
                        <label htmlFor="orangeForm-name" className="teal-text">Last name</label>
                    </div>
                    <div className="md-form">
                        <i className="fa fa-user prefix teal-text"></i>
                        <input type="text" id="username-name" className="form-control" />
                        <label htmlFor="orangeForm-name" className="teal-text">Username</label>
                    </div>
                    <div className="md-form">
                        <i className="fa fa-envelope prefix teal-text"></i>
                        <input type="text" id="orangeForm-email" className="form-control" />
                        <label htmlFor="orangeForm-email" className="teal-text">Email</label>
                    </div>

                    <div className="md-form">
                        <i className="fa fa-lock prefix teal-text"></i>
                        <input type="password" id="orangeForm-pass" className="form-control" />
                        <label htmlFor="orangeForm-pass" className="teal-text">Password</label>
                    </div>

                    <div className="text-center mb-2">
                        <a href="allevents.html" className="btn btn-mycolor">Sign Up<i className="fa fa-sign-in ml-1"></i></a>
                    </div>

                    <div className="white-text text-center">
                        <h4 className="teal-text">Already have an account ?
                        <a href="signin.html" className="btn btn-sm btn-mycolor">Sign In<i className="fa fa-sign-in ml-1"></i></a>
                        </h4>
                    </div>

                </form>
            </div>
        </div>
    </header>
  </div>
);

export default Signup;
