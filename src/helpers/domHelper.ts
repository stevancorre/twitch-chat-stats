export const htmlToElement = (source: string): HTMLElement => {
    const template: HTMLTemplateElement = document.createElement("template");
    template.innerHTML = source.trim();
    return template.content.firstChild as HTMLElement;
};
