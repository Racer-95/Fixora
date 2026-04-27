import jwt from 'jsonwebtoken';

const token = jwt.sign({ id: "661234567890123456789012", role: "provider" }, "supersecretgit", { expiresIn: "1h" });

fetch('http://localhost:5005/api/services', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` 
  },
  body: JSON.stringify({
    name: "Test Service",
    category: "Cleaning",
    basePrice: 50,
    city: "Delhi, Delhi"
  })
}).then(res => res.json()).then(console.log).catch(console.error);
