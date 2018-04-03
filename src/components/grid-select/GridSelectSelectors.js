
/**
 * Selectors used for computing derived state for GridSelect
 */

/**
 * @description - input selector for retrieving the value of 
  * the filter for the given Grid
 * @param {Object} state
 * @param {Object} props
 * @returns {Array}
 */
function getFilterValue(state, props) {
  return state[props.model].filters;
}

/**
 * @description - Input selector for returning the options
 * to the filter react-select component
 * @param {Object} state
 * @param {Object} props
 * @returns {Array}
 */
function getFilterOptions(state, props) {
  if (props.model === 'games') {
    return [
      {
        label: 'Genre',
        value: 'genres',
        options: [
          { label: 'Action', value: 'Action', },
          { label: 'Point-and-click', value: 'Point-and-click', },
          { label: 'Fighting', value: 'Fighting', },
          { label: 'Shooter', value: 'Shooter', },
          { label: 'Racing', value: 'Racing', },
          { label: 'Free to Play', value: 'Free to Play', },
          { label: 'Music', value: 'Music', },
          { label: 'Platformer', value: 'Platformer', },
          { label: 'Real Time Strategy', value: 'Real Time Strategy', },
          { label: 'Puzzle', value: 'Puzzle', },
          { label: 'Role-playing game' , value: 'RPG' , },
          { label: 'Massively Multiplayer', value: 'Massively Multiplayer', },
          { label: 'Simulation', value: 'Simulation', },
          { label: 'Sports', value: 'Sports', },
          { label: 'Strategy', value: 'Strategy', },
          { label: 'Turn-based strategy', value: 'Turn-based strategy', },
          { label: 'Violent', value: 'Violent', },
          { label: 'Casual', value: 'Casual', },
          { label: 'Early Access', value: 'Early Access', },
          { label: 'Nudity', value: 'Nudity', },
          { label: 'Gore', value: 'Gore', },
          { label: 'Education', value: 'Education', },
          { label: 'Tactical', value: 'Tactical', },
          { label: 'Hack and slash', value: 'Hack and slash', },
          { label: 'Trivia', value: 'Trivia', },
          { label: 'Sexual Content', value: 'Sexual Content', },
          { label: 'Pinball', value: 'Pinball', },
          { label: 'Adventure', value: 'Adventure', },
          { label: 'Indie', value: 'Indie', },
          { label: 'Arcade', value: 'Arcade', },
        ],
        type: 'array',
        subfilterId: 'name',
      },
      {
        label: 'Platform',
        value: 'platforms',
        options: [
          { label: 'Linux', value: 'Linux', },
          { label: 'PC (Microsoft Windows)', value: 'PC (Microsoft Windows)', },
          { label: 'Mac', value: 'Mac', },
          { label: 'Nintendo 64', value: 'Nintendo 64', },
          { label: 'Wii', value: 'Wii', },
          { label: 'PlayStation', value: 'PlayStation', },
          { label: 'PlayStation 2', value: 'PlayStation 2', },
          { label: 'PlayStation 3', value: 'PlayStation 3', },
          { label: 'Xbox', value: 'Xbox', },
          { label: 'Xbox 360', value: 'Xbox 360', },
          { label: 'PC DOS', value: 'PC DOS', },
          { label: 'Commodore C64/128', value: 'Commodore C64/128', },
          { label: 'Amiga', value: 'Amiga', },
          { label: 'Nintendo Entertainment System (NES)', value: 'Nintendo Entertainment System (NES)', },
          { label: 'Super Nintendo Entertainment System (SNES)', value: 'Super Nintendo Entertainment System (SNES)', },
          { label: 'Nintendo DS', value: 'Nintendo DS', },
          { label: 'Nintendo GameCube', value: 'Nintendo GameCube', },
          { label: 'Game Boy Color', value: 'Game Boy Color', },
          { label: 'Dreamcast', value: 'Dreamcast', },
          { label: 'Game Boy Advance', value: 'Game Boy Advance', },
          { label: 'Amstrad CPC', value: 'Amstrad CPC', },
          { label: 'ZX Spectrum', value: 'ZX Spectrum', },
          { label: 'MSX', value: 'MSX', },
          { label: 'Sega Mega Drive/Genesis', value: 'Sega Mega Drive/Genesis', },
          { label: 'Sega 32X', value: 'Sega 32X', },
          { label: 'Sega Saturn', value: 'Sega Saturn', },
          { label: 'Game Boy', value: 'Game Boy', },
          { label: 'Android', value: 'Android', },
        ],
        type: 'array',
        subfilterId: 'name',
      }
    ];
  }
}

export {
  getFilterValue,
  getFilterOptions,
};
