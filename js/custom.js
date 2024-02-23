//즉시실행함수
(function () {
    contentFullpage();
    coverTimeline();
    gnbEvent();
    circleTxt(`.profile .ctxt`);
})();

//프레임전체 fullpage
function contentFullpage() {
    const slideWrap = document.querySelector('.portfolio');

    const f = new fullpage('#content', {
        anchors: ['intro', 'portfolio', 'profile'],
        scrollOverflow: false,

        //fullpage slide의 가로스크롤 구현 option
        controlArrows: false, //슬라이드 화살표 숨김
        loopHorizontal: false, //슬라이드 반복 멈춤


        //메인 애니메이션 재실행.
        afterRender: () => {
            mainVisualTimeline();
        },
        afterLoad: (origin, destination, direction) => {
            console.log(destination.index, direction);
            mouseCursorReset();
            destination.index === 0 && mouseCursor();
            destination.index === 2 && mouseCursor();
            destination.index === 2 && mouseCursor();
        },

        onLeave: (origin, destination, direction, trigger) => {
            destination.index === 0 && mainVisualTimeline();

            destination.index === 1 && storyTimeline();
            destination.index === 2 && profileTimeline();

        },

        onSlideLeave: (section, origin, destination, direction, trigger) => {
            destination.index && portfolioTimeline(destination.index - 1);
        }
    });

    //fullpage slide의 가로스크롤 구현
    slideWrap.addEventListener("wheel", function (e) {
        let delta = e.deltaY; // 휠할 때에 deltaY값을 구해옴 100 , -100;
        //slide index 구해서 인덱스 마다 애니메이션 구해오기

        if (delta < 0) {
            fullpage_api.moveSlideLeft();
        }
        else {
            fullpage_api.moveSlideRight();
        }
    });
}


function coverTimeline() {
    const btn = document.querySelector('.utils_wrap .btn');
    const cover = document.querySelector('.gnb');
    btn.addEventListener('click', e => {
        const t = e.currentTarget;
        t.classList.toggle('is-active')
        cover.classList.toggle('on')
    })
}

function gnbEvent() {
    const cover = document.querySelector('.gnb');
    const btn = document.querySelector('.utils_wrap .btn');
    cover.addEventListener('wheel', e => {
        //e.preventDefault();
        e.stopPropagation(); // 이벤트의 전파를 막음
    });

    const lnk = document.querySelectorAll('.gnb .lnk a');

    lnk.forEach((it, idx) => {
        it.addEventListener('click', () => {
            cover.classList.remove('on');
            btn.classList.remove('is-active');
        })
    })
}


function mainVisualTimeline() {
    const t = document.querySelector('.mainVisal .tit h2');
    const p = document.querySelector('.mainVisal .tit p');
    const a = document.querySelector('.mainVisal .t');

    const tl = gsap.timeline();
    tl
        .from(t, {
            x: 1000,
            autoAlpha: 0,
            delay: 0.5,
            duration: 0.5,
        })
        .from(p, {
            x: 1000,
            autoAlpha: 0,
            delay: 0.5,
            duration: 0.5,
        }).to("#div", {
            motionPath: {
                path: "#path",
                align: "#path",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,

            },
            duration: 10,
            //repeat: -1,
        }).to("#div2", {
            motionPath: {
                path: "#path2",
                align: "#path2",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,

            },
            duration: 10,
            //yoyo: true,
            repeat: -1,
        })
}

function portfolioTimeline(n) {
    const t = document.querySelectorAll('.portfolio .desc h3');
    const p = document.querySelectorAll('.portfolio .desc p');
    const m = document.querySelectorAll('.portfolio .mokup');
    const tb = document.querySelectorAll('.portfolio .table');
    const lnk = document.querySelectorAll('.portfolio .link');

    const tl = gsap.timeline();

    tl
        .from(m[n], {
            autoAlpha: 0,
            y: 200,
            delay: 0.5,
        })
        .from(t[n], {
            autoAlpha: 0,
            x: 200,
            duration: 0.3,
        })
        .from(p[n], {
            autoAlpha: 0,
            x: 200,
            duration: 0.3,
        })
        .from(tb[n], {
            autoAlpha: 0,
            x: 200,
        })
        .from(lnk[n], {
            autoAlpha: 0,
            x: 200,
        })
        .to(`#itm0${n}`, {
            motionPath: {
                path: `#path0${n}`,
                align: `#path0${n}`,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,

            },
            duration: 10,
        })
}


function storyTimeline() {
    const t = document.querySelector('.portfolio .tit h3');
    const p = document.querySelector('.portfolio .tit p');

    const tl = gsap.timeline();

    tl.from(t, {
        autoAlpha: 0,
        x: 2000,
        delay: 0.5,
    }).from(p, {
        autoAlpha: 0,
        x: 2000,
        delay: 0.5,
    }).to(`#itm0x`, {
        motionPath: {
            path: `#path0x`,
            align: `#path0x`,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,

        },
        duration: 10,
    })
}


function profileTimeline() {
    const t = document.querySelector('.profile .tit h3');
    const p = document.querySelector('.profile .tit p');
    const c = document.querySelector('.profile .ctxt');
    const tl = gsap.timeline();

    tl.from(t, {
        x: 1000,
        autoAlpha: 0,
        delay: 1
    }).from(p, {
        x: 1000,
        autoAlpha: 0,
        delay: 1
    })
}

function mouseCursor() {
    const mc = document.querySelectorAll('.mainVisal , .profile');
    mc.forEach(it => {
        it.addEventListener('mousemove', (e) => {
            let mouseX = e.pageX + 10; // document의 x좌표값
            let mouseY = e.pageY + 10; // document의 y좌표값

            const cursor = document.querySelector('.cursor');
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        })
    })
}

function mouseCursorReset() {
    const cursor = document.querySelector('.cursor');
    cursor.style.left = 80 + 'px';
    cursor.style.top = 'auto';
    cursor.style.bottom = 40 + 'px';
}


function circleTxt(txt) {
    const t = document.querySelector(txt).innerText;
    const at = [...t].map(it => `<span>${it}</span>`).join('');
    document.querySelector(txt).innerHTML = at;
    const b = document.querySelector(txt);
    const ctxt = b.querySelectorAll("span");
    console.log(ctxt);

    ctxt.forEach((it, idx, arry) => {
        it.style.cssText = `
        position: absolute;
        top:0;
        left: 50%;
        height: 100%;
        transform: translate(-50%,0) rotate(${360 / arry.length * idx}deg)
        `
    })
}







