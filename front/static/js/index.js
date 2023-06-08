import Dashboard from "./views/Dashboard.js";
import NotFound from "./views/NotFound.js";
import Posts from "./views/Posts.js";
import Settings from "./views/Settings.js";

// 정규식으로 파라미터 나누기
const pathToRegex = path => new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

// 활성화된 페이지의 파라미터 가져와 배열에 담기
const getParams = match => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

  return Object.fromEntries(keys.map((key, i) => {
    return key, values[i];
  }));
}

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
    // 파라미터가 추가됐을 경우 route 추가
    { path: '/posts/:id/:something', view: Posts },
    { path: '/settings', view: Settings },
    // 404 route 생성
    { path: "/404", view: NotFound },
  ];

  // 현재 route와 페이지 경로가 일치하는지 테스트
  const potentialMatches = routes.map(route => {
    return {
      route: route,
      // result로 변경하고 정규식과 일치하는 pathname을 담는다.
      result: location.pathname.match(pathToRegex(route.path))
    };
  });

  // 정규식과 일치하는 pathname이 null이 아닌 경우 담기
  let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
  
  // 없는 페이지일 때, 404 페이지로 이동하고 result에는 해당 pathname 담기
  if (!match) {
    match = {
      route: routes[routes.length - 1],
      result: [location.pathname]
    };
  }

  // match 정보를 getParams에 보내 배열로 출력해서 view에 담기
  const view = new match.route.view(getParams(match));

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
