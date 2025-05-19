// useNotificationStore.test.ts
import { act } from 'react-dom/test-utils';
import { toast } from 'react-toastify';
import { useNotificationStore } from './useNotificationStore';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
  },
  ToastContainer: () => null,
}));

describe('useNotificationStore', () => {
  test('deve chamar toast.success com a mensagem correta', () => {
    const { notify } = useNotificationStore.getState();

    act(() => {
      notify.success('Success message');
    });

    expect(toast.success).toHaveBeenCalledWith('Success message');
  });

  test('deve chamar toast.error com a mensagem correta', () => {
    const { notify } = useNotificationStore.getState();

    act(() => {
      notify.error('Error message');
    });

    expect(toast.error).toHaveBeenCalledWith('Error message');
  });

  test('deve chamar toast.info com a mensagem correta', () => {
    const { notify } = useNotificationStore.getState();

    act(() => {
      notify.info('Info message');
    });

    expect(toast.info).toHaveBeenCalledWith('Info message');
  });

  test('deve chamar toast.warning com a mensagem correta', () => {
    const { notify } = useNotificationStore.getState();

    act(() => {
      notify.warn('Warning message');
    });

    expect(toast.warning).toHaveBeenCalledWith('Warning message');
  });
});
