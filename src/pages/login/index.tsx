import React, { memo, useState } from 'react';


// React Login Component
export default  memo(() => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form>
      <input
        type="text"
        name="userName"
        placeholder="Username"
        value={userName}
        onChange={e => setUserName(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit" >
        Login
      </button>
    </form>
  );
});