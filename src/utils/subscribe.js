let Subscribe = function() {
  this.subscribes = {};
};
(Subscribe.prototype.subscribe = function(type, vm) {
  let subscriber;
  if (Array.isArray(type)) {
    type.forEach(item => {
      subscriber = this.subscribes[item];
      if (subscriber && Array.isArray(subscriber)) {
        subscriber.push(vm);
        this.subscribes[item] = subscriber;
      } else {
        this.subscribes[item] = [vm];
      }
    });
  } else {
    subscriber = this.subscribes[type];
    if (subscriber && Array.isArray(subscriber)) {
      subscriber.push(vm);
      this.subscribes[type] = subscriber;
    } else {
      this.subscribes[type] = [vm];
    }
  }
}),
  (Subscribe.prototype.publish = function(type, data) {
    let subscriber = this.subscribes[type];
    if (subscriber && Array.isArray(subscriber) && subscriber.length > 0) {
      subscriber.forEach(item => {
        item.publishCb(type, data);
        item = subscriber.shift();
      });
    }
  }),
  (Subscribe.getInstance = (function() {
    var instance = null;
    return function() {
      if (!instance) {
        instance = new Subscribe();
      }
      return instance;
    };
  })());
export default Subscribe.getInstance();
