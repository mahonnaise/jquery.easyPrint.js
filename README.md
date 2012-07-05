#jquery.easyPrint.js ([Demo](http://kaioa.com/k/test/easyPrint/demo/index.html))

*jquery.easyPrint.js* is a jQuery plugin which allows you to print the contents of one or several elements (a jQuery collection).

Stylesheets are automatically used if they were included like this:

```html
<link rel="stylesheet" [...]/>
```

#Usage

<code>$(<var>selector</var>).easyPrint(&lt;<var>title</var>&gt;);</code>

* `selector` &ndash; a jQuery [selector](http://api.jquery.com/category/selectors/)
* `title` &ndash; the document title (optional)

#Compatibility

* any recent browser (Opera uses a popup instead of an `iframe`)
* IE versions as old as 6