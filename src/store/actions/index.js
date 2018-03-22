import axios from 'axios';
import parseHtmlResponse from '../../modules/parse-files-response-html';
import { getCurrentWeek, getWeeks } from '../selectors';
import { notifications } from '../../components/Notifications';

export const SET_CURRENT_WEEK = 'SET_CURRENT_WEEK';
export const FILES_REQUEST_PENDING = 'FILES_REQUEST_PENDING';
export const FILES_REQUEST_SUCCESS = 'FILES_REQUEST_SUCCESS';

export const setCurrentWeek = week => ({
  type: SET_CURRENT_WEEK,
  payload: week
});

export const filesRequest = () => (dispatch, getState) => {
  dispatch({ type: FILES_REQUEST_PENDING, payload: true });
  const url =
    'https://thingproxy.freeboard.io/fetch/http://xmltv.s-tv.ru/xchenel.php?login=test&pass=&show=1&xmltv=0';
  axios
    .get(url)
    .then(response => {
      // TODO: response may have any error messages
      dispatch({
        type: FILES_REQUEST_SUCCESS,
        payload: parseHtmlResponse(response.data, 3)
      });
      // TODO: if no errors -- set week
      if (!getCurrentWeek(getState())) {
        dispatch({
          type: SET_CURRENT_WEEK,
          payload: getWeeks(getState()).last()
        });
      }
    })
    .catch(error => notifications.networkError(error));
};
