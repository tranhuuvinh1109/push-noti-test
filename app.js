const express = require("express");
const app = express();
const webpush = require('web-push');
const cors = require("cors")

const port = 3000;

const apiKeys = {
    publicKey: "BKSDhnuXvFRQdLgp6LjUEyK67TdzWm5C61MX8vCKNsbAjsmdg-hob7-B1mp-qUdRZiOD7EJ4i_oKAJhgfUyesIs",
    privateKey: "23bPzyFkd6Mc56HHDWFcS2CuHaEemBF2dPvn995bLuw"
}

webpush.setVapidDetails(
    'mailto:vinh.tranhuu@ncc.asia',
    apiKeys.publicKey,
    apiKeys.privateKey
)

app.use(cors());
app.use(express.json());


const subDatabse = [];

app.get("/", (req, res) => {
    res.json({ status: "Success", data: subDatabse });
})

app.post("/save-subscription", (req, res) => {
    subDatabse.push(req.body);
    console.log("1111", subDatabse);
    res.json({ status: "Success", message: "Subscription saved!" })
})

app.get("/send-notification", (req, res) => {
    console.log("--->", subDatabse);
    webpush.sendNotification(subDatabse[0], "Hello world");
    res.json({ "statue": "Success", "message": "Message sent to push service" });
})

app.listen(port, () => {
    console.log("Server running on port 3000!");
})