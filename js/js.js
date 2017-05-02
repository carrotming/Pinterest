

var picArr=[];

setValue(picArr);

function setValue(arr){
  var str;
  for(var i=0;i<=40;i++){
    str={src:i}
    arr.push(str);
  }
  return arr;
}

init(picArr);



  $(window).on('load', function () {
    layout();
    $(window).on('scroll', function () {
      if (update()) {
        init(picArr);
        layout();
      }
    })
    $(window).on('resize', function () {
      layout();
    })
  })


function init(picArr){
  //拿出的value是obj对象
  $.each(picArr,function (index,value){
    var oBox=$('<div>').addClass('box').appendTo('#main');
    var oPic=$('<div>').addClass('pic').appendTo(oBox);
    var img=$('<img>').attr('src','images4/' + $(value).attr('src') + '.jpg').appendTo(oPic);
  })
}




function layout(){
  var $box=$('#main>div');
  var w=$box.eq(0).outerWidth();
  var cols=Math.floor($(window).width()/w);
  $('#main').width(cols*w).css('margin','0 auto');
  var hArr=[];
  //拿出的value是dom对象
  $box.each(function (index,value){
    var h=$box.eq(index).outerHeight();
    if(index<cols){
      hArr.push(h);
      $box.eq(index).attr('style',''); //清空样式
    }else{
      var minH=Math.min.apply(null,hArr); //获取最小值
      var minIndex= $.inArray(minH,hArr); //获取最小值索引
      $(value).css({
        'position':'absolute',
        left:minIndex*w+'px',
        top:minH+'px'
      })
      hArr[minIndex]+=h;
    }
  })
}

function update(){
  var $lastBox=$('#main>div').last();
  var lastBoxDis=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
  var scrollTop=$(window).scrollTop();
  var CH=$(window).height();
  return (lastBoxDis<scrollTop+CH)?true:false;
}
