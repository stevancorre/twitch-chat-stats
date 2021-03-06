import capitalize from "capitalize";
import { getClientStats } from "../client";
import { htmlToElement } from "../helpers/domHelper";
import { ChatStats } from "../types/chatStats";
import { storeState } from "./option";

const UIStatsId = "twitch-chat-stats-panel";

const UI = `
    <div class="tw-root--theme-dark tw-root--hover" id="${UIStatsId}">
        <div class="InjectLayout-sc-588ddc-0 dpwvQM scrollable-area scrollable-area--suppress-scroll-x" data-simplebar="init" style="height:fit-content;">
            <div class="simplebar-track vertical" style="visibility: hidden;">
                <div class="simplebar-scrollbar"></div>
            </div>
            <div class="simplebar-track horizontal" style="visibility: hidden;">
                <div class="simplebar-scrollbar"></div>
            </div>
            <div class="simplebar-scroll-content" style="padding-right: 15px; margin-bottom: -30px;">
                <div class="simplebar-content" style="padding-bottom: 15px; margin-right: -15px;">
                    <div class="Layout-sc-nxg1ff-0 kobNEz">
                        <div class="Layout-sc-nxg1ff-0 hQSnmJ">
                            <button class="ScCoreButton-sc-1qn4ixc-0 ffyxRu ScButtonIcon-sc-o7ndmn-0 nHKTN" aria-label="Close ad stats" data-dashlane-rid="dccb70c3786a15b0" data-form-type="" data-dashlane-label="true">
                                <div class="ButtonIconFigure-sc-1ttmz5m-0 fbCCvx">
                                    <div class="ScIconLayout-sc-1bgeryd-0 cXxJjc">
                                        <div class="ScAspectRatio-sc-1sw3lwy-1 kPofwJ tw-aspect">
                                            <div class="ScAspectSpacer-sc-1sw3lwy-0 dsswUS"></div>
                                            <svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" class="ScIconSVG-sc-1bgeryd-1 ifdSJl">
                                                <g>
                                                    <path d="M8.5 10L4 5.5 5.5 4 10 8.5 14.5 4 16 5.5 11.5 10l4.5 4.5-1.5 1.5-4.5-4.5L5.5 16 4 14.5 8.5 10z"></path>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                        <table
                            class="Table-sc-1i28abh-0 GGlWw tw-table">
                            <thead class="tw-table-header">
                                <tr class="ScTableRow-sc-18rdmqn-0 epLaWL tw-table-row">
                                    <th class="ScTableHeading-sc-mjulnz-0 dTndMT tw-table-heading">
                                        <div class="Layout-sc-nxg1ff-0 dwuicp">
                                            <p class="CoreText-sc-cpl358-0 bDGnvG">Name</p>
                                        </div>
                                    </th>
                                    <th class="ScTableHeading-sc-mjulnz-0 dTndMT tw-table-heading">
                                        <div class="Layout-sc-nxg1ff-0 dwuicp">
                                            <p class="CoreText-sc-cpl358-0 bDGnvG">Value</p>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="tw-table-body">
                                <tr class="ScTableRow-sc-18rdmqn-0 epLaWL tw-table-row">
                                    <td class="InjectLayout-sc-588ddc-0 knzRFc tw-table-cell">Messages per second:</td>
                                    <td class="InjectLayout-sc-588ddc-0 knzRFc tw-table-cell">--</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

const UITableRow = `
    <tr class="ScTableRow-sc-18rdmqn-0 epLaWL tw-table-row">
        <td class="InjectLayout-sc-588ddc-0 knzRFc tw-table-cell">%KEY%</td>
        <td class="InjectLayout-sc-588ddc-0 knzRFc tw-table-cell">%VALUE%</td>
    </tr>`;

export function injectStats(): void {
    const root: Element | null = document.querySelector(".video-player__overlay");
    if (root === null)
        throw "Can't inject chat stats panel. Try to reload the page. If the problem persists, contact the developper at me@stevancorre.com";

    // check if any ui is existing, if yes, click on the X button
    // i click on it bc it updates the option too directly + removing
    // doesn't work for some reason
    const existingUI: Element | null = document.querySelector(
        ".video-player__overlay .tw-root--hover .simplebar-scroll-content button",
    );
    if (existingUI !== null) {
        (existingUI as HTMLButtonElement).click();
    }

    const element: HTMLElement = htmlToElement(UI);
    root.append(element);
    bindEvents(element);

    updateStats(getClientStats());
}

function bindEvents(element: HTMLElement): void {
    // bind close
    element.querySelector("button")!.addEventListener("click", () => {
        removeStats();
        storeState(false);
    });
}

export function removeStats(): void {
    const existingUI: Element | null = document.querySelector(`#${UIStatsId}`);
    existingUI?.remove();
}

export function updateStats(stats: ChatStats): void {
    const root: Element | null = document.querySelector(`#${UIStatsId}`);
    if (root === null) return;

    const body: HTMLTableSectionElement = root.querySelector("tbody")!;
    body.innerHTML = "";

    for (const [key, value] of Object.entries(stats)) {
        const keyString: string = key.replace(/([A-Z]|[0-9][^ ])/g, " $1").trim();

        const tr: string = UITableRow.replace("%KEY%", capitalize(keyString)).replace(
            "%VALUE%",
            value === undefined ? "--" : value,
        );
        body.appendChild(htmlToElement(tr));
    }
}
