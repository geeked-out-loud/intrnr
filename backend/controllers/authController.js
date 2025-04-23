// intrnr/backend/controllers/authController.js
const { getDB } = require("../config/db");
const { generateMnemonic, generateKeyPair } = require("../crypto/keys");

async function signup(req, res) {
  try {
    const { name, username, email, password } = req.body;
    
    // Basic validation
    if (!name || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, username, email, and password are required.",
      });
    }
    
    // Get the DB and collection
    const db = getDB();
    const userCollection = db.collection("user_details");

    // Check if a user with the given email (or username) already exists
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "A user with this email already exists.",
      });
    }

    // Generate a new mnemonic (recovery phrase)
    const mnemonic = generateMnemonic();

    // Generate key pair (only the public key will be stored, private key is used client-side for identity recovery)
    const { publicKey } = generateKeyPair(mnemonic);

    // Get next auto-increment ID:
    // Find the document with the highest id, then add 1.
    const lastUser = await userCollection.findOne({}, { sort: { id: -1 } });
    const newId = lastUser ? lastUser.id + 1 : 1;
    
    // Create the new user document. Notice that password is not stored,
    // as the password is meant to be saved locally on the user's device.
    const newUser = {
      id: newId,
      name,
      username,
      email,
      public_key: publicKey,
      is_verified: false,       // default to false
      status: "active",         // can be set according to your application logic
      created_at: new Date(),
      // Optionally add additional fields like bio, location etc.
    };

    // Insert the new user into the database
    await userCollection.insertOne(newUser);

    // Send response back with the mnemonic.
    // The mnemonic is essential for the user to secure their identity.
    return res.json({
      success: true,
      message: "Signup successful! Please securely store your recovery phrase.",
      mnemonic,
    });
    
  } catch (error) {
    console.error("Error in signup:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// --- LOGIN (existing) ---
async function login(req, res) {
  try {
    const { email, mnemonic } = req.body;

    if (!email || !mnemonic) {
      return res.status(400).json({
        success: false,
        message: "Email and mnemonic are required.",
      });
    }

    const db = getDB();
    const userCollection = db.collection("user_details");

    const user = await userCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const { publicKey: derivedPublicKey } = generateKeyPair(mnemonic);

    if (derivedPublicKey === user.public_key) {
      return res.json({
        success: true,
        message: "Login successful.",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid recovery phrase.",
      });
    }
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = { signup, login };
