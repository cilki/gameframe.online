
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

    let uri;
    if (option.url) {
      uri = option.url;
    }
    else {
      if (!option.path) {
        console.error(new Error(`Neither \`uri\` nor \`path\` was provided for option: ${option.label}`));
      }
      uri = `${process.env.API_HOST}/v1/list/${option.path}`
    }

    fetch(
      encodeURI(uri),
      { method: 'GET', },
    )
      .then(response => response.json())
      .then((json) => {
        const iterate = json.objects ? json.objects : json;
        iterate.forEach((object) => {
          let value = object[option.subfilterId];
          if (option.type === 'number') {
            value = Number(value);
          }
          const label = option.subfilterLabel ? object[option.subfilterLabel] : value;
          option.options.push({
            label,
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
