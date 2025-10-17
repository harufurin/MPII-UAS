const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const crypto = require("crypto");

const users = {
  "rudy@lp3imi.com": {
    password: "123456",
    name: "Rudy",
    mobile_phone: "088817264647",
    gender: "M",
    birthdate: "2000-12-22",
    birthplace: "Kabupaten Tangerang",
    address:
      "Kabupaten Tangerang",
    photo:
      "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
  },
  "ydur@lp3imi.com": {
    password: "abcdef",
    name: "Ydur",
    mobile_phone: "08881234567",
    gender: "M",
    birthdate: "2002-02-02",
    birthplace: "Los Angeles",
    address:
      "California, USA",
    photo:
      "https://mythictalent.b-cdn.net/creators/caseoh.png",
  },
};

app.use(cors());
app.use(bodyParser.json());

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const user = users[email];

    setTimeout(() => {
        // Always respond after delay, so client can show loading popup
        if (!user || user.password !== password) {
            // Error response after delay, so client can show error popup
            return res.status(401).json({ message: "email atau password anda salah" });
        }

        // include email in token so other endpoints can parse it (format: email|random)
        const token = `${email}|${generateSecureRandomString(100)}`;
        return res.status(200).json({ token });
    }, 2000);
});

app.get("/profile", (req, res) => {
  // debug: log incoming Authorization header
  const rawAuth = req.headers["authorization"];
  console.log("/profile auth header:", rawAuth);
  if (!rawAuth) return res.status(401).json({ message: "invalid token" });

  // remove "Bearer " prefix case-insensitively and allow extra spaces
  const token = rawAuth.replace(/^Bearer\s+/i, "").split("|");
  // require at least email and random parts (email|random)
  if (token.length < 2 || !token[0]) return res.status(401).json({ message: "invalid token" });

  const email = token[0];
  const user = users[email];
  if (!user) return res.status(401).json({ message: "invalid token" });

  // omit password in response
  const { password, ...safeUser } = user;
  return res.status(200).json(safeUser);
});

app.get('/users', (req, res) => {
  // var token = req.headers["authorization"];
  // if (!token) return res.status(401).json({ message: "invalid token" });

  // // remove "Bearer " prefix case-insensitively and allow extra spaces
  // token = token.replace(/^Bearer\s+/i, "");
  // token = token.split("|");
  // // require at least email and random parts (email|random)
  // if (token.length < 2 || !token[0]) return res.status(401).json({ message: "invalid token" });

  // var email = token[0];
  // if (!users[email]) return res.status(401).json({ message: "invalid token" });

  // return all users but omit passwords
  const list = Object.entries(users).map(([userEmail, u]) => {
    const { password, ...rest } = u;
    return { email: userEmail, ...rest };
  });

  return res.status(200).json(list);
});

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});

function generateSecureRandomString(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}
