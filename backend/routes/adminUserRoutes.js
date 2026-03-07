const express = require("express");
const router = express.Router();

// Models
const Resort = require("../models/resort"); 
const Booking = require("../models/booking");
const User = require("../models/user"); 

// Import Controller
const adminUserController = require("../controllers/adminUserController");

/* ================= USER MANAGEMENT ROUTES ================= */

router.get("/users", adminUserController.getUsers);
router.post("/users", adminUserController.addUser);

// ⚡ അപ്‌ഡേറ്റ് ചെയ്ത ടോഗിൾ റൂട്ട് - ഫ്രണ്ട്‌എൻഡിലെ "Failed to update status" മാറ്റാൻ ഇത് സഹായിക്കും
router.patch("/users/:id/toggle-status", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // നിലവിലെ സ്റ്റാറ്റസ് മാറ്റുന്നു (True ആണെങ്കിൽ False, False ആണെങ്കിൽ True)
        user.isBlocked = !user.isBlocked; 
        await user.save();

        res.json({ 
            message: `User ${user.isBlocked ? 'Blocked' : 'Activated'} successfully`, 
            isBlocked: user.isBlocked 
        });
    } catch (err) {
        res.status(500).json({ error: "Status update failed: " + err.message });
    }
});

// പഴയ ബ്ലോക്ക് റൂട്ട് (ബാക്ക്വേർഡ് കോംപാറ്റിബിലിറ്റിക്കായി നിലനിർത്തുന്നു)
if (adminUserController.blockUser) {
    router.patch("/users/:id/block", adminUserController.blockUser);
}

if (adminUserController.deleteUser) {
    router.delete("/users/:id", adminUserController.deleteUser);
}


/* ================= RESORT ROUTES ================= */

router.get("/resorts", async (req, res) => {
    try {
        const resorts = await Resort.find();
        res.json(resorts);
    } catch (err) {
        res.status(500).json({ error: "Resorts fetch error: " + err.message });
    }
});

router.post("/resorts", async (req, res) => {
    try {
        const { name, location, description, price } = req.body;
        const newResort = new Resort({ name, location, description, price });
        await newResort.save();
        res.status(201).json({ message: "Resort added successfully", newResort });
    } catch (err) {
        res.status(500).json({ error: "Resort add cheyyan pattila: " + err.message });
    }
});

// Booking/report routes are handled in routes/adminRoutes.js

module.exports = router;
