const handler = (e) => {
  if (e.button === 3) {
    e.preventDefault();
    e.stopPropagation();
    document.activeElement.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        bubbles: true,
      }),
    );
  }
};

exports.activate = () => {
  document.addEventListener("mousedown", handler, true);

  document.querySelectorAll("iframe").forEach((iframe) => {
    try {
      iframe.contentDocument?.addEventListener("mousedown", handler, true);
    } catch (e) {}
  });

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.tagName === "IFRAME") {
          node.addEventListener("load", () => {
            try {
              node.contentDocument?.addEventListener(
                "mousedown",
                handler,
                true,
              );
            } catch (e) {}
          });
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  exports._observer = observer;
};

exports.deactivate = () => {
  document.removeEventListener("mousedown", handler, true);
  exports._observer?.disconnect();
};
