import { useState } from 'react';
import { auth } from './firebase.jsx';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import './index.css';

export default function Auth({ onUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = isLogin
        ? await signInWithEmailAndPassword(auth, email, password)
        : await createUserWithEmailAndPassword(auth, email, password);
      onUser(userCredential.user);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-[70px] sm:w-[80px] bg-black/70 backdrop-blur-md z-50 flex flex-col items-center justify-between py-6">
        <img className="h-[50px] w-[50px]" src="https://github.com/user-attachments/assets/9380b62b-8486-4f1d-a3bf-821bf120147c" alt="Icon"/>
        <a href="https://github.com/Temavrix/NexaView" title="About Us">
          <img className="h-[35px] w-[35px]" src="https://github.com/user-attachments/assets/e9530ede-b4bb-4842-a11a-bfcdeed6d236" alt="About Us"/>
        </a>
      </div>

      {/* Main Content */}
      <div className="ml-[40px] sm:ml-[80px] flex items-center justify-center min-h-screen p-4">
        <div className="w-[100%] sm:w-full max-w-md bg-white/10 backdrop-blur-md shadow-lg border border-white/20 rounded-3xl p-8 sm:p-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Welcome To NexaView</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8">{isLogin ? 'Login' : 'Sign Up'}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white text-lg sm:text-xl mb-2">E-mail</label>
              <input type="email" className="w-full px-5 py-3 rounded-full bg-white/30 text-white text-base sm:text-lg text-center outline-none" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
            </div>
            <div>
              <label className="block text-white text-lg sm:text-xl mb-2">Password</label>
              <input type="password" className="w-full px-5 py-3 rounded-full bg-white/30 text-white text-base sm:text-lg text-center outline-none" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            </div>
            <button type="submit" className="w-full px-5 py-3 rounded-full bg-white/40 text-white text-lg font-semibold hover:bg-white/60 transition">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <button onClick={() => setIsLogin(!isLogin)} className="mt-6 w-full px-5 py-3 rounded-full bg-white/30 text-white text-base hover:bg-white/50 transition">
            Switch to {isLogin ? 'Sign Up' : 'Login'}
          </button>

          <p className="mt-8 text-white text-base opacity-60">(C) Temavrix</p>
        </div>
      </div>
    </div>
  );
}
