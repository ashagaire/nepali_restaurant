"use client";

import { useState } from "react";

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  children: React.ReactNode;
}

export default function ConfirmDialog({
  message,
  onConfirm,
  children,
}: ConfirmDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <span onClick={() => setOpen(true)}>{children}</span>

      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "1.5rem",
              borderRadius: "0.5rem",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            <p>{message}</p>
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <button
                onClick={() => {
                  onConfirm();
                  setOpen(false);
                }}
              >
                Yes
              </button>
              <button onClick={() => setOpen(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
