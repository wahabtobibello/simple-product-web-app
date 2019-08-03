exports.mochaAsyncHelper = fn => function (done) {
  fn()
  .then(() => { done(); })
  .catch(done);
};
