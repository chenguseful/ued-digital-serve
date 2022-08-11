/**
 * author：程炎
 * update：2022-08-11
 * stack: javascript
 */

$('#container').height($(document).height());

var player

// 获取视屏地址方法
function getVideo(url) {
    player = TCPlayer('container', {
        controls: false
    });
    player.src(url);
}

function scroll() {
    const wrap = document.querySelector('.bottom-menu-dialog');
    (function smoothscroll() {
        const currentScroll = wrap.scrollTop
        const clientHeight = wrap.offsetHeight
        const scrollHeight = wrap.scrollHeight
        if (scrollHeight - 10 > currentScroll + clientHeight) {
            window.requestAnimationFrame(smoothscroll)
            wrap.scrollTo(0, currentScroll + (scrollHeight - currentScroll - clientHeight) / 2)
        } else {
            wrap.scrollTo(0, scrollHeight)
        }
    })()
}

scroll();

$('.bottom-menu-item').on('click', function () {
    $('.bottom-menu-item').removeClass('sel');
    $(this).addClass('sel');
})

$('.bottom-menu-1').on('click', function () {
    goStep('1');
})

$('.bottom-menu-2').on('click', function () {
    $('.tab-box').addClass('hidden');
})

$('.bottom-menu-3').on('click', function () {
    goStep('9');
})

$('.chat-type').on('click', function () {
    $(this).parent().toggleClass('chat-write');
})

function goStep(step) {
    $('.tab-box').addClass('hidden');
    $(`.tab-${step}`).removeClass('hidden');
}

/**
 * 发送消息
 * text：发送的消息
 * type：客服消息 0，用户消息：1
 */
function sendText(text, type) {
    if (type == 1) {
        $('.bottom-menu-dialog').append(`<div class="dialog-box dialog-mine"><span>${text}</span></div>`)
    } else {
        $('.bottom-menu-dialog').append(`<div class="dialog-box"><span>${text}</span></div>`)
    }
    scroll();
}

// 更新流量进度条
function updatePrograss() {
    const prograss = Number($('.tab-flow-item-1').find('span').text()) / (Number($('.tab-flow-item-1').find('span').text()) + Number($('.tab-flow-item-2').find('span').text()))
    $('.tab-prograss').width(prograss * 100 + '%')
}

updatePrograss()

// 定时模拟控制，接口联调改为接口返回控制
setTimeout(() => {
    $('.loader-box').addClass('load-success').find('.load-text').text('连接成功，轻触进入');
    $('.load-success').on('click', function () {
        $(this).addClass('hidden');
        if (player) {
            player.play();
        }
    });
}, 4000)