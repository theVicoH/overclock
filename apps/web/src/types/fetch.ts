type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T | undefined }
  | { status: 'error'; error: string }

type FetchEvent<T> =
  | { type: 'FETCH' }
  | { type: 'RESOLVE'; data: T | undefined }
  | { type: 'REJECT'; error: string }
