import './index.css';
import $ from 'jquery'

$(function () {
  // 每组元素的宽度
  var itemWidth = 110
  var listPanel = $('#ul-back')
  // 向左滚动top值
  var z = 0
  var btnNode = $('#btn')
  var pawLineNode = $('#paw-line')
  // 游戏容器宽度
  const GAME_CONTAINER_WIDTH = 375;
  // 每次移动一个元素所需的时间
  const timePermit = 1500;
  // 下钩子所需时间
  const interval = 2000;

  function left () {
    listPanel.animate({
      'left': (z - itemWidth) + 'px'
    }, timePermit, 'linear', function () {
      listPanel.css({'left': '0px'})
      listPanel.find('li:first').appendTo(listPanel)
      left()
    })
  }

  function createDoll (parentNode,template, width) {
    // 多填一个元素，保证滚动的丝滑~~
    const groupCount = Math.ceil(GAME_CONTAINER_WIDTH / width) + 1
    // 生成新的DOM
    // const Dolls =  new Array(groupCount).map(template).reduce((pre, cur) => pre + cur)
    const Dolls = '<li id="back-doll">1</li><li id="back-doll">2</li><li id="back-doll">3</li><li id="back-doll">4</li><li id="back-doll">5</li>'
    // 外部容器宽度拉长
    parentNode.css("margin-right","-" + width * 2 + "px")
    parentNode.append(Dolls);
  }

  function emptyDoll(parentNode) {
    parentNode.empty()
  }

  function init() {
    createDoll(listPanel,'<li id="back-doll"></li>',itemWidth);
    left();
  }

  btnNode.click(function(){
    pawLineNode.addClass('paw-down');
    const hitTimeout = setTimeout(function() {
      const hitNode = findHitNode();
      console.log(hitNode.text())
      if(hitNode) {
        hitNode.addClass('empty')
        $("#paw-goal").css('display','block')
      }
      pawLineNode.removeClass('paw-down');
      const successTimeout = setTimeout(function() {
        alert("success!grabbing the " + hitNode.text())
        $("#paw-goal").css('display','none')
        emptyDoll(listPanel)
        init()
        clearTimeout(successTimeout);
      },interval)
      clearTimeout(hitTimeout);
    },interval)
  });

  function findHitNode() {
    const childrenNode = $('#ul-back').children("li")
    console.log(childrenNode)
    // 已经向左滚动的距离
    const hasScrollLeftDistance = Math.abs(Number(listPanel.css("left").replace("px","")));
    // 中线
    const middleLine = GAME_CONTAINER_WIDTH/2;
    // 寻找中间元素
    let middleNode = null;
    for(let i = 0; i < childrenNode.length; i += 1) {
      // 元素中点居父元素左侧的距离
      const middleLeft = i * itemWidth + itemWidth/2;
      console.log(middleLeft)
      //元素距离游戏容器左侧距离
      const realLeft = middleLeft - hasScrollLeftDistance;
      console.log(realLeft)
      // 元素中点居中线的距离
      const toRealMiddle = Math.abs(middleLine - realLeft);
      console.log(toRealMiddle)
      if(toRealMiddle < itemWidth/2) {
        console.log(middleLine)
        middleNode = childrenNode.eq(i);
      };
    }
    return middleNode;
  }
  init();
})