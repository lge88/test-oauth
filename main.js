var hello = window.hello;

document.getElementById('fb-login-btn').onclick = function() {
    hello('facebook').login();
};

document.getElementById('gg-login-btn').onclick = function() {
    hello( 'google' ).login({
        force: true,
        scope: 'friends',
        redirect_uri:'/index.html'
    });
};

hello.on('auth.login', function(auth){
    if (auth.network === 'facebook') {
        hello(auth.network).api('/me').then(function(res){
            var profile = res;
            var thumb = profile.thumbnail;
            var name = profile.name;

            var spanEl = document.createElement('span');
            spanEl.textContent = name;

            var imgEl = document.createElement('img');
            imgEl.src = thumb;

            var divEl = document.createElement('div');
            divEl.appendChild(spanEl);
            divEl.appendChild(imgEl);

            document.body.appendChild(divEl);
	    });
    } else if (auth.network === 'google') {
	    hello(auth.network).api('/me/contacts').then(function(res){
            var contacts = res.data;
            console.log("contacts = ", contacts);

            contacts = contacts.map(function(contact) {
                return {
                    name: contact.name,
                    email: contact.email,
                    thumb: contact.thumbnail
                };
            });

            var tableHeader = '<tr><th>Name</th><th>Email</th></tr>';

            var tableBody = contacts.map(function(c) {
                return '<tr><td><span>' + c.name + '</span></td><td><a href="mailto:' + c.email + '">' + c.email + '</a></td></tr>';
            }).join('');

            var html = [
                '<table>',
                '<thead>',
                tableHeader,
                '</thead>',
                '<tbody>',
                tableBody,
                '</tbody>',
                '</table>'
            ].join('');

            var divEl = document.createElement('div');
            divEl.innerHTML = html;

            document.body.appendChild(divEl);
	    });
    }
});

hello.init({
    facebook: '825571430810184',
    google: '584115876949-1req87u22do5nqs1jgl0gn66912njiqu.apps.googleusercontent.com'
});
