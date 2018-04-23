import React from 'react';
import { Link } from 'react-router-dom';

/**
 * 
 */
const Signin = () => (
  <div>
  <header class="header">
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top scrolling-navbar">
            <div class="container">
                <Link class="navbar-brand" to="/">Events Manager</Link>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto smooth-scroll">
                        <li class="nav-item">
                            <Link class="nav-link" to="/">Home</Link>
                        </li>
                    </ul>

                    <ul class="navbar-nav ml-auto nav-flex-icons">
                        <li class="nav-item">
                            <a class="nav-link waves-effect waves-light"><i class="fa fa-twitter"></i></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link waves-effect waves-light"><i class="fa fa-google-plus"></i></a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle waves-effect waves-light" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-user"></i> 
                </a>
                            <div class="dropdown-menu dropdown-menu-right dropdown-unique" aria-labelledby="navbarDropdownMenuLink">
                                <a class="dropdown-item waves-effect btn btn-size waves-light ml-1 text-center" href="signup.html">Sign Up</a>
                                <a class="dropdown-item waves-effect btn btn-size waves-light ml-1 text-center" href="addcenter.html">Admin</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div id="intro" class="view hm-black-strong">
            <div class="container-fluid full-bg-img d-flex align-items-center justify-content-center">
                
                <form class="signup test">
                    <h3 class="text-center mb-4 font-weight-bold">Sign In</h3>
                    <div class="md-form">
                        <i class="fa fa-user prefix teal-text"></i>
                        <input type="text" id="username-name" class="form-control" />
                        <label class="teal-text" for="orangeForm-name">Username</label>
                    </div>
                    <div class="md-form">
                        <i class="fa fa-lock prefix teal-text"></i>
                        <input type="password" id="orangeForm-pass" class="form-control" />
                        <label class="teal-text" for="orangeForm-pass">Password</label>
                    </div>

                    <div class="text-center mb-2">
                        <a href="#" class="btn btn-mycolor">Sign In<i class="fa fa-sign-in ml-1"></i></a>
                    </div>

                    <div class="white-text text-center">
                            <h4>Don't have an account ?
                            <a href="#" class="btn btn-sm btn-mycolor">Sign Up<i class="fa fa-sign-in ml-1"></i></a>
                            </h4>
                        </div>

                </form>
            </div>
        </div>
    </header>
  </div>
);

export default Signin;
