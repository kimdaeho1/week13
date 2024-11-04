import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../redux/modules/posts';

// titleRef와 contentRef를 통해서 사용자의 입력값을 가져온다.
const PostForm = () => {
  const dispatch = useDispatch();
  const titleRef = useRef('');
  const contentRef = useRef('');

//handleSubmit
//e.preventDefault는 폼의 기본 제출 동작(페이지가 새로고침되면서 제출된 데이터가 서버로 전송)
//을 방지하여 새로고침 없이 데이터처리가능. 만약 이 함수가 없다면
//제출시 페이지가 새로고침되고 상태초기화가 일어남 (내가 지금 form형식으로 쓰기때문)
//컴포넌트상태가 다 날라가서 dispatch하지 못함 
//titleRef.current.value, contentRef.current.value를 통해 제목과 내용 가져옴
//조건검증 -> title.length5이상, content유효
//Ref를 썼기 때문에 입력필드를 초기화해야함. 초기화하지 않으면 리렌더링시 값을 가지고잇음

const handleSubmit = (e) => {
  e.preventDefault();

  const title = titleRef.current.value;
  const content = contentRef.current.value;

  // 유효성 검사는 HTML5의 기본 속성(required, minLength)을 통해 처리
  dispatch(addPost({ title, content }));

  // 입력 필드 초기화
  titleRef.current.value = '';
  contentRef.current.value = '';
};

//컴포넌트가 로드되었을때 이전의 작성한 내용을 지우기 위함.

  useEffect(() => {
    titleRef.current.value = '';
    contentRef.current.value = '';
  }, []);

//form태그에 handleSubmit을 연결해 제출 시 데이터를 처리.
//input, textarea에서 입력을 받고 ref를 통해 값을 가져와 상태를 관리함.
return (
  <form className="form-container" onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Title"
      ref={titleRef}
      required // 필수 입력 항목
      minLength={5} // 제목은 최소 5글자 이상
    />
    <textarea
      placeholder="Content"
      ref={contentRef}
      required // 필수 입력 항목
    />
    <button type="submit">추가</button>
  </form>
);
};

export default PostForm;

//굳이 div말고 form을 써야하는 이유?
//form이 웹 표준 준수, 유효성 검사등이 쉽게 이루어 질 수 있음.