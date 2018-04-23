import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Homepage Function
 */
const HomePage = () => (
  <div>
    <header className="header">
      <nav className="navbar
      navbar-expand-lg navbar-dark
      fixed-top scrolling-navbar">
        <div className="container">
          <a className="navbar-brand" href="#">
            Events Manager
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto smooth-scroll">
              <li className="nav-item">
                <a className="nav-link" href="#intro">
                  Home
                </a>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto nav-flex-icons">
              <li className="nav-item">
                <a className="nav-link waves-effect waves-light">
                  <i className="fa fa-twitter" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link waves-effect waves-light">
                  <i className="fa fa-google-plus" />
                </a>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link waves-effect waves-light ml-1 text-center"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link waves-effect waves-light ml-1 text-center"
                  to="/signin"
                >
                  Sign In
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link waves-effect waves-light ml-1 text-center"
                  href="addcenter.html"
                >
                  Admin
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div id="intro" className="intro-id view hm-black-strong">
        <div className="container-fluid
        full-bg-img d-flex align-items-center justify-content-center">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 text-center">
              <ul>
                <li>
                  <h1 className="h1-responsive
                  wow fadeInUp title white-text mr-5 mb-3">
                    <strong>Hey, wanna book an event center ?</strong>
                  </h1>
                  <h3 className="h3-responsive
                  wow fadeInUp white-text mr-5 mb-4">
                    Find your next experience
                  </h3>
                </li>
                <li>
                  <div className="row wow fadeIn mr-2" data-wow-delay="0.4s">
                    <div className="col-md-3">
                      <div className="md-form">
                        <input
                          type="text"
                          id="form1"
                          className="form-control validate white-text"
                        />
                        <label htmlFor="form1">Location</label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="md-form">
                        <input
                          type="text"
                          id="form2"
                          className="form-control validate white-text"
                        />
                        <label htmlFor="form2">Number of Guests</label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="md-form">
                        <input
                          type="text"
                          id="form3"
                          className="form-control validate white-text"
                        />
                        <label htmlFor="form3">Type of Event</label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="md-form">
                        <button className="btn btn-lg btn-mycolor">
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
    <main className="mt-5">
      <div className="container">
        <section id="how it works" className="text-center">
          <h2 className="mb-5 font-weight-bold text-center">
            Features of our product.
          </h2>
          <div className="row d-flex justify-content-center mb-4">
            <div className="col-md-4">
              <i className="fa fa-search fa-4x orange-text mb-2" />
              <h4 className="font-weight-bold">Search</h4>
              <p className="grey-text">
                Have an event center in mind? Just enter its name or location in
                the search bar to find your ideal event center today!
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <i className="fa fa-bolt fa-4x indigo-text mb-2" />
              <h4 className="font-weight-bold">Filter search</h4>
              <p className="grey-text">
                Filter event centers based on availability, equipments,
                location, and a whole lot more!
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <i className="fa fa-check fa-4x blue-text mb-2" />
              <h4 className="font-weight-bold">Book</h4>
              <p className="grey-text">
                Found your ideal event center? Hurry up to book it right now!
              </p>
            </div>
          </div>
        </section>
        <hr className="my-5" />

        <section id="popular centers">
          <h2 className="mb-5 font-weight-bold text-center">
            Most popular centers
          </h2>
          <div className="row mb-4">
            <div className="col-md-4 mb-4">
              <div className="card text-center">
                <img
                  className="img-fluid hoverable"
                  src="https://static.pexels.com/photos/207731/pexels-photo-207731.jpeg"
                  alt="Card image cap"
                />

                <div className="card-body">
                  <h4 className="card-title">Hall Of Fame</h4>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a
                    href="centerdetails.html"
                    className="btn btn-mycolor btn-sm"
                  >
                    info
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card text-center">
                <img
                  className="img-fluid hoverable"
                  src="https://static.pexels.com/photos/69815/florida-state-university-westcott-building-auditorium-interior-69815.jpeg"
                  alt="Card image cap"
                />

                <div className="card-body">
                  <h4 className="card-title">Hall Of Fame</h4>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a
                    href="centerdetails.html"
                    className="btn btn-mycolor btn-sm"
                  >
                    info
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card text-center">
                <img
                  className="img-fluid hoverable"
                  src="https://static.pexels.com/photos/260689/pexels-photo-260689.jpeg"
                  alt="Card image cap"
                />

                <div className="card-body">
                  <h4 className="card-title">Hall Of Fame</h4>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a
                    href="centerdetails.html"
                    className="btn btn-mycolor btn-sm"
                  >
                    info
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr className="my-5" />

        <section id="events">
          <h2 className="mb-5 font-weight-bold text-center">Upcoming Events</h2>
          <div className="row mb-4">
            <div className="col-md-4 mb-4">
              <div className="card text-center">
                <img
                  className="img-fluid hoverable"
                  src="https://static.pexels.com/photos/169190/pexels-photo-169190.jpeg"
                  alt="Card image cap"
                />

                <div className="card-body">
                  <h4 className="card-title">Coming Of Kings</h4>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a
                    href="eventdetails.html"
                    className="btn btn-mycolor btn-sm"
                  >
                    info
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card text-center">
                <img
                  className="img-fluid hoverable"
                  src="https://static.pexels.com/photos/196652/pexels-photo-196652.jpeg"
                  alt="Card image cap"
                />

                <div className="card-body">
                  <h4 className="card-title">Coming Of Kings</h4>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a
                    href="eventdetails.html"
                    className="btn btn-mycolor btn-sm"
                  >
                    info
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card text-center">
                <img
                  className="img-fluid hoverable"
                  src="https://static.pexels.com/photos/301987/pexels-photo-301987.jpeg"
                  alt="Card image cap"
                />

                <div className="card-body">
                  <h4 className="card-title">Coming Of Kings</h4>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a
                    href="eventdetails.html"
                    className="btn btn-mycolor btn-sm"
                  >
                    info
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr className="my-5" />

        <section id="gallery">
          <h2 className="mb-5 font-weight-bold text-center">Gallery</h2>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div
                id="carousel-example-1z"
                className="carousel slide carousel-fade"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  <li
                    data-target="#carousel-example-1z"
                    data-slide-to="0"
                    className="active"
                  />
                  <li data-target="#carousel-example-1z" data-slide-to="1" />
                  <li data-target="#carousel-example-1z" data-slide-to="2" />
                </ol>
                <div className="carousel-inner z-depth-1-half" role="listbox">
                  <div className="carousel-item active">
                    <img
                      className="d-block w-100"
                      src="https://static.pexels.com/photos/210620/pexels-photo-210620.jpeg"
                      alt="First slide"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block w-100"
                      src="https://static.pexels.com/photos/12574/SW_Dylan%2BRives.jpg"
                      alt="Second slide"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block w-100"
                      src="https://static.pexels.com/photos/167605/pexels-photo-167605.jpeg"
                      alt="Third slide"
                    />
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carousel-example-1z"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carousel-example-1z"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
            <div className="col-md-6">
              <a href="#" className="grey-text">
                <h6 className="mb-4">
                  <i className="fa fa-heart red-text mr-2" />
                  <strong>Testimonials</strong>
                  <i className="fa fa-heart red-text ml-2" />
                </h6>
              </a>
              <h4 className="mb-3">
                <strong>What our clients are saying</strong>
              </h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo adipisicing elit, sed adipisicing
                elit, sed adipisicing elit, sed adipi.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure.
              </p>
              <a className="btn btn-default btn-sm">Read More</a>
            </div>
          </div>
        </section>
        <hr className="my-5" />

        <section id="contact">
          <h2 className="mb-5 font-weight-bold text-center">Contact Us</h2>

          <div className="row">
            <div className="col-lg-5 col-md-12">
              <form className="p-5">
                <div className="md-form form-sm">
                  <i className="fa fa-user prefix teal-text" />
                  <input
                    type="text"
                    className="form-control"
                    id="input-1"
                    name=""
                  />
                  <label htmlFor="input-1">Your Name</label>
                </div>

                <div className="md-form form-sm">
                  <i className="fa fa-envelope prefix teal-text" />
                  <input
                    type="text"
                    className="form-control teal-text"
                    id="input-2"
                    name=""
                  />
                  <label htmlFor="input-2">Your Email</label>
                </div>

                <div className="md-form form-sm">
                  <i className="fa fa-tag prefix teal-text" />
                  <input
                    type="text"
                    className="form-control"
                    id="input-3"
                    name=""
                  />
                  <label htmlFor="input-3">Subject</label>
                </div>

                <div className="md-form form-sm">
                  <i className="fa fa-pencil prefix teal-text" />
                  <textarea
                    type="text"
                    className="md-textarea"
                    id="input-4"
                    name=""
                  />
                  <label htmlFor="input-4">Your Message</label>
                </div>

                <div className="text-center">
                  <button className="btn btn-mycolor">
                    Send<i className="fa fa-paper-plane-o ml-2" />
                  </button>
                </div>
              </form>
            </div>
            <div className="col-lg-7 col-md-12">
              <div className="row text-center">
                <div className="col-md-4 mb-3">
                  <p>
                    <i className="fa fa-map mr-2 grey-text" />Anthony, NIG
                  </p>
                </div>
                <div className="col-md-4 mb-3">
                  <p>
                    <i className="fa fa-building mr-2 grey-text" />Mon - Fri,
                    8:00-22:00
                  </p>
                </div>
                <div className="col-md-4 mb-3">
                  <p>
                    <i className="fa fa-phone mr-2 grey-text" />+234 6646 453
                  </p>
                </div>
              </div>
              <div
                id="map-container"
                className="map-container z-depth-1-half"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
    <footer className="page-footer center-on-small-only default-color pt-0">
      <div>
        <div className="container">
          <div className="row py-4 d-flex align-items-center">
            <div className="col-md-6 col-lg-5
            text-center text-md-left mb-4 mb-md-0">
              <h6 className="mb-0 white-text">
                Get connected with us on social networks!
              </h6>
            </div>
            <div className="col-md-6 col-lg-7 text-center text-md-right">
              <a className="icons-sm fb-ic ml-0">
                <i className="fa fa-facebook white-text mr-lg-4"> </i>
              </a>

              <a className="icons-sm tw-ic">
                <i className="fa fa-twitter white-text mr-lg-4"> </i>
              </a>

              <a className="icons-sm gplus-ic">
                <i className="fa fa-google-plus white-text mr-lg-4"> </i>
              </a>

              <a className="icons-sm li-ic">
                <i className="fa fa-linkedin white-text mr-lg-4"> </i>
              </a>

              <a className="icons-sm ins-ic">
                <i className="fa fa-instagram white-text mr-lg-4"> </i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5 mb-4 text-center text-md-left">
        <div className="row mt-3">
          <div className="col-md-3 col-lg-4 col-xl-3 mb-r">
            <h6 className="title font-bold">
              <strong>Events Manager</strong>
            </h6>
            <hr className="deep-purple
            accent-2 mb-4 mt-0 d-inline-block mx-auto" />
            <p className="text-justify">
              We are global organization with the single goal of unifying events
              all around the world. We bring the centers to you, the users, and
              provide the platform for you to create you events.
            </p>
          </div>
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-r">
            <h6 className="title font-bold">
              <strong>Key Cities</strong>
            </h6>
            <hr className="deep-purple
            accent-2 mb-4 mt-0 d-inline-block mx-auto" />
            <p>
              <a href="#!">Event centers in Lagos</a>
            </p>
            <p>
              <a href="#!">Event centers in Ondo</a>
            </p>
            <p>
              <a href="#!">Event centers in Abuja</a>
            </p>
            <p>
              <a href="#!">Event centers in Ilorin</a>
            </p>
          </div>
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-r">
            <h6 className="title font-bold">
              <strong>Useful links</strong>
            </h6>
            <hr className="deep-purple
            accent-2 mb-4 mt-0 d-inline-block mx-auto" />
            <p>
              <a href="#!">Your Account</a>
            </p>
            <p>
              <a href="#!">Available centers</a>
            </p>
            <p>
              <a href="#!">Booking</a>
            </p>
            <p>
              <a href="#!">Help</a>
            </p>
          </div>
          <div className="col-md-4 col-lg-3 col-xl-3">
            <h6 className="title font-bold">
              <strong>Contact</strong>
            </h6>
            <p>
              <i className="fa fa-home mr-3" /> Anthony, LG 10012, NG
            </p>
            <p>
              <i className="fa fa-envelope mr-3" /> eventsmanager@gmail.com
            </p>
            <p>
              <i className="fa fa-phone mr-3" /> +234 6646 453
            </p>
            <p>
              <i className="fa fa-print mr-3" /> +234 6646 453
            </p>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container-fluid">
          © 2017 Copyright:{' '}
          <a href="#">
            <strong> Events Manager.com</strong>
          </a>
        </div>
      </div>
    </footer>
  </div>
);

export default HomePage;
