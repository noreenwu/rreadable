export const SET_LOADED = 'SET_LOADED'

export function setLoaded (id) {
  return {
    type: SET_LOADED,
    id,
  }
}
