import { get } from 'lodash';
import { toast } from 'react-toastify';

export function ejectErrorMessage(errors) {
  const status = get(errors, 'response.status', 500);

  return get(errors, 'response.data.message', `Erros code #${status}`);
}

export function handleRequestError(errors) {
  handleNotification(ejectErrorMessage(errors), 'error');
}

export function handleNotification(msg, type = 'info') {
  const map = {
    info: 'info',
    success: 'success',
    dismiss: 'dismiss',
    error: 'error',
  };
  const action = map[type];

  if (!action) return;

  return toast[action](msg);
}
