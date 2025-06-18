import LoginForm from '../auth/LoginForm';

const Login = () => {
  return (
    <div className="flex h-screen">

      {/* Left Section */}
      <div className="w-1/2 bg-gradient-to-r from-blue-300 to-gray-100 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center px-6 text-gray-800">
          Welcome to <br /> DSA Tracker <span className="text-blue-500">🚀</span>
        </h1>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center bg-gray-200">
        <LoginForm />
      </div>

    </div>
  );
};

export default Login;
