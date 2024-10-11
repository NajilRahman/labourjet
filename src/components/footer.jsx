import React from 'react';
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <>
      <footer className="bg-body-tertiary text-center text-lg-start fixed-end">
        <div className="container p-4">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-0">labourJet</h5>
              <br />
              <p>At Labour Jet, we believe in the power of self-growth and continuous learning. Our platform is designed to empower individuals to enhance their skills, explore new opportunities, and connect with like-minded professionals. Whether you’re seeking to advance your career or discover your passions, Labour Jet provides the resources and community support you need to thrive. Join us on this journey of personal and professional development, and unlock your full potential today!</p>            </div>

            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Pages</h5>
              <br />
              <ul className="list-unstyled mb-0 ">
                <li>
                  <Link to="/" className="text-body ">Landing</Link>
                </li>
                <li>
                  <Link to="/Register" className="text-body">Register</Link>
                </li>
                <li>
                  <Link to='/Login' className="text-body">Login</Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-0">Contact Us</h5>

              <ul className="list-unstyled">
                <br />
                <li>labourJet@gmail.com</li>
                <br />
                <li><textarea name="" id="" className='form-control bg-light border border-0' placeholder='Send Message to Us'></textarea></li>
                <li><button className='btn btn-success border border-0 bg-dark text-light rounded-0 w-100'>Send</button></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © 2020 Copyright:
          <a className="text-body" href="/">labourJet.com</a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
