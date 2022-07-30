export default function apiCall(path,requestOptions) {
    return fetch(`http://43.204.23.132:80/${path}`,requestOptions);
}