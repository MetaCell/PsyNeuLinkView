import debounce from 'lodash.debounce';
import {BASE_ZOOM} from "../../../../constants";

export const defaultFilters = ['N/A'];

export function toObject(pairs) {
    return Array.from(pairs).reduce(
        (acc, [key]) => Object.assign(acc, {[key]: key}),
        {}
    );
}

/**
 *
 * @param {*sting} id
 * @param {*array of strings} currentValue
 * @param {*function callback} updateValue
 */
export const handleValueChange = (id, currentValue, updateValue) => {
    let newValue = [...currentValue];

    if (newValue.includes(id)) {
        newValue.splice(newValue.indexOf(id), 1);
    } else {
        newValue.push(id);
    }
    if (updateValue) updateValue(newValue);
};

/**
 *
 * @param {*object } param0
 * @param {* set state method} updateOptions
 */
export const handleOptionChange = ({key, value}, updateOptions) => {
    updateOptions((prev) => ({
        ...prev,
        [key]: value,
    }));
};

// debounce value update
export const debounceUpdateValue = debounce((value, onUpdateValue) => {
    if (onUpdateValue) {
        onUpdateValue(value);
    }
}, 800);

/**
 *
 * @param {*string} string
 * @returns {spaced string e.g ACROText -> ACRO Text}
 */
export function insertSpaces(string) {
    string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
    return string;
}


export function getNodeParentID(node) {
    const graphPath = node.getGraphPath();

    if (graphPath.length <= 1) {
        return undefined;
    }

    return graphPath.slice(0, -1).toString();
}


export function getScaleTransform(engine) {
    const zoomLevel = engine.getModel().getZoomLevel();
    return zoomLevel / BASE_ZOOM
}