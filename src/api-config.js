let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  backendHost = "http://localhost:8080";
} else {
    backendHost = "http://prod-todo-api-service-howecofe.ap-northeast-2.elasticbeanstalk.com"; // 일래스틱 빈스톡의 애플리케이션 URL
}

export const API_BASE_URL = `${backendHost}`;