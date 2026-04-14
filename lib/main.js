exports.activate = () => {
  document.addEventListener(
    "mousedown",
    (e) => {
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
    },
    true,
  );
};

exports.deactivate = () => {};
