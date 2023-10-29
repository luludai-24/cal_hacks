import { createContext, useState } from "react"
import { Event, hydrateClientStorage, useEventLoop } from "/utils/state.js"

export const initialState = {"caffeine": 100, "caffeine_levels": [{"time": "00:00", "caffeine": 100.0}, {"time": "01:00", "caffeine": 87.05505632961241}, {"time": "02:00", "caffeine": 75.7858283255199}, {"time": "03:00", "caffeine": 65.9753955386447}, {"time": "04:00", "caffeine": 57.43491774985174}, {"time": "05:00", "caffeine": 50.0}, {"time": "06:00", "caffeine": 43.527528164806206}, {"time": "07:00", "caffeine": 37.89291416275996}, {"time": "08:00", "caffeine": 32.98769776932235}, {"time": "09:00", "caffeine": 28.71745887492587}, {"time": "10:00", "caffeine": 25.0}, {"time": "11:00", "caffeine": 21.7637640824031}, {"time": "12:00", "caffeine": 18.94645708137998}, {"time": "13:00", "caffeine": 16.493848884661176}, {"time": "14:00", "caffeine": 14.358729437462939}, {"time": "15:00", "caffeine": 12.5}, {"time": "16:00", "caffeine": 10.88188204120155}, {"time": "17:00", "caffeine": 9.47322854068999}, {"time": "18:00", "caffeine": 8.246924442330588}, {"time": "19:00", "caffeine": 7.1793647187314695}, {"time": "20:00", "caffeine": 6.25}, {"time": "21:00", "caffeine": 5.440941020600775}, {"time": "22:00", "caffeine": 4.736614270344993}, {"time": "23:00", "caffeine": 4.123462221165296}], "form_data": [], "is_hydrated": false, "router": {"session": {"client_token": "", "client_ip": "", "session_id": ""}, "headers": {"host": "", "origin": "", "upgrade": "", "connection": "", "pragma": "", "cache_control": "", "user_agent": "", "sec_websocket_version": "", "sec_websocket_key": "", "sec_websocket_extensions": "", "accept_encoding": "", "accept_language": ""}, "page": {"host": "", "path": "", "raw_path": "", "full_path": "", "full_raw_path": "", "params": {}}}, "show": false, "text": "Type something...", "time": 0}

export const ColorModeContext = createContext(null);
export const StateContext = createContext(null);
export const EventLoopContext = createContext(null);
export const clientStorage = {"cookies": {}, "local_storage": {}}

export const initialEvents = () => [
    Event('state.hydrate', hydrateClientStorage(clientStorage)),
]

export const isDevMode = true

export function EventLoopProvider({ children }) {
  const [state, addEvents, connectError] = useEventLoop(
    initialState,
    initialEvents,
    clientStorage,
  )
  return (
    <EventLoopContext.Provider value={[addEvents, connectError]}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </EventLoopContext.Provider>
  )
}