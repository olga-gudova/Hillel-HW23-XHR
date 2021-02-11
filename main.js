const $ul = document.createElement('ul');
document.body.append($ul);

const xhr = new XMLHttpRequest;

xhr.open('GET', 'https://swapi.dev/api/films/');
xhr.responseType = 'json';
xhr.send();

xhr.onload = function () {
    if (xhr.status === 200) {
        xhr.response.results.forEach(el => {
            const $li = document.createElement('li');
            $li.textContent = el.title;
            
            $ul.append($li);

            $li.addEventListener('click', () => {
                if ($li.children.length === 0) {
                    const $ulInner = document.createElement('ul');
                    el.starships.forEach(ship => {
                        const xhr2 = new XMLHttpRequest;

                        xhr2.open('GET', ship);
                        xhr2.responseType = 'json';
                        xhr2.send();

                        xhr2.onload = function () {
                            if (xhr2.status === 200) {
                                const $liInner = document.createElement('li');
                                $liInner.textContent = xhr2.response.name;
                                $ulInner.append($liInner);
                                $li.append($ulInner);
                            };
                        };
                    });
                } else {
                    for (let i = 0; i < $li.children.length; i++) {
                        let items = $li.children;
                        if (items[i].hidden) {
                            items[i].hidden = false;
                        } else {
                            items[i].hidden = true;
                        }                 
                    }
                }                
            });
        });
    };
}