
var $ = require('jquery');

var gitbook = window.gitbook;

// 切换页面增加loading动画
gitbook.events.on('custom.page.init', showLoading);

// 页面更改后更新目录
gitbook.events.on('page.change', change);


function change(){
  var part = parseInt(gitbook.state.level, 10);
  var currentPart = gitbook.state.config.pluginsConfig['theme-custom'].navbar.nav[part - 1].part;
  // 设置当前part nav激活状态
  $('.book-nav-list-link').each(function() {
    var _this = $(this);
    if (_this.hasClass('book-nav-list-link-active')) {
      _this.removeClass('book-nav-list-link-active');
    }
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

  // hide loding
  $('.custom-loading-bg').hide();
}

function showLoading() {
  $('.custom-loading-bg').show();
}