import { 
  SET_RIGHTIEST, 
  SET_WRONGIEST, 
  SET_HIGH_SCORE, 
  SET_TOTAL_PLAYTHRUS,
  FETCH_STAT_FAIL, 
} from './StatsActionTypes'

const API_URL = 'http://localhost:4001/api';

export function getRightiest() {
  return (dispatch) => {
    return fetch(`${API_URL}/stats/mostright`)
      .then(res => res.json())
      .then(rightiest => {
        dispatch({ type: SET_RIGHTIEST, payload: rightiest })
      })
      .catch(err => {
        dispatch({ type: FETCH_STAT_FAIL, payload: err })
      })
  }
}

export function getWrongiest() {
  return (dispatch) => {
    return fetch(`${API_URL}/stats/mostwrong`)
      .then(res => res.json())
      .then(wrongiest => {
        dispatch({ type: SET_WRONGIEST, payload: wrongiest })
      })
      .catch(err => {
        dispatch({ type: FETCH_STAT_FAIL, payload: err })
      })
  }
}

export function getHighScore() {
  return (dispatch) => {
    return fetch(`${API_URL}/stats/highscore`)
      .then(res => res.json())
      .then(highScore => {
        dispatch({ type: SET_HIGH_SCORE, payload: highScore })
      })
      .catch(err => {
        dispatch({ type: FETCH_STAT_FAIL, payload: err })
      })
  }
}

export function getTotalPlaythrus() {
  return (dispatch) => {
    return fetch(`${API_URL}/stats/totalplaythrus`)
      .then(res => res.json())
      .then(totalPlaythrus => {
        dispatch({ type: SET_TOTAL_PLAYTHRUS, payload: totalPlaythrus.count })
      })
      .catch(err => {
        dispatch({ type: FETCH_STAT_FAIL, payload: err })
      })
  }
}
