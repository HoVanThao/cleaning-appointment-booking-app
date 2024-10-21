import React, { useState } from "react";
import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/images/imagelogin.png"; // Thay đổi đường dẫn tới hình ảnh của bạn
import LoginAPI from "../api/loginAPI";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [textError, setTextError] = useState("");

  const fetchLogin = async (formData) => {
    try {
      const res = await LoginAPI.login(formData);
      const accessToken = res.data.token;
      if (accessToken) {
        localStorage.setItem("access_token", accessToken);
        navigate("/dashboard");
      } else {
        setTextError("* Login failed, no access token received");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setTextError("* Login failed, please try again");
    }
  };

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setTextError("* Please enter a valid email address");
      return;
    }

    const formData = {
      email,
      password,
    };

    fetchLogin(formData);
  };

  return (
    <Wrapper>
      <div className="left-side">
        <form className="form-left" onSubmit={handleSubmitLogin}>
          <h4>Đăng nhập</h4>
          <FormRow
            type="email"
            name="email"
            value={email}
            placeholder="Nhập email của bạn"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type="password"
            name="password"
            value={password}
            placeholder="**********"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Nhớ mật khẩu
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Quên mật khẩu?
            </Link>
          </div>
          {textError && <p className="error-text">{textError}</p>}
          <button
            type="submit"
            className="btn btn-block"
            onClick={handleSubmitLogin}
          >
            Đăng nhập
          </button>

          <p>
            Bạn chưa có tài khoản?
            <Link to="/register" className="member-btn">
              Đăng kí
            </Link>
          </p>
        </form>
      </div>
      <div className="right-side">
        <img src={image} alt="Login" className="login-image" />
      </div>
    </Wrapper>
  );
};

export default Login;
