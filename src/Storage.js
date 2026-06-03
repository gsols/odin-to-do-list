export const STORAGE_PREFIX = "odin_";
    
export function saveToLocalStorage(key, value) {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
}

export function loadFromLocalStorage(key) {
    const value = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    return value ? JSON.parse(value) : null;
}

export function removeFromLocalStorage(key) {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
}


export function saveList(key, list) {
    const serializedList = list.map(item => item.toJSON());
    saveToLocalStorage(key, serializedList);
}

export function loadList(key, factory) {
    const serializedList = loadFromLocalStorage(key);
    if (!serializedList) {
        return [];
    }
    return serializedList.map(itemData => factory.fromJSON(itemData));
}