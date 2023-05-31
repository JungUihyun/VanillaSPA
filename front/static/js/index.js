import Dashboard from "./views/Dashboard";
import NotFound from "./views/NotFound";
import Posts from "./views/Posts";
import Settings from "./views/Settings";

// 페이지 전환 함수
const navigateTo = url => {
  history.pushState(null, null, url);
  router();
};

// 라우터
const router = async () => {
  // async 사용 이유: 일부 페이지에서 렌더링 전에 서버 요청을 받아야하는 경우가 있기 때문
  const routes = [
    { path: '/', view: Dashboard },
    { path: '/posts', view: Posts },
    { path: '/settings', view: Settings },
    // 404 route 생성
    { path: "/404", view: NotFound },
  ];

  // 현재 route와 페이지 경로가 일치하는지 테스트
  const potentialMatches = routes.map(route => {
    return {
      route: route,
      isMatch: location.pathname === route.path
    };
  });

  // find 메서드를 사용해 isMatch가 true인 객체를 찾음
  let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
  // isMatch가 true인 객체가 없을 때 404 페이지로 이동
  if (!match) {
    match = {
      route: routes[routes.length - 1],
      isMatch: true
    };
  }

  // 활성화된 view 닫기
  const view = new match.route.view();

  // #app 엘리먼트에 활성화된 view의 html 삽입
  document.querySelector('#app').innerHTML = await view.getHtml();

  console.log(match.route.view());
};

// 뒤로가기 / 새로고침 시 router 페이지에 맞게 동작하게
window.addEventListener('popstate', router);

// DOM이 렌더링되면 router 함수 실행
document.addEventListener('DOMContentLoaded', () => {
  // 클릭 이벤트가 발생했을 때 해당 target이 'data-link' attribute가 있다면 페이지 이동 함수 실행
  document.body.addEventListener('click', e => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});
