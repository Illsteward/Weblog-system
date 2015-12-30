var entries = [
    { "id": 1, "title": "Hello World!", "body": "My first somehow interesting article on this blog. Yay!", "published": "29. 12. 2015" },
    { "id": 2, "title": "For testing purposes", "body": "Article loaded for testing id-based approach.", "published": "29. 12. 2015" }];


exports.getBlogEntries = function () {
    return entries;
}

exports.getBlogEntry = function (id) {
    for (var i = 0; i < entries.length; i++) {
        if (entries[i].id == id) return entries[i];
    }
}
 