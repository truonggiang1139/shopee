import { useId, useRef, useState } from "react";
import {
  useFloating,
  FloatingPortal,
  arrow,
  shift,
  offset,
  flip,
  autoUpdate,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  safePolygon,
  FloatingArrow
} from "@floating-ui/react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  title: React.ReactNode;
  renderPopover: React.ReactNode;
}
export default function Popover({ title, renderPopover }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);
  const { refs, floatingStyles, context, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift(), arrow({ element: arrowRef })],
    placement: "bottom-end",
    whileElementsMounted: autoUpdate,
    transform: false
  });
  const hover = useHover(context, { handleClose: safePolygon() });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });
  const id = useId();
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);
  return (
    <div
      className="flex cursor-pointer items-center py-1 hover:text-gray-300"
      ref={refs.setReference}
      {...getReferenceProps()}
    >
      {title}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={{
                transformOrigin: `${middlewareData.arrow?.x}px top`,
                ...floatingStyles
              }}
              {...getFloatingProps()}
              initial={{ opacity: 0, transform: `scale(0)` }}
              animate={{ opacity: 1, transform: `scale(1)` }}
              exit={{ opacity: 0, transform: `scale(0)` }}
              transition={{ duration: 0.2 }}
            >
              {renderPopover}
              <FloatingArrow ref={arrowRef} context={context} width={22} height={10} fill="white" />
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  );
}
