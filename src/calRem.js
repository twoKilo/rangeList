var calculate_size = function (width) {
  var clientWidth = docEl.clientWidth,
    clientHeight = docEl.clientHeight;
  clearTimeout(timer);
  if (
    !clientWidth ||
    (prevWidth !== 0 &&
      self.frameElement &&
      self.frameElement.tagName === "IFRAME")
  ) {
    timer = setTimeout(calculate_size, 100);
    return;
  }
  // 排除键盘弹起引起的窗口变化
  if (prevWidth === clientWidth) return;

  var BASE_FONT_SIZE = 100,
    minWidth = Math.min(clientWidth, clientHeight),
    arr = [];

  // 宽屏处理
  if (minWidth !== clientWidth) {
    arr.push("wide-screen");
  }
  // 大屏幕处理
  if (minWidth >= 1.3 * 375) {
    arr.push("max-screen");
  }
  docEl.className = originClassName + arr.join(" ");
  docEl.style.fontSize = BASE_FONT_SIZE * (clientWidth / width) + "px";
  prevWidth = clientWidth;
};

// fontsize=width / (designWidth / BASE_FONT_SIZE)
// rem*fontsieze
// 10 / (4 / 2)=5

// 10 / (4 * 1 / 2)
// 10/4
// designBaseWidth:750px=>750/baseFontSize=>7.5rem
// eleWidth: 24px => 24px / 100=> 0.24rem

// realWidth: 750*2px
// eleWidth:24px=> 24px / 100=> 0.24rem =>?px
// realWidth / (width / BASE_FONT_SIZE)=fontsize
// clientWidth / (width / BASE_FONT_SIZE) : 一份rem占多少px

// BASE_FONT_SIZE * (clientWidth / width)
//   =BASE_FONT_SIZE * clientWidth * 1 / width
//     =clientWidth * (BASE_FONT_SIZE / width)
//     ( 1/(BASE_FONT_SIZE / width) = width/BASE_FONT_SIZE )
//       =clientWidth/(width/BASE_FONT_SIZE)
