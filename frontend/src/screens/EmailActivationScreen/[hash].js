import React from 'react';

export default async function verifyUserEmail(req, res) {
  const hash = req.query.hash;
  console.log(`hash: ${hash}`);
  if (!hash) {
    return res
      .status(401)
      .json({ message: 'Cannot Validate The Email Address!' });
  }

  const response = await fetch(
    `http://localhost:3000/api/users/activate/${hash}`
  );
  if (response.status >= 400) {
    return res
      .status(401)
      .json({ message: 'Cannot Validate The Email Address!' });
  } else {
    res.writeHead(307, { Location: '/users/activated' });
    res.end();
  }
}
