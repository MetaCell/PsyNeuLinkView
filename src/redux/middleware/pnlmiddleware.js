const pnlMiddleware = store => next => action => {
  next(action);
}

export default pnlMiddleware;