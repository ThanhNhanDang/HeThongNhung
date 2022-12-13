import React, { useEffect } from "react";
import "./Login.css";
function Login() {
  useEffect(() => {
    const inputs = document.querySelectorAll(".input");

    function addcl() {
      let parent = this.parentNode.parentNode;
      parent.classList.add("focus");
    }

    function remcl() {
      let parent = this.parentNode.parentNode;
      if (this.value === "") {
        parent.classList.remove("focus");
      }
    }

    inputs.forEach((input) => {
      input.addEventListener("focus", addcl);
      input.addEventListener("blur", remcl);
    });
  }, []);

  return (
    <React.Fragment>
      <img className="wave" src="/wave.png" alt="wave" />
      <div className="container">
        <div className="img">
          <img src="/bg.svg" alt="avatar" />
        </div>
        <div className="login-content">
          <form action="index.html">
            <img src="/avatar.svg" alt="avatar" />
            <h2 className="title">Đăng Nhập</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Tài khoản</h5>
                <input type="text" className="input" />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <h5>Mật khẩu</h5>
                <input type="password" className="input" />
              </div>
            </div>
            {/* <a href="#">Forgot Password?</a> */}
            <input type="submit" className="btn" value="Login" />
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
