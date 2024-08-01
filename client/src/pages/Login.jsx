import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  const handleSubmit = () => {
    if (!email || !password) {
      alert("Please fill all fields");
    } else {
      dispatch(loginUser({ email, password }));

      if (user?.user) {
        localStorage.setItem("login_token", user?.user?._id);
        navigate("/");
      }
    }
  };

  // const data = localStorage.getItem("login_token");
  // useEffect(() => {
  //   if (data) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <>
      <section className=" w-50 mx-auto">
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center ">
            <div className="card card-registration my-4 bg-dark">
              <div className="row g-0">
                <div className="card-body text-secondary ">
                  <h3 className="mb-5 text-uppercase text-center text-secondary">
                    Login form
                  </h3>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="text"
                      id="form3Example97"
                      className="form-control form-control-lg"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form3Example97">
                      Email
                    </label>
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example99"
                      name="password"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form3Example99">
                      Password
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
                      Login
                    </button>
                  </div>
                  {/* {user.error && (
                    <Alert variant="danger" className="mt-5">
                      <p>{user.error}</p>
                    </Alert>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
