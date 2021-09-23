import loggerActionTypes from './Logger.types';

export const scanLogger = (SLogger) => ({
  type: loggerActionTypes.SCAN_LOGGER,
  payload:SLogger
});
export const toggleLoading = () => ({
  type: loggerActionTypes.TOGGLE_LOADING,
  
});
// export const toggleDispatch = (SLogger) => ({
//   type: loggerActionTypes.TOGGLE_DISPATCH,
//   payload:SLogger
  
// });
// export const toggleDodo = (SLogger) => ({
//   type: loggerActionTypes.TOGGLE_DODO,
//   payload:SLogger
  
// });
// export const toggleBaorder = (SLogger) => ({
//   type: loggerActionTypes.TOGGLE_BAORDER,
//   payload:SLogger
  
// });
// export const toggleSds = (SLogger) => ({
//   type: loggerActionTypes.TOGGLE_SDS,
//   payload:SLogger
  
// });