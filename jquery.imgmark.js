/**
 * 圖片標注
 *
 * @auther Derek Chan <dchan0831@gmail.com>
 *
 * @return response
 */
;(function($){
    function Imgmark (self, options) {
        var defaults = {
            'container' : self.parent(), // 容器
            'downFun' : '',
            'move' : 'both',
            'header' : 1,
        };
        this.option = $.extend(defaults, options || {});
        this.self = self;
        this.init();
    }

    Imgmark.prototype = {
        /**
         * 初始化
         *
         * @return response
         */
        init : function () {
            // 設置容器的的高寬度
            this.boxWidth = this.option.container.width();
            this.boxHeight = this.option.container.height();

            // 設置容器的樣式
            this.option.container.css({'position' : 'relative', 'overflow' : 'hidden'});

            // 綁定事件
            this.bindEvent();
            this.callback();
        },
        /**
         * 綁定事件
         *
         * @return response
         */
        bindEvent : function () {
            var $this = this;
            $this.self.each(function () {
                var element = $(this);
                if ($this.option.header != 1) {
                    element = $(this).find($this.option.header);
                }
                
                if (element.attr('data-marked') != 0 && element.attr('data-marked') != undefined) {
                    $this.marked(element);
                }

                $this.setStyle(element); // 設置樣式

                // 綁定鼠標事件
                element.mousedown(function (e) {
                    $this.mousedown(e, element);
                });

                $(document).mouseup(function(e){
                    element.down = false;
                });
                $(document).mousemove(function(e){
                    $this.mousemove(e, element);
                });
            });
        },
        /**
         * 默認狀態
         */
        marked : function (element) {
            var top = element.attr('data-top'),
                left = element.attr('data-left'),
                className = element.attr('data-class');

            element.css({'position' : 'absolute', 'top' : top, 'left' : left});

            if (className) {
                element.addClass(className);
            }

            if (typeof this.option.downFun == 'function') {
                this.option.downFun(event, element);
            }
        },
        /**
         * 设置样式
         */
        setStyle : function (element) {
            var top = element.position().top,
                left = element.position().left,
                curWidth = element.width(),
                curHeight = element.height();

            element.css({'width' : curWidth});
        },
        /**
         * mousedown事件
         *
         * @return response
         */
        mousedown : function (event, element) {

            event.preventDefault();
            this.option.container.children().css({'z-index' : 11});
            if (typeof this.option.downFun == 'function' && element.attr("style").indexOf("absolute") == -1) {
                this.option.downFun(event, element);
            }
            element.css({'z-index' : 12, 'position': 'absolute'});
            element.down = true;
            element.X = event.pageX;
            element.Y = event.pageY;
            element.positionX = element.position().left;
            element.positionY = element.position().top;

            return false;
        },
        /**
         * mousemove事件
         *
         * @param object event
         * @param object element
         *
         * @return response
         */
        mousemove : function (event, element) {
            xPage = event.pageX;
            moveX = element.positionX + xPage - element.X;
            
            yPage = event.pageY;//--
            moveY = element.positionY + yPage - element.Y;
            
            this.move(element, moveX, moveY);
        },
        /**
         * 元素移动
         *
         * @param object element
         * @param int moveX x偏移量    
         * @param int moveY y偏移量
         *
         * @return response
         */
        move : function (element, moveX, moveY) {
            var curWidth = element.width(),
                curHeight = element.height();

            if (element.down == true) {
                element.css({'left' : moveX, 'top' : moveY});
            } else {
                return false;
            }

            if (moveX < 0) {
                element.css({'left' : 0});
            }
            
            if (moveX > (this.boxWidth - curWidth)) {
                element.css({'left' : this.boxWidth - curWidth});
            }

            if (moveY < 0) {
                element.css({'top' : 0});
            }

            if (moveY > (this.boxHeight - curHeight)) {
                element.css({'top' : this.boxHeight - curHeight});
            }
        },
        callback : function () {
            if (typeof this.option.callback == 'function') {
                this.option.callback(this);
            }
        }
    };

    $.fn.imgmark = function (options) {
        return new Imgmark($(this), options);
    }
})(jQuery);