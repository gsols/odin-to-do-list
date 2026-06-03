import {Section} from "./Section.js";
import { TaskFactory } from "./TaskFactory.js";

class SectionFactory {
    static createSection(name) {
        if (!name?.trim()) {
            throw new Error("Section name is required");
        }
        return new Section(name.trim());
    }

    // revive a Section instance from plain JSON produced by Section.toJSON()
    static fromJSON(data) {
        if (!data) return null;
        const { id, name, tasks } = data;
        const section = new Section(name);
        if (id !== undefined) section.id = id;
        section.tasks = Array.isArray(tasks)
            ? tasks.map(t => TaskFactory.fromJSON(t))
            : [];
        return section;
    }
}

export { SectionFactory };