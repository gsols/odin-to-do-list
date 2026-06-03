import {Section} from "./Section.js";

class SectionFactory {
    static createSection(name) {
        if (!name?.trim()) {
            throw new Error("Section name is required");
        }
        return new Section(name.trim());
    }
}

export { SectionFactory };