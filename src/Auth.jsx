// src/Auth.jsx
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
    <div>
      <div class="sidebar">
            <div class="baricons">
                <img className="relative h-[50px] w-[50px] left-[10px] -mt-7" src="https://github.com/user-attachments/assets/9380b62b-8486-4f1d-a3bf-821bf120147c" id="Comicon"/>
            </div>
            <div class="baraboutus">
                <div id="Setbutton" className="absolute bottom-[2px] left-[8px]">
                    <a href="https://github.com/Temavrix/NexaView" title="About Us"><img src="https://github.com/user-attachments/assets/e9530ede-b4bb-4842-a11a-bfcdeed6d236"/></a>
                </div>
            </div>
      </div>
      <div id="auth-container" className="w-[90%] max-w-md mx-auto text-[2em] text-center min-h-[50vh] bg-black/10 backdrop-blur-[10px] shadow-md border border-white/20 rounded-[3em] p-6 sm:p-[3em] flex flex-col items-center justify-center" style={{backgroundColor: 'color here'}}>
      <label className="text-white text-[30px] font-bold">Welcome To NexaView</label>
      <h2 className="text-white text-[1.17em] font-bold">{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <label className="text-white text-[20px] font-normal">E-mail:  </label><br />
        <input className="border-none outline-none px-[1em] py-[0.6em] rounded-[24px] bg-white/30 text-white text-[55%] w-[260px] text-center" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" /><br />
        <label className="text-white text-[20px] font-normal">Password:  </label><br />
        <input className="border-none outline-none px-[1em] py-[0.6em] rounded-[24px] bg-white/30 text-white text-[55%] w-[260px] text-center" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" /><br /><br />
        <button className="border-none outline-none px-[1em] py-[0.6em] rounded-[24px] bg-white/40 text-white text-[45%] w-[200px] text-center" type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form><br />
      <button className="border-none outline-none px-[1em] py-[0.6em] rounded-[24px] bg-white/40 text-white text-[45%] w-[200px] text-center" onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? 'Sign Up' : 'Login'}
      </button><br />
      <label className="text-white text-[20px]">(C) Temavrix</label>
    </div>
    </div>
    
  );
}
