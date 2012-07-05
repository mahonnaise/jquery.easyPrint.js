/*! github.com/mahonnaise/jquery.easyPrint.js */

/*jslint plusplus:false, browser:true, plusplus:true*/
/*global jQuery*/

(function ($) {
	'use strict';

	var iframe;

	$.fn.easyPrint = function (title) {
		var contentWindow, doc, that = this, html;

		html = '<!DOCTYPE html><html><head>';

		if (title !== undefined) {
			html += '<title>' + title + '</title>';
		}

		// Simply using:
		//   $(that[0].ownerDocument).find('link[rel="stylesheet"]').html()
		// doesn't work. It returns an empty string with Firefox 4-13.
		html += (function () {
			var markup = '', i, len, stylesheets;
			stylesheets = $(that[0].ownerDocument).find('link[rel="stylesheet"]');
			len = stylesheets.length;
			for (i = 0; i < len; i++) {
				markup += '<link rel="stylesheet" href="' + stylesheets[i].href + '"' +
					(stylesheets[i].media ? (' media="' + stylesheets[i].media + '"') : '') +
					'/>';
			}
			return markup;
		}());

		html += '</head><body>';

		this.each(function () {
			html += $(this).html();
		});

		html += '</body></html>';

		if ($.browser.opera) {
			contentWindow = window.open(
				'data:,',
				title,
				'menubar=false,width=640,height=480'
			);
		} else {
			if (!iframe) {
				iframe = $('<iframe/>');
				// The iframe must be visible for IE. visibility:hidden can't be used.
				iframe.css({
					position: 'absolute',
					height: 1,
					top: -10
				});
				$(document.body).append(iframe);
			}

			contentWindow = iframe[0].contentWindow;
		}
		doc = contentWindow.document;

		doc.open();
		doc.write(html);
		doc.close();

		// Opera requires some rescheduling. It appears that Opera changes the focus (in response to clicks) after notifying the listeners.
		// This means we have to postpone focus() by one step. Otherwise it would get undone by Opera's native focus handling.
		window.setTimeout(function () {
			contentWindow.focus();
			contentWindow.print();
		}, 0);

		return this;
	};
}(jQuery));