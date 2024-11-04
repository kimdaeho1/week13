// src/redux/config/store.js
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../modules/posts';

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;

//redux스토어를 설정하고, 구성하는 역할을 함. 애플리케이션의 상태를 중앙에서 관리.
//reduxjs/toolkit의 configureStore을 사용해 스토어를 설정함.
//postReducer는 게시글과 관련된 상태를 관리하는 reducer함수. 게시글 추가 삭제 수정등의 기능
//reducer는 app의 상태를 어떻게 관리할지 정의한다.
//posts이름으로 관리되는 상태를 가지고 있고, 상태의 변경은 postReducer를 통해 이루어짐.
//그리고 store를 내보냄

//만약 redux를 사용하지 않는다면.. 컴포넌트간 상태를 공유하기 되게 귀찮아짐 (부모의 자식의 자식....)
//예를 들어 게시물을 삭제하면 게시글 상세 페이지와 목록 페이지에서 변경사항이 반영되어야함
//근데 이걸 redux없이 한다? 홀리쉣~
//그래서 이 상태를 중앙에서 컴포넌트들이 공유하고, 필요할때 변경하려고 한다.

//context API?
//비동기적인 것에 도움.
//내 프로젝트가 만약 동기적으로만 작업하면, 게시글 목록을 로딩할때 API요청이 완료될 때 까지 브라우저가 반응하지 않음.
//비동기적이 좋긴하지만, 비동기작업이 많아지면 코드가 가독성이 떨어지고, 콜백지옥이 열릴 수 있다.
//내 프로젝트에서는 게시글 추가에 시간이 오래걸린다면, 게시글 추가하는 도중에도 내가 다른 게시글의 수정과 삭제, 조회가 가능하다는점.
