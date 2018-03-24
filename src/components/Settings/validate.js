/**
 * Validate settings data
 *
 * @param {Map} data
 * @param {String} name
 * @returns {Object | null}
 */
export const validate = (data, name) => {
  switch (name) {
  case 'cors':
    return data.get('cors')
      ? null
      : {
        type: 'warning',
        message: 'Ответы сервера должны содержать CORS заголовки'
      };
  case 'url':
    return data.get('url')
      ? null
      : {
        type: 'danger',
        message: 'Требуется адрес сервера'
      };
  case 'login':
    return data.get('login')
      ? null
      : {
        type: 'danger',
        message: 'Требуется значение'
      };
  case 'interval':
    return data.get('interval') > 0
      ? null
      : {
        type: 'warning',
        message: 'Автоматическое обновление отключено'
      };
  default:
    return null;
  }
};

export const hasError = data => !(data.get('url') && data.get('login'));
