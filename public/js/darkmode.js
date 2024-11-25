
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}


function loadPage(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(xhr.responseText, 'text/html');
            var newContent = doc.getElementById('content');
            if (newContent) {
                document.getElementById('content').innerHTML = newContent.innerHTML;
            } else {
                document.getElementById('content').innerHTML = xhr.responseText;
            }
            history.pushState(null, '', url);
        } else {
            console.error('Ошибка загрузки страницы');
        }
    };
    
    xhr.onerror = function() {
        console.error('Ошибка сети');
    };
    
    xhr.send();
}


function handleNavigation(event) {
    var target = event.target.closest('a'); 
    if (target && target.getAttribute('href')) {
        event.preventDefault();
        var url = target.getAttribute('href');
        loadPage(url);
    }
}


document.addEventListener('click', handleNavigation);


window.addEventListener('popstate', function(event) {
    loadPage(location.pathname);
});


document.addEventListener('DOMContentLoaded', function() {

    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }


    loadPage(window.location.pathname);
});