# APIs
API API API A P I AA PP II

###### API?
- Application Programming Interface
- rest api, graphql api, web api, browser api ...
- 상호작용을 위한 버튼,리모콘
- 서버와 소통을하는 방식에 따라 API종류가 다르다.

###### GraphQL API vs Rest API
- 둘 다 리모콘(서버와의 소통을 위한)이지만, 버튼생김새가 다른 것 뿐
 
- - -
### Rest API
- 리소스를 얻기위해 URL을 이용
- ex) /jayden/api/v1/movies
- URL을 요청하는것을 허용해야 함
- 거의 모든곳에서 호출할 수 있다 (브라우저, 언어, 모바일기기 등..)
- 매우 직관적이고 쉽다.

#### HTTP 메소드와 Rest API의 결합
- /jayden/api/v1/movies/create ? (X)
- /jayden/api/v1/movies + HTTP Post Method  (O)
- 동작은 HTTP메서드에 의존한다. Get Post Put Patch Delete

- - -
### GraphQL
- 하나의 specification, idea
- SPEC_LINK : https://github.com/graphql/graphql-spec 

#### GraphQL이 나은 점
1. ###### Over-fetching 방지
- 우리가 필요한 것 보다 더 받는 것
- RestAPI는 필요없는 데이터들까지 전부가 조회된다.
- Backend, Database 에 부담
- 성능 하락

- GraphQL API는 필요한 데이터만 요청, 필요한것만 응답

2. ###### Under-fetching 방지
- 우리가 필요한것보다 덜 받는 것
- 예를들어, Movie데이터를 요청을 했을때 genres배열을 열어보니 genre들의 Id로만 이루어져있다면? -> 필요한 데이터가 없다!
- 그럼 장르관련 RestAPI에 ID를 넣어 요청해야 함
- 총 두개의 URL에 Request가 필요

- GraphQL API 은 단 하나의 Request로 필요한데이터들을 가져올 수 있음.

- 결론적으로 여러 URL을 호출할 필요가 없음.

- - -
### GraphQL API

#### Apolo
- 오픈소스 서버 (nodejs)
- graphQL을 이해하는 서버, GraphQL 스펙을 이해한다.
- rest로 이루어진 express를 graphql로 바꿔주는것도 쉽다. 미들웨어만 추가시켜주면 됨

###### set-up
1. npm init -y 
2. npm install apollo-server graphql 
3. npm install nodemon -D
4. package.json > "type" : "module" 추가
- 아래처럼 Import로 추가하기위한 설정이다.
5. server.js > import {apolloserver, gql} 추가
5. npm run dev


###### 우리가 쓸 Data의 Shape에 대해 Server에 설명해줘야한다.
- 스키마
- SwapiGraphQL의 Docs부분에 아래의 부분이 있는 이유이다.
```
A GraphQL schema provides a root type for each kind of operation.

Root Types
query: Root
```

##### GraphQL Schema Definition Language
```javascript
const typeDefs = gql`
    type Query{
        text: String
        hello:String
    }
`;
```
- 위는 Get /text, /hello랑 같다.
- Request가 되는 뭐든 데이터들은 type Query에 정의되어있어야한다.


- - -
#### PostGraPhile
- GraphQL API를 얻을 수 있다.

#### Hasura
- 데이터베이스에서 즉각적으로 GraphQL API를 무료로 만들어줌

#### Swapi-GraphQL 
- GraphQL API 체험 툴
- https://graphql.org/swapi-graphql
- browser tool
- Docs > root > 내가 요청할 수 있는 데이터 확인 가능
```graphql
allFilms(
after: String
first: Int
before: String
last: Int
): FilmsConnection
film(
id: ID
filmID: ID
): Film
```
- 위와같은 데이터가 있을 때 
```graphql 
{
  allFilms{
    totalCount
    films{
      title
      director
    }
  }
}
```
- 위처럼 요청하면
```json
{
  "data": {
    "allFilms": {
      "totalCount": 6,
      "films": [
        {
          "title": "A New Hope",
          "director": "George Lucas"
        },
        {
          "title": "The Empire Strikes Back",
          "director": "Irvin Kershner"
        },
        {
          "title": "Return of the Jedi",
          "director": "Richard Marquand"
        },
        {
          "title": "The Phantom Menace",
          "director": "George Lucas"
        },
        {
          "title": "Attack of the Clones",
          "director": "George Lucas"
        },
        {
          "title": "Revenge of the Sith",
          "director": "George Lucas"
        }
      ]
    }
  }
}
```
- 위의 데이터가 출력된다
