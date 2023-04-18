import Add from "../Images/addAvatar.png";

function SignIn() {
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">myChat</span>
        <span className="title">Sign In</span>
        <form>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign In</button>
        </form>
        <p>Don't have an account? Register</p>
      </div>
    </div>
  );
}

export default SignIn;
