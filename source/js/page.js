var cur_news_type = '';

function gup( name, url ) {
	if (!url) url = location.href
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( url );
	return results == null ? null : results[1];
}

$(document).ready(function(){

	$('body').delegate(".filter a", "click",function(){
		$('.filter a').each(function(){
			$(this).removeClass('current');
		});
		$(this).addClass('current');
		var type = $(this).attr('data-type'),
			id = $(this).attr('data-id');

		if(type != '0')
		{
			$.ajax({
				url: window.location.pathname,
				type: 'post',
				data: { npage: 1, tag: type},
				success: function(data)
				{
					$('div.container').html(data);
					$('.filter a').removeClass('current');
					$("[data-type='"+type+"']").addClass('current');
					$('.filter__current').text(type);
				}
			});
			cur_news_type = type;
			window.history.pushState(window.location.pathname, type, window.location.origin+window.location.pathname+'?tag='+type);
		}
		else
		{
			$.ajax({
				url: window.location.pathname,
				type: 'post',
				data: { npage: 1},
				success: function(data)
				{
					$('div.container').html(data);
					$('.filter a').removeClass('current');
					$("[data-type='0']").addClass('current');
					$('.filter__current').text($('.filter__link').last().text());
				}
			});
			cur_news_type = '';
			window.history.pushState(window.location.pathname, type, window.location.origin+window.location.pathname);
		}
	});


	$('body').delegate('.nextnewspage, .nextarticlepage, .nextfotopage, .nextguidepage', 'click',function(){
		var npage = $(this).attr('data-page')
		$.ajax({
			url: window.location.pathname,
			type: 'post',
			data: { npage: npage, tag: cur_news_type},
			success: function(data)
			{
				$('div.container').html(data);
				$('.filter a').removeClass('current');
				$("[data-type='"+cur_news_type+"']").addClass('current');
			}
		});

	});

	var pre_tag = decodeURIComponent(gup('tag', window.location));
	$('[data-type="'+pre_tag+'"]').click();

	var ajq;

	// квизы
	$('.quiz-inner').click(function(){
		//if($('.quiz-inner__result').length) return;

		if(($('.textblock__main').attr('data-type')!=2) && ($(this).find("[type=radio]").is(":checked")))
			$(this).find('.quiz-inner__answer').addClass('_disabled');

		if(typeof ajq != 'undefined')
			ajq.abort();

		ajq = $.ajax({
			url: '/quiz/check',
			type: 'post',
			dataType: 'json',
			data: $('#qform').serialize(),
			success: function(data)
			{
				if(typeof data['ans'] != 'undefined')
					$.each(data['ans'], function(answer, result){
						console.log(answer+" "+result);
						$('[data-answer='+answer+']').addClass(result);
					});

				if(typeof data['res'] != 'undefined')
				{
					$('.quiz-inner__result, .quiz__title').remove();
					$('#qform').after(data['res']);
					//$("meta[name=Description]").attr("content", $(".quiz-inner__result-text").text());
					var addthisScript = document.createElement('script');
					addthisScript.setAttribute('src', 'http://s7.addthis.com/js/300/addthis_widget.js#domready=1')
					document.body.appendChild(addthisScript);

                    //$('meta[property="og:description"]').attr('content', $('.quiz-inner__result-text').text());
                    $('meta[property="og:title"]').attr('content', $('.quiz-inner__result-result').text());
                    $('meta[property="og:image"]').attr('content', $('.quiz-inner__result-image').attr('src'));

				}
			}
		});
	})

	//if($('.quiz-inner__result-text-hidden').text() !='') $('meta[property="og:description"]').attr('content', $('.quiz-inner__result-text-hidden').text());
    if($('.quiz-inner__result-result').text() !='') $('meta[property="og:title"]').attr('content', $('.quiz-inner__result-result').text());
    if($('.quiz-inner__result-image').attr('src') !='') $('meta[property="og:image"]').attr('content', $('.quiz-inner__result-image').attr('src'));


});



$( function()
{
		// ACTIVITY INDICATOR

	var activityIndicatorOn = function()
		{
			$( '<div id="imagelightbox-loading"><div></div></div>' ).appendTo( 'body' );
		},
		activityIndicatorOff = function()
		{
			$( '#imagelightbox-loading' ).remove();
		},


		// OVERLAY

		overlayOn = function()
		{
			$( '<div id="imagelightbox-overlay"></div>' ).appendTo( 'body' );
		},
		overlayOff = function()
		{
			$( '#imagelightbox-overlay' ).remove();
		},


		// CLOSE BUTTON

		closeButtonOn = function( instance )
		{
			$( '<button type="button" id="imagelightbox-close" title="Close"></button>' ).appendTo( 'body' ).on( 'click touchend', function(){ $( this ).remove(); instance.quitImageLightbox(); return false; });
		},
		closeButtonOff = function()
		{
			$( '#imagelightbox-close' ).remove();
		},


		// CAPTION

		captionOn = function()
		{
			var description = $( 'a[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"] img' ).attr( 'alt' );
			if( description.length > 0 )
				$( '<div id="imagelightbox-caption">' + description + '</div>' ).appendTo( 'body' );
		},
		captionOff = function()
		{
			$( '#imagelightbox-caption' ).remove();
		},


		// NAVIGATION

		navigationOn = function( instance, selector )
		{
			var images = $( selector );
			if( images.length )
			{
				var nav = $( '<div id="imagelightbox-nav"></div>' );
				for( var i = 0; i < images.length; i++ )
					nav.append( '<button type="button"></button>' );

				nav.appendTo( 'body' );
				nav.on( 'click touchend', function(){ return false; });

				var navItems = nav.find( 'button' );
				navItems.on( 'click touchend', function()
				{
					var $this = $( this );
					if( images.eq( $this.index() ).attr( 'href' ) != $( '#imagelightbox' ).attr( 'src' ) )
						instance.switchImageLightbox( $this.index() );

					navItems.removeClass( 'active' );
					navItems.eq( $this.index() ).addClass( 'active' );

					return false;
				})
				.on( 'touchend', function(){ return false; });
			}
		},
		navigationUpdate = function( selector )
		{
			var items = $( '#imagelightbox-nav button' );
			items.removeClass( 'active' );
			items.eq( $( selector ).filter( '[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ).index( selector ) ).addClass( 'active' );
		},
		navigationOff = function()
		{
			$( '#imagelightbox-nav' ).remove();
		},


		// ARROWS

		arrowsOn = function( instance, selector )
		{
			var $arrows = $( '<button type="button" class="imagelightbox-arrow imagelightbox-arrow-left"></button><button type="button" class="imagelightbox-arrow imagelightbox-arrow-right"></button>' );

			$arrows.appendTo( 'body' );

			$arrows.on( 'click touchend', function( e )
			{
				e.preventDefault();

				var $this	= $( this ),
					$target	= $( selector + '[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ),
					index	= $target.index( selector );

				if( $this.hasClass( 'imagelightbox-arrow-left' ) )
				{
					index = index - 1;
					if( !$( selector ).eq( index ).length )
						index = $( selector ).length;
				}
				else
				{
					index = index + 1;
					if( !$( selector ).eq( index ).length )
						index = 0;
				}

				instance.switchImageLightbox( index );
				return false;
			});
		},
		arrowsOff = function()
		{
			$( '.imagelightbox-arrow' ).remove();
		};


	//	WITH ACTIVITY INDICATION

	$( 'a[data-imagelightbox="a"]' ).imageLightbox(
	{
		onLoadStart:	function() { activityIndicatorOn(); },
		onLoadEnd:		function() { activityIndicatorOff(); },
		onEnd:	 		function() { activityIndicatorOff(); }
	});


	//	WITH OVERLAY & ACTIVITY INDICATION

	$( 'a[data-imagelightbox="b"]' ).imageLightbox(
	{
		onStart: 	 function() { overlayOn(); },
		onEnd:	 	 function() { overlayOff(); activityIndicatorOff(); },
		onLoadStart: function() { activityIndicatorOn(); },
		onLoadEnd:	 function() { activityIndicatorOff(); }
	});


	//	WITH "CLOSE" BUTTON & ACTIVITY INDICATION

	var instanceC = $( 'a[data-imagelightbox="c"]' ).imageLightbox(
	{
		quitOnDocClick:	false,
		onStart:		function() { closeButtonOn( instanceC ); },
		onEnd:			function() { closeButtonOff(); activityIndicatorOff(); },
		onLoadStart: 	function() { activityIndicatorOn(); },
		onLoadEnd:	 	function() { activityIndicatorOff(); }
	});


	//	WITH CAPTION & ACTIVITY INDICATION

	$( 'a[data-imagelightbox="d"]' ).imageLightbox(
	{
		onLoadStart: function() { captionOff(); activityIndicatorOn(); },
		onLoadEnd:	 function() { captionOn(); activityIndicatorOff(); },
		onEnd:		 function() { captionOff(); activityIndicatorOff(); }
	});


	//	WITH ARROWS & ACTIVITY INDICATION

	var selectorG = 'a[data-imagelightbox="g"]';
	var instanceG = $( selectorG ).imageLightbox(
	{
		onStart:		function(){ arrowsOn( instanceG, selectorG ); },
		onEnd:			function(){ arrowsOff(); activityIndicatorOff(); },
		onLoadStart: 	function(){ activityIndicatorOn(); },
		onLoadEnd:	 	function(){ $( '.imagelightbox-arrow' ).css( 'display', 'block' ); activityIndicatorOff(); }
	});


	//	WITH NAVIGATION & ACTIVITY INDICATION

	var selectorE = 'a[data-imagelightbox="e"]';
	var instanceE = $( selectorE ).imageLightbox(
	{
		onStart:	 function() { navigationOn( instanceE, selectorE ); },
		onEnd:		 function() { navigationOff(); activityIndicatorOff(); },
		onLoadStart: function() { activityIndicatorOn(); },
		onLoadEnd:	 function() { navigationUpdate( selectorE ); activityIndicatorOff(); }
	});


	//	ALL COMBINED

	var selectorF = 'a[data-imagelightbox="f"]';
	var instanceF = $( selectorF ).imageLightbox(
	{
		onStart:		function() { overlayOn(); closeButtonOn( instanceF ); arrowsOn( instanceF, selectorF ); },
		onEnd:			function() { overlayOff(); captionOff(); closeButtonOff(); arrowsOff(); activityIndicatorOff(); },
		onLoadStart: 	function() { captionOff(); activityIndicatorOn(); },
		onLoadEnd:	 	function() { captionOn(); activityIndicatorOff(); $( '.imagelightbox-arrow' ).css( 'display', 'block' ); }
	});

});
