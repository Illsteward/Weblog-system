# Multistage rendering

A simple server for serving html rendered from .md files via HTTP protocol.
Uses standard node.js library where possible, depending so far only on hbs and marked.

## Status

### Works
GETing views from .md files work with / for index.md, /filename for static file, /filename?{query} for rendering dynamic templates based on user input and /filename?id=id for getting article from database.
Furthermore, if the requested path is not found, a 404.html file is provided from the views directory. Decided to go html in case something goes wrong with markdown parser.

### ToDo
1. Really next, as in "will work on this now" are stylesheets, probably using LESS preprocessor.
2. Various models, hosted in separate project. Idealy will be swappable and provide the same interface (getEntries, getEntryByID) regardless of used database.
3. Partials. As in including various .md or HTML files on different parts of building the view or extending ViewControler.getView to allow making more robust views.

