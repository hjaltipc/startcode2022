import { useEffect, useState, createContext, ReactChild } from "react";

const ws = new WebSocket("ws://localhost:6921");

export const SocketContext = createContext(ws);

export const SocketProvider = (props) => (
  <SocketContext.Provider value={ws}>{props.children}</SocketContext.Provider>
);
