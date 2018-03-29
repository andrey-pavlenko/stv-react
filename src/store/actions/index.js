import axios from 'axios';
import parseHtmlResponse from '../../modules/parse-files-response-html';
import {
  getCurrentWeek,
  getWeeks,
  getItemUrlIds,
  getViewedUrlIds,
  getDownloadedUrlIds
} from '../selectors';
import { notifications } from '../../components/Notifications';

export const SET_CURRENT_WEEK = 'SET_CURRENT_WEEK';
export const FILES_REQUEST_PENDING = 'FILES_REQUEST_PENDING';
export const FILES_REQUEST_SUCCESS = 'FILES_REQUEST_SUCCESS';

export const FILE_UPDATE_VIEWED = 'FILE_UPDATE_VIEWED';
export const FILE_UPDATE_DOWNLOADED = 'FILE_UPDATE_DOWNLOADED';

export const SETTINGS_SAVE = 'SETTINGS_SAVE';
export const SETTINGS_RENAME_CHANNEL = 'SETTINGS_RENAME_CHANNEL';
export const SETTINGS_HIDE_CHANNEL = 'SETTINGS_HIDE_CHANNEL';
export const SETTINGS_RESTORE_CHANNEL_NAME = 'SETTINGS_RESTORE_CHANNEL_NAME';

export const setCurrentWeek = week => ({
  type: SET_CURRENT_WEEK,
  payload: week
});

export const filesRequest = () => (dispatch, getState) => {
  dispatch({ type: FILES_REQUEST_PENDING, payload: true });
  const { cors, url, login, password, format, timezone } = getState()
    .get('settings')
    .toObject();
  const requestUrl = `${cors}${url}/xchenel.php?login=${login}&pass=${password}&show=1&xmltv=${format}`;
  // const requestUrl = '/s-tv-test.html';
  axios
    .get(requestUrl)
    .then(response => {
      // TODO: response may have any error messages
      dispatch({
        type: FILES_REQUEST_SUCCESS,
        payload: parseHtmlResponse(response.data, timezone)
      });
      if (!getCurrentWeek(getState())) {
        dispatch({
          type: SET_CURRENT_WEEK,
          payload: getWeeks(getState()).last()
        });
      }
    })
    .catch(error => {
      notifications.networkError(error);
      dispatch({
        type: FILES_REQUEST_PENDING,
        payload: false
      });
    });
};

export const fileAddViewed = urlId => (dispatch, getState) => {
  const itemIds = getItemUrlIds(getState());
  const viewedUrlIds = getViewedUrlIds(getState())
    .add(urlId)
    .filter(viewed => itemIds.includes(viewed));
  dispatch({
    type: FILE_UPDATE_VIEWED,
    payload: viewedUrlIds
  });
};

export const fileAddDownloaded = urlId => (dispatch, getState) => {
  const itemIds = getItemUrlIds(getState());
  const downloadedUrlIds = getDownloadedUrlIds(getState())
    .add(urlId)
    .filter(downloaded => itemIds.includes(downloaded));
  dispatch({
    type: FILE_UPDATE_DOWNLOADED,
    payload: downloadedUrlIds
  });
};

export const settingsSave = settings => ({
  type: SETTINGS_SAVE,
  payload: settings
});

export const settingsRenameChannel = (id, newName) => ({
  type: SETTINGS_RENAME_CHANNEL,
  payload: {
    id,
    newName
  }
});

export const settingsRestoreChannelName = id => ({
  type: SETTINGS_RESTORE_CHANNEL_NAME,
  payload: id
});

export const settingsHideChannel = id => ({
  type: SETTINGS_HIDE_CHANNEL,
  payload: id
});
