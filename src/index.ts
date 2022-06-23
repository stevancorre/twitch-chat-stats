import { startClient, startClientListening } from "./client";

import { injectOption, storeState } from "./ui/option";

storeState(false);

injectOption();

startClient();
startClientListening();
