var template = require('../templates/modal');

var optly = {
  vue: {}
};

Vue.config({
  delimiters: ['[', ']']
});

Vue.component('optly-modal', {
  template: template,
  replace: true
});

optly.vue.mainCtrl = new Vue({
  el: '#main-ctrl',
  data: {
    showModal: false,
    modal: {
      title: 'This is the modal title',
      content: 'This is the modal content',
      showMessage: 'show'
    }
  },
  methods: {
    tgmodal: function(e) {
      this.showModal = !this.showModal;
      if (this.showModal) {
        this.modal.showMessage = 'hide';
      } else {
        this.modal.showMessage = 'show'
      }
    }
  }
});