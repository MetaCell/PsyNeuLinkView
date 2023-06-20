import debounce from 'lodash.debounce';

export const defaultFilters = ['N/A'];

export function toObject(pairs) {
  return Array.from(pairs).reduce(
    (acc, [key]) => Object.assign(acc, { [key]: key }),
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
export const handleOptionChange = ({ key, value }, updateOptions) => {
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
