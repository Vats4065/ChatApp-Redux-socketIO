import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const handleSubmit = () => {
    if (password === confirmPassword) {
      dispatch(registerUser({ email, name, password }));

      navigate("/login");
    } else {
      alert("Passwords do not match");
    }
  };

  const data = localStorage.getItem("login_token");

  return (
    <>
      {user.loading && <div>Loading.....</div>}
      <section className=" mx-auto w-50">
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center ">
            <div className="col">
              <div className="card card-registration my-4 bg-dark">
                <div className="row g-0">
                  <div className="card-body text-secondary">
                    <h3 className="mb-5 text-uppercase text-center">
                      Registration form
                    </h3>
                    <h1></h1>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example97"
                        className="form-control form-control-lg"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                      <label className="form-label" htmlFor="form3Example97">
                        Email
                      </label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example9"
                        className="form-control form-control-lg"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                      <label className="form-label" htmlFor="form3Example9">
                        Name
                      </label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example99"
                        className="form-control form-control-lg"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                      <label className="form-label" htmlFor="form3Example99">
                        Password
                      </label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example100"
                        className="form-control form-control-lg"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                      />
                      <label className="form-label" htmlFor="form3Example99">
                        Confirm Password
                      </label>
                    </div>

                    <div className="d-flex justify-content-end pt-3">
                      <button
                        type="button"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-success btn-lg ms-2"
                        onClick={handleSubmit}
                      >
                        Signup
                      </button>
                    </div>
                    {user.error && (
                      <Alert variant="danger" className="mt-3">
                        <p>{user.error}</p>
                      </Alert>
                    )}
                    {data && (
                      <Alert variant="warn" className="mt-5">
                        <p>Already have register</p>
                      </Alert>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
