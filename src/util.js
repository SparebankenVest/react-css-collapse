const requestAnimationFrameStub = (func) => {
  window.requestAnimationFrame(func);
};

export default { requestAnimationFrameStub };
