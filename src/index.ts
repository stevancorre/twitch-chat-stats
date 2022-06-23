import { startClient } from "./client";

import { injectOption, storeState } from "./ui/option";

storeState(false);

injectOption();

startClient();
