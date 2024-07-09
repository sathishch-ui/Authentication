import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      setError(false)
      const res = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false)
      if (data.success === false) {
        setError(true)
      }
    } catch (error) {
    setError(true);
    setLoading(false);
    }
  };

  console.log(formData);
  return (
    <div className="p-3 mx-auto max-w-lg">
      <h1 className="text-3xl text-center font-semibold my-7"> Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-large"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-large"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-large"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:bg-opacity-80">
         {loading ? "Loading" : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an Account</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      <div className="text-red-700 mt-5">
        <p>{ error && 'Something Went Wrong'}</p>
      </div>
    </div>
  );
};

export default SignUp;
