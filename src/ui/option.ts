import { htmlToElement } from "../helpers/domHelper";

const UISwitchId = "twitch-chat-stats-toggle";

const UI = `
    <div class="Layout-sc-nxg1ff-0 dwuicp">
        <div class="Layout-sc-nxg1ff-0 gcwIMz">
            <label class="ScDropDownMenuInputItemLabel-sc-p9ci3m-0 jmXxSR InjectLayout-sc-588ddc-0 kikCET tw-drop-down-menu-input-item__label" for="${UISwitchId}">
                Chat Stats
            </label>
            <div class="ScToggle-sc-796zbf-0 AgPgA tw-toggle" data-a-target="player-settings-submenu-advanced-ad-stats" data-test-selector="ad-stats-toggle">
                <input class="ScToggleInput-sc-796zbf-1 cwUJld tw-toggle__input" id="${UISwitchId}" type="checkbox" data-a-target="tw-toggle" data-dashlane-rid="8c5699a3bebac1d3" data-form-type="">
                <label for="${UISwitchId}" class="ScToggleButton-sc-796zbf-2 erOoiO tw-toggle__button"></label>
            </div>
        </div>
    </div>
`;

// twitch settings dialog is created dynamically
// that's why i can't just add the chat stats option
// directly in a div and voilà.
// a new dialog is generated each time the user open
// the settings so i have to add/remove the option
// each time the user open "Advanced" options
export const injectOption = () => {
    let element: HTMLElement | null;

    document.addEventListener("mouseup", (event: MouseEvent) => {
        if (event.target === null) return;

        // check if the user clicked on the "Advanced options" button
        const target: HTMLElement = event.target as HTMLElement;
        const parent: HTMLElement | null = target.closest("button");
        if (parent === null) return;
        if (
            parent.getAttribute("data-a-target") !== "player-settings-menu-item-advanced" &&
            parent.getAttribute("data-test-selector") !== "main-menu"
        )
            return;

        // if option already exists, just remove it
        // otherwhise, create it
        if (element) {
            element.remove();
            element = null;
        } else {
            const root = document.querySelector("[data-a-target=player-settings-menu]");
            if (!root) return;

            // wait for settings to load
            // needed since they are loaded dynamically
            requestAnimationFrame(() => {
                element = htmlToElement(UI);
                root.append(element);
            });
        }
    });
};
