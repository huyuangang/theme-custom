
var $ = require('jquery');

var gitbook = window.gitbook;

gitbook.events.on('page.change', init);


function init(){
  var currentPart = window.localStorage.getItem('custom_current_part');
  var customConfig = window.gitbook.state.config.pluginsConfig['theme-custom'];
  // 第一次进来的时候
  if (!currentPart || currentPart === "undefined") {
    if (customConfig && customConfig.navbar && customConfig.navbar.nav) {
      var defaultIndex = customConfig.navbar.nav.findIndex(function(item){ return !!item.default });
      currentPart = customConfig.navbar.nav[defaultIndex > -1 ? defaultIndex : 0].part;
      window.localStorage.setItem('custom_current_part', currentPart);
    }
  }

  // 绑定点击事件
  $('.book-nav-list-link').click(function() {
    window.localStorage.setItem('custom_current_part', $(this).attr('data-part'));
  })

  // 设置当前part nav激活状态
  $('.book-nav-list-link').each(function() {
    var _this = $(this);
    if (_this.attr('data-part') === currentPart) {
      _this.addClass('book-nav-list-link-active');
    }
  })
  
  // 隐藏不属于当前part的左侧目录
  $('.chapter').each(function() {
    if ($(this).attr('data-part') !== currentPart) {
      $(this).hide();
    }
  })
}