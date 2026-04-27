const axios = require('axios');
const jwt = require('jsonwebtoken');

// Create a dummy token for a provider
const token = jwt.sign({ id: "661234567890123456789012", role: "provider" }, "supersecretgit", { expiresIn: "1h" });

axios.post('http://localhost:5005/api/services', {
  name: "Test Service",
  category: "Cleaning",
  basePrice: 50,
  city: "Delhi, Delhi"
}, {
  headers: { Authorization: `Bearer ${token}` }
}).then(res => {
  console.log("SUCCESS:", res.data);
}).catch(err => {
  console.error("ERROR:", err.response ? err.response.data : err.message);
});
