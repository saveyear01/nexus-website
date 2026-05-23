"use client";

import ChatModal from "@/component/sections/ChatModal";
import {
    createContext,
    useCallback,
    useContext,
    useState,
    type ReactNode,
} from "react";

type ChatContextValue = {
    /**
     * Open the assistant.
     *
     * Optional `initialQuery` is auto-submitted on open — useful for "Ask
     * about X" suggestion chips or hero compose handoffs.
     */
    open: (initialQuery?: string) => void;
    /** Close the assistant. Most callers won't need this. */
    close: () => void;
    isOpen: boolean;
};

const ChatContext = createContext<ChatContextValue | null>(null);

/**
 * Provider mounted once at the root layout. Holds the assistant's open state
 * and renders the modal when open, so any component in the tree can call
 * `useChat().open()` to launch the assistant.
 *
 * No FAB is rendered here — triggers live in the header and hero now that the
 * assistant is a first-class feature surface.
 */
export function ChatProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<{
        open: boolean;
        initialQuery?: string;
    }>({ open: false });

    const open = useCallback((initialQuery?: string) => {
        setState({ open: true, initialQuery });
    }, []);

    const close = useCallback(() => {
        setState({ open: false });
    }, []);

    return (
        <ChatContext.Provider value={{ open, close, isOpen: state.open }}>
            {children}
            {state.open && (
                <ChatModal
                    onClose={close}
                    initialQuery={state.initialQuery}
                />
            )}
        </ChatContext.Provider>
    );
}

/**
 * Access the assistant from anywhere in the tree.
 *
 * Throws in development if used outside of `<ChatProvider>` — that's a wiring
 * bug, not a runtime condition to handle.
 */
export function useChat(): ChatContextValue {
    const ctx = useContext(ChatContext);
    if (!ctx) {
        throw new Error("useChat must be used within a <ChatProvider>");
    }
    return ctx;
}
