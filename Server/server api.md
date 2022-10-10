<!-----

Yay, no errors, warnings, or alerts!

Conversion time: 1.75 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β33
* Mon Oct 10 2022 02:46:12 GMT-0700 (PDT)
* Source doc: 서버 API
* Tables are currently converted to HTML tables.

WARNING:
You have 4 H1 headings. You may want to use the "H1 -> H2" option to demote all headings by one level.

----->


<p style="color: red; font-weight: bold">>>>>>  gd2md-html alert:  ERRORs: 0; WARNINGs: 1; ALERTS: 0.</p>
<ul style="color: red; font-weight: bold"><li>See top comment block for details on ERRORs and WARNINGs. <li>In the converted Markdown or HTML, search for inline alerts that start with >>>>>  gd2md-html alert:  for specific instances that need correction.</ul>

<p style="color: red; font-weight: bold">Links to alert messages:</p>
<p style="color: red; font-weight: bold">>>>>> PLEASE check and correct alert issues and delete this message and the inline alerts.<hr></p>



# 서버 API


[TOC]



# 전제조건 {#전제조건}

클라이언트와 서버 사이의 통신 프로토콜은 HTTP입니다.

요청 본문과 응답 본문의 형식은 기본적으로 JSON입니다. 본문 형식이 JSON이 아닌 경우에만 Content-Type 헤더에 들어갈 값을 표시했습니다.

응답코드는 기본적으로 200입니다.

목록을 요청하는 방식은 cursor based pagination입니다.


# 기능 {#기능}

게시판은 하나입니다.

게시판 내에 카테고리(탭)이 여러 개 있습니다.

게시글은 어느 카테고리에도 속하지 않거나 오직 하나의 카테고리에만 속할 수 있습니다.

게시글에 댓글을 달 수 있습니다.

게시글 목록은 작성 일자가 최신인 것이 제일 앞에 보입니다.

게시글에는 오직 글만 쓸 수 있고 사진, 동영상 등의 컨텐츠를 넣을 수 없습니다.

댓글에 대한 답글은 달 수 없습니다.

게시글을 검색하는 기능은 없습니다.


# 에러 메시지 {#에러-메시지}

요청을 처리하는 중에 에러가 발생하면 400 이상의 에러 코드와 함께 JSON 형식의 응답이 반환됩니다. 반환된 객체의 속성은 다음과 같습니다.


<table>
  <tr>
   <td>code
   </td>
   <td>에러의 종류를 나타내는 간단한 문자열입니다.
   </td>
  </tr>
  <tr>
   <td>description
   </td>
   <td>에러의 원인을 자세하게 설명한 문자열입니다.
   </td>
  </tr>
</table>


code의 값의 종류는 다음과 같습니다.


<table>
  <tr>
   <td>InvalidParameter
   </td>
   <td>필수적인 파라미터가 누락되거나 잘못된 값이 들어있습니다.
   </td>
  </tr>
  <tr>
   <td>InvalidPassword
   </td>
   <td>비밀번호가 틀렸습니다.
   </td>
  </tr>
  <tr>
   <td>Unauthorized
   </td>
   <td>인증 토큰이 없거나 잘못된 토큰이 전달되었습니다.
<p>
또는 사용자가 권한을 가지고 있지 않은 요청입니다.
   </td>
  </tr>
  <tr>
   <td>AlreadyExist
   </td>
   <td>요청받은 파라미터의 값이 이미 데이터베이스에 존재합니다.
   </td>
  </tr>
  <tr>
   <td>NotFound
   </td>
   <td>요청받은 데이터가 존재하지 않습니다.
   </td>
  </tr>
</table>



# API {#api}


## 회원가입 {#회원가입}

POST /api/user

헤더

	없음

요청 파라미터


<table>
  <tr>
   <td>이름
   </td>
   <td>타입
   </td>
   <td>설명
   </td>
  </tr>
  <tr>
   <td>account
   </td>
   <td>문자열
   </td>
   <td>새로 생성할 계정.
<p>
최대 길이 30자.
   </td>
  </tr>
  <tr>
   <td>password
   </td>
   <td>문자열
   </td>
   <td>새 계정의 비밀번호.
<p>
최대 길이 30자.
   </td>
  </tr>
  <tr>
   <td>nickname
   </td>
   <td>문자열
   </td>
   <td>새 계정의 닉네임.
<p>
최대 길이 30자.
   </td>
  </tr>
</table>


응답 파라미터

	없음

요청 예시

	POST /api/user

	Content-Type: application/json

	{

		"account": "hello",

		"password": "world123",

		"nickname": "john"

	}


## 로그인 {#로그인}

POST /api/auth

	

헤더

	없음

요청 파라미터


<table>
  <tr>
   <td>이름
   </td>
   <td>타입
   </td>
   <td>설명
   </td>
  </tr>
  <tr>
   <td>account
   </td>
   <td>문자열
   </td>
   <td>새로 생성할 계정.
<p>
최대 길이 30자.
   </td>
  </tr>
  <tr>
   <td>password
   </td>
   <td>문자열
   </td>
   <td>새 계정의 비밀번호.
<p>
최대 길이 30자.
   </td>
  </tr>
</table>


응답 파라미터


<table>
  <tr>
   <td>이름
   </td>
   <td>타입
   </td>
   <td>설명
   </td>
  </tr>
  <tr>
   <td>token
   </td>
   <td>문자열
   </td>
   <td>Authorization 헤더에 사용할 인증토큰.
   </td>
  </tr>
</table>


요청 예시

	POST /api/auth

	Content-Type: application/json

	

	{

		"account": "hello",

		"password": "world123"

	}

	

응답 예시

	{

		"token": "qwer.asdf.zcxv."

	}


## 카테고리 생성 {#카테고리-생성}

POST /api/category

	

헤더


<table>
  <tr>
   <td>이름
   </td>
   <td>타입
   </td>
   <td>설명
   </td>
  </tr>
  <tr>
   <td>Authorization
   </td>
   <td>문자열
   </td>
   <td>로그인 요청에서 응답받은 토큰.
   </td>
  </tr>
</table>


요청 파라미터


<table>
  <tr>
   <td>이름
   </td>
   <td>타입
   </td>
   <td>설명
   </td>
  </tr>
  <tr>
   <td>label
   </td>
   <td>문자열
   </td>
   <td>새로 생성할 카테고리의 이름.
<p>
최대 길이 10자.
   </td>
  </tr>
</table>


응답

	없음

	

요청 예시

	POST /api/category

	Authorization: qwer.asdf.zxcv

	Content-Type: application/json

	

	{

		"label": "동해"

	}

	

응답 예시

	없음


## 카테고리 목록 요청 {#카테고리-목록-요청}

GET /api/category

	

헤더

	없음

	

요청 파라미터

	없음

	

응답 파라미터


<table>
  <tr>
   <td>이름
   </td>
   <td>타입
   </td>
   <td>설명
   </td>
  </tr>
  <tr>
   <td>list
   </td>
   <td>문자열 배열
   </td>
   <td>카테고리 이름의 배열.
   </td>
  </tr>
</table>


요청 예시

	GET /api/category

	

응답 예시

	{

		"list": ["자유", "인증", "동해", "서해", "남해"]

	}


## 게시글 작성 {#게시글-작성}

POST /api/post

	

헤더


<table>
  <tr>
   <td>이름
   </td>
   <td>타입
   </td>
   <td>설명
   </td>
  </tr>
  <tr>
   <td>Authorization
   </td>
   <td>문자열
   </td>
   <td>로그인 요청에서 응답받은 토큰.
   </td>
  </tr>
</table>


요청 파라미터


<table>
  <tr>
   <td>이름
   </td>
   <td>타입
   </td>
   <td>설명
   </td>
  </tr>
  <tr>
   <td>title
   </td>
   <td>문자열
   </td>
   <td>게시글 제목.
<p>
최대 길이 250자.
   </td>
  </tr>
  <tr>
   <td>content
   </td>
   <td>문자열
   </td>
   <td>게시글 본문.
<p>
최대 길이 10000자.
   </td>
  </tr>
  <tr>
   <td>category
   </td>
   <td>문자열
   </td>
   <td>게시글이 속할 카테고리 이름.
   </td>
  </tr>
</table>


응답 파라미터

	없음

	

요청 예시

	POST /api/post

	Authorization: qwer.asdf.zxcv

	Content-Type: application/json

	

	{

		"title": "광어 인증",

		"content": "...",

		"category": "인증"

	}

응답 예시

	없음


## 게시글 목록 요청 {#게시글-목록-요청}

GET /api/post

	

헤더

	없음

	

요청 파라미터


<table>
  <tr>
   <td>이름
   </td>
   <td>타입
   </td>
   <td>설명
   </td>
  </tr>
  <tr>
   <td>category
   </td>
   <td>문자열
   </td>
   <td>카테고리 이름.
<p>
이 카테고리에 속한 게시글 목록만 응답으로 반환됩니다.
<p>
이 파라미터가 없으면 전체 게시글 목록이 반환됩니다.
   </td>
  </tr>
  <tr>
   <td>cursor
   </td>
   <td>문자열
   </td>
   <td>목록의 다음 부분을 요청할 때 사용하는 파라미터.
<p>
이 파라미터가 없으면 목록의 제일 앞 부분이 반환됩니다.
   </td>
  </tr>
</table>


	

응답 파라미터


<table>
  <tr>
   <td>이름
   </td>
   <td>타입
   </td>
   <td>설명
   </td>
  </tr>
  <tr>
   <td>cursor
   </td>
   <td>문자열
   </td>
   <td>목록의 다음 부분을 요청할 때 cursor 파라미터의 값으로 사용해야하는 값.
   </td>
  </tr>
  <tr>
   <td>list
   </td>
   <td>객체 배열
   </td>
   <td>게시글 정보를 담은 객체의 배열. 객체에 대한 정보는 아래 참고.
<p>
최대 길이 50.
<p>
이 배열의 길이가 50보다 작으면 이번 응답이 목록의 마지막 부분이라는 뜻입니다.
   </td>
  </tr>
  <tr>
   <td>list[0].id
   </td>
   <td>정수
   </td>
   <td>게시글의 고유 번호.
   </td>
  </tr>
  <tr>
   <td>list[0].title
   </td>
   <td>문자열
   </td>
   <td>게시글의 제목.
   </td>
  </tr>
  <tr>
   <td>list[0].creationTime
   </td>
   <td>문자열
   </td>
   <td>게시글 생성 시간. UTC.
   </td>
  </tr>
  <tr>
   <td>list[0].viewCount
   </td>
   <td>정수
   </td>
   <td>게시글 조회수.
   </td>
  </tr>
  <tr>
   <td>list[0].likeCount
   </td>
   <td>정수
   </td>
   <td>게시글 좋아요 수.
   </td>
  </tr>
  <tr>
   <td>list[0].dislikeCount
   </td>
   <td>정수
   </td>
   <td>게시글 싫어요 수.
   </td>
  </tr>
  <tr>
   <td>list[0].category
   </td>
   <td>문자열
   </td>
   <td>게시글이 속한 카테고리 이름.
   </td>
  </tr>
  <tr>
   <td>list[0].user
   </td>
   <td>객체
   </td>
   <td>게시글 작성자 정보를 담은 객체.
   </td>
  </tr>
  <tr>
   <td>list[0].user.id
   </td>
   <td>정수
   </td>
   <td>게시글 작성자의 고유 번호.
   </td>
  </tr>
  <tr>
   <td>list[0].user.nickname
   </td>
   <td>문자열
   </td>
   <td>게시글 작성자의 닉네임.
   </td>
  </tr>
</table>


	

요청 예시

	GET /api/post?category=인증&cursor=123

응답 예시

	{

		"cursor": 173,

		"list": [

			{

				"id": 123,

				"title": "광어 인증",

				"creationTime": "2022-10-09 12:00:00.000Z",

				"viewCount": 123,

				"likeCount": 12,

				"dislikeCount": 3,

				"category": "인증",

				"user": {

					"id": 12,

					"nickname": "john"

				}

			},

			...,

			{

				"id": 172,

				...

			}

		]

	}


## 게시글 본문 요청 {#게시글-본문-요청}

GET /api/post/{post id}

헤더

없음

	

요청 파라미터

	없음

	

응답 파라미터

게시글 목록 요청의 응답 파라미터와 유사합니다. 아래의 파라미터가 추가됩니다.	


<table>
  <tr>
   <td>이름
   </td>
   <td>타입
   </td>
   <td>설명
   </td>
  </tr>
  <tr>
   <td>content
   </td>
   <td>문자열
   </td>
   <td>게시글 본문.
   </td>
  </tr>
</table>


요청 예시

	GET /api/post/123

	

응답 예시

	{

		"id": 123,

		"title": "광어 인증",

		"content": "...",

		"creationTime": "2022-10-09 12:00:00.000Z",

		"viewCount": 123,

		"likeCount": 12,

		"dislikeCount": 3,

		"category": "인증",

		"user": {

			"id": 12,

			"nickname": "john"

		}

	}


## 댓글 작성 {#댓글-작성}

POST /api/post/{post id}/comment

헤더


<table>
  <tr>
   <td>이름
   </td>
   <td>타입
   </td>
   <td>설명
   </td>
  </tr>
  <tr>
   <td>Authorization
   </td>
   <td>문자열
   </td>
   <td>로그인 요청에서 응답받은 토큰.
   </td>
  </tr>
</table>


파라미터


<table>
  <tr>
   <td>이름
   </td>
   <td>타입
   </td>
   <td>설명
   </td>
  </tr>
  <tr>
   <td>content
   </td>
   <td>문자열
   </td>
   <td>작성할 댓글 내용.
   </td>
  </tr>
</table>


	

응답

	없음

	

요청 예시

	POST /api/post/123/comment

	Authorization: qwer.asdf.zxcv

	Content-Type: application/json

	

	{

		"content": "...."

	}

	

응답 예시

	없음


## 게시글의 댓글 목록 요청 {#게시글의-댓글-목록-요청}

GET /api/post/{post id}/comment

헤더

	없음

요청 파라미터


<table>
  <tr>
   <td>이름
   </td>
   <td>타입
   </td>
   <td>설명
   </td>
  </tr>
  <tr>
   <td>cursor
   </td>
   <td>문자열
   </td>
   <td>목록의 다음 부분을 요청할 때 사용하는 파라미터.
<p>
이 파라미터가 없으면 목록의 제일 앞부분이 반환됩니다.
   </td>
  </tr>
</table>


응답 파라미터


<table>
  <tr>
   <td>이름
   </td>
   <td>타입
   </td>
   <td>설명
   </td>
  </tr>
  <tr>
   <td>cursor
   </td>
   <td>문자열
   </td>
   <td>다음 목록 요청 시 사용해야 하는 cursor 값.
   </td>
  </tr>
  <tr>
   <td>list
   </td>
   <td>객체 배열
   </td>
   <td>댓글 정보를 담은 객체의 배열.
<p>
최대 길이 50.
<p>
이 배열의 길이가 50보다 작으면 이 응답이 목록의 마지막이라는 의미입니다.
   </td>
  </tr>
  <tr>
   <td>list[0].content
   </td>
   <td>문자열
   </td>
   <td>댓글 본문.
   </td>
  </tr>
  <tr>
   <td>list[0].creationTime
   </td>
   <td>문자열
   </td>
   <td>댓글 생성 시각. UTC.
   </td>
  </tr>
  <tr>
   <td>list[0].user
   </td>
   <td>객체
   </td>
   <td>유저 정보를 담은 객체.
   </td>
  </tr>
  <tr>
   <td>list[0].user.id
   </td>
   <td>정수
   </td>
   <td>작성자의 고유 번호.
   </td>
  </tr>
  <tr>
   <td>list[0].user.nickname
   </td>
   <td>문자열
   </td>
   <td>작성자의 닉네임.
   </td>
  </tr>
</table>


	

요청 예시

	GET /api/post/123/comment

	

응답 예시

	{

		"cursor": ,

		"list": [

			{

				"content": "...",

				"creationTime": "2022-10-09 12:00:00.000Z",

				"user": {

					"id": 13,

					"nickname": "john"

				}

			},

			...,

			{

				"content": "...",

				...

			}

		]

	}

	


## 낚시 결과 기록 {#낚시-결과-기록}

POST /api/history

헤더


<table>
  <tr>
   <td>이름
   </td>
   <td>타입
   </td>
   <td>설명
   </td>
  </tr>
  <tr>
   <td>Authorization
   </td>
   <td>문자열
   </td>
   <td>로그인 요청에서 응답받은 토큰.
   </td>
  </tr>
</table>


응답 파라미터


<table>
  <tr>
   <td>이름
   </td>
   <td>타입
   </td>
   <td>설명
   </td>
  </tr>
  <tr>
   <td>latitude
   </td>
   <td>실수
   </td>
   <td>낚시 사진 촬영한 장소의 위도.
   </td>
  </tr>
  <tr>
   <td>longitude
   </td>
   <td>실수
   </td>
   <td>낚시 사진 촬영한 장소의 경도.
   </td>
  </tr>
  <tr>
   <td>timestamp
   </td>
   <td>문자열
   </td>
   <td>낚시 사진 촬영한 시각. UTC.
   </td>
  </tr>
</table>


	

응답 파라미터


<table>
  <tr>
   <td>이름
   </td>
   <td>타입
   </td>
   <td>설명
   </td>
  </tr>
  <tr>
   <td>id
   </td>
   <td>정수
   </td>
   <td>낚시 결과에 대한 고유 번호.
<p>
사진 업로드, 이미지 분류 요청에서 사용됩니다.
   </td>
  </tr>
</table>


요청 예시

	POST /api/history

	Authorization: qwer.asdf.zxcv

	Content-Type: application/json

	

	{

		"latitude": 30.12,

		"longitude": 123.12,

		"timestamp": "2022-10-09 12:00:00.000Z"

	}

응답 예시

	{

		"id": 999

	}


## 낚은 물고기 사진 업로드 {#낚은-물고기-사진-업로드}

PUT /api/history/{history id}/image

헤더


<table>
  <tr>
   <td>이름
   </td>
   <td>타입
   </td>
   <td>설명
   </td>
  </tr>
  <tr>
   <td>Authorization
   </td>
   <td>문자열
   </td>
   <td>로그인 요청에서 응답받은 토큰.
   </td>
  </tr>
  <tr>
   <td>Content-Type
   </td>
   <td>문자열
   </td>
   <td>요청 본문의 타입.
<p>
image/jpeg
<p>
image/webp
<p>
image/png
   </td>
  </tr>
</table>


요청 파라미터

	없음

	

응답 파라미터

	없음

요청 예시

	PUT /api/history/999/image

	Authorization: qwer.asdf.zxcv

	Content-Type: application/octet-stream

	

	[이미지 파일]

	

응답 예시

	없음


## 물고기 이미지 분류 요청 {#물고기-이미지-분류-요청}

POST /api/classification/{history id}

헤더


<table>
  <tr>
   <td>이름
   </td>
   <td>타입
   </td>
   <td>설명
   </td>
  </tr>
  <tr>
   <td>Authorization
   </td>
   <td>문자열
   </td>
   <td>로그인 요청에서 응답받은 토큰.
   </td>
  </tr>
</table>


요청 파라미터

	없음

	

응답 파라미터


<table>
  <tr>
   <td>이름
   </td>
   <td>타입
   </td>
   <td>설명
   </td>
  </tr>
  <tr>
   <td>label
   </td>
   <td>문자열
   </td>
   <td>요청한 history id에 대한 물고기 이미지 분류 결과.
   </td>
  </tr>
</table>


	

요청 예시

	PUT /api/classification/999

	Authorization: qwer.asdf.zxcv

	

응답 예시

	{

		"label": "참치"

	}


## 물고기 대표 이미지 요청 {#물고기-대표-이미지-요청}

GET /api/fish/image

헤더

	없음

	

요청 파라미터


<table>
  <tr>
   <td>이름
   </td>
   <td>타입
   </td>
   <td>설명
   </td>
  </tr>
  <tr>
   <td>label
   </td>
   <td>문자열
   </td>
   <td>이미지를 원하는 생선 이름.
   </td>
  </tr>
</table>


	

응답

	생선 이미지 파일

	

요청 예시

	GET /api/fish/image?label=참치

	

응답 예시

	[참치를 대표하는 이미지]
