import {
  useEffect,
  useRef,
  type ReactNode,
} from "react";

import { X } from "lucide-react";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;

  title: string;

  children: ReactNode;

  footer?: ReactNode;

  onClose: () => void;

  className?: string;
}

export default function Modal({
  isOpen,
  title,
  children,
  footer,
  onClose,
  className,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (
      e: KeyboardEvent
    ) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const focusable =
      modalRef.current?.querySelectorAll<
        HTMLButtonElement | HTMLInputElement
      >(
        'button,[href],input,textarea,select,[tabindex]:not([tabindex="-1"])'
      );

    focusable?.[0]?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/40
      p-4
      "
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "w-full max-w-lg rounded-xl bg-white shadow-xl overflow-hidden",
          className
        )}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-light-gray px-6 py-5">

          <h2 className="text-xl font-semibold text-navy-500">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-off-white transition"
          >
            <Icon
              icon={X}
              size={20}
            />
          </button>

        </div>

        {/* Body */}

        <div className="px-6 py-6">

          {children}

        </div>

        {/* Footer */}

        {footer && (

          <div className="border-t border-light-gray px-6 py-5 flex justify-end gap-3">

            {footer}

          </div>

        )}

      </div>
    </div>
  );
}