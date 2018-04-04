
/**
 * Actions for the GridSelect component
 */

import { createAction } from 'redux-actions';

const setGridFilterAction = createAction('SET_GRID_FILTER', (model, value) => { return { model, value, }; });
const setGridFilterOptions = createAction('SET_GRID_FILTER_OPTIONS',(model, value) => { return { model, value }; });

function fetchOptions(
  dispatch,
  model,
  currentOptions,
  inputValue,
  currentValue,
  callback
) {
  const callbackFunction = typeof currentValue === 'function' && !callback ? currentValue : callback;
  const filterCurrentValue = typeof currentValue === 'function' ? null : currentValue;

  if (!filterCurrentValue) {
    return callbackFunction(null, currentOptions);
  }
  else {
    // find the option the current value relates to
    const option = currentOptions.find(option => filterCurrentValue.value === option.value);
    if (option.options.length) {
      callbackFunction(null, currentOptions);
      return;
    }

    fetch(
      encodeURI(`${process.env.API_HOST}/v1/list/${option.path}`),
      { method: 'GET', },
    )
      .then(response => response.json())
      .then((json) => {
        json.objects.forEach((object) => {
          const value = object[option.subfilterId];
          option.options.push({
            label: value,
            value,
          });
        });
      })
      .then(() => {
        dispatch(setGridFilterOptions(model, currentOptions));
        callbackFunction(null, currentOptions);
      })
      .catch(err => callbackFunction(err));
  }
}

export {
  setGridFilterAction,
  setGridFilterOptions,
  fetchOptions,
};
