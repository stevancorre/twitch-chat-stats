//import { client } from "websocket";
import { injectOption, storeState } from "./ui/option";
import { startWorkers } from "./workers";

storeState(false);

injectOption();

startWorkers();

//
// const irc = new client();
//
// irc.on("connectFailed", function (error) {
//     console.log("Connect Error: " + error.toString());
// });
//
// irc.on("connect", function (connection) {
//     console.log("WebSocket client Connected");
//
//     // Send CAP (optional), PASS, and NICK messages
// });
//
// irc.connect("ws://irc-ws.chat.twitch.tv:80");
//
