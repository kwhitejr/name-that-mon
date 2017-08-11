import { 
  SET_RIGHTIEST, 
  SET_WRONGIEST, 
  SET_HIGH_SCORE, 
} from './StatsActionTypes'

const API_URL = 'http://localhost:3000/api';

export function getRightiest() {
  return (dispatch) => {
    return fetch(`${API_URL}/stats/mostright`)
      .then(res => res.json())
      .then(rightiest => {
        dispatch({ type: SET_RIGHTIEST, payload: rightiest })
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
  }
}

export function getHighScore() {
  return (dispatch) => {
    return fetch(`${API_URL}/stats/highscore`)
      .then(res => res.json())
      .then(highScore => {
        dispatch({ type: SET_HIGH_SCORE, payload: highScore })
      })
  }
}
