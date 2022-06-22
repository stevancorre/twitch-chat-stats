import { injectOption, storeState } from "./ui/option";
import { startWorkers } from "./workers";

storeState(false);

injectOption();

startWorkers();
