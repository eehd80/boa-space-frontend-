/*
 * Usage:
 *   const { alert, confirm, prompt } = useModals()
 *   alert("Hey!") // awaitable too
 *   if (await confirm("Are you sure?")) ...
 *   const result = await prompt("Enter a URL", "http://")
 */

import React, { createContext, ReactNode, useCallback, useContext, useRef, useState } from "react";
import { AcceptSignConfirm } from "../components/Modals/AcceptSign";
import { Alert } from "../components/Modals/Alert";
import { Login } from "../components/Modals/Login";
import { ConfirmAlert } from "../components/Modals/ConfirmAlert";

// TODO: Select field contents when a prompt() loads
// TODO: Fix Promise<> return types instead of using any

enum ModalType {
  Alert,
  Confirm,
  Prompt,
  AcceptSignConfirm,
  Login,
}

export interface Modals {
  alert: (message: string) => Promise<any>;
  confirm: (message: string) => Promise<any>;
  prompt: (message: string, defaultValue?: string) => Promise<any>;
  acceptSignConfirm: (message: string) => Promise<any>;
  login: () => Promise<any>;
}

const defaultContext: Modals = {
  alert() {
    throw new Error("<ModalProvider> is missing");
  },
  confirm() {
    throw new Error("<ModalProvider> is missing");
  },
  prompt() {
    throw new Error("<ModalProvider> is missing");
  },
  acceptSignConfirm() {
    throw new Error("<ModalProvider> is missing");
  },
  login() {
    throw new Error("<ModalProvider> is missing");
  },
};

const Context = createContext<Modals>(defaultContext);

interface AnyEvent {
  preventDefault(): void;
}

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ReactNode | null>(null);
  const input = useRef<HTMLInputElement>(null);
  // const ok = useRef<HTMLButtonElement>(null);

  const createOpener = useCallback(
    (type: ModalType) =>
      (message?: string, defaultValue = "") =>
        new Promise((resolve) => {
          console.debug(message, defaultValue);
          const handleClose = (e?: AnyEvent) => {
            e?.preventDefault();
            setModal(null);
            resolve(null);
          };

          const handleCancel = (e?: AnyEvent) => {
            e?.preventDefault();
            setModal(null);
            if (type === ModalType.Prompt) resolve(null);
            else resolve(false);
          };

          const handleOK = (e?: AnyEvent) => {
            e?.preventDefault();
            setModal(null);
            if (type === ModalType.Prompt) resolve(input.current?.value);
            else resolve(true);
          };

          let modal = null;
          if (type === ModalType.AcceptSignConfirm) {
            modal = (
              <AcceptSignConfirm
                handleClose={handleClose}
                handleCancel={handleCancel}
                handleOK={handleOK}
              />
            );
          } else if (type === ModalType.Alert) {
            modal = <Alert handleClose={handleClose} message={message} />;
          } else if (type === ModalType.Login) {
            modal = <Login handleClose={handleClose} />;
          } else if (type === ModalType.Confirm) {
            modal = (
              <ConfirmAlert
                handleClose={handleClose}
                handleOK={handleOK}
                handleCancel={handleCancel}
                message={message}
              />
            );
          }
          setModal(modal);
        }),
    []
  );

  return (
    <Context.Provider
      value={{
        alert: createOpener(ModalType.Alert),
        confirm: createOpener(ModalType.Confirm),
        prompt: createOpener(ModalType.Prompt),
        acceptSignConfirm: createOpener(ModalType.AcceptSignConfirm),
        login: createOpener(ModalType.Login),
      }}
    >
      {children}
      {modal}
    </Context.Provider>
  );
};

const useModals = () => useContext(Context);

export default useModals;
