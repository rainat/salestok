/* Author:http://www.rainatspace.com

*/

function initializeScript(){
	//jQuery('#preloader').fadeOut(2000);
		jQuery("[icon-data]").each(function(){
		var getAttr =  jQuery(this).attr('icon-data');
		jQuery(this).addClass(getAttr).removeAttr('icon-data');
	});

	// Navigation  Bounce Menu Effect================================================================*/
	jQuery('.nav li ul').removeClass('hidden');
		jQuery('.nav li').hover(function() {
			jQuery('ul', this).filter(':not(:animated)').slideDown(600, 'easeOutBounce');
	     }, function() {
		jQuery('ul', this).slideUp(600, 'easeInExpo');
	});

	// NAVIGATION RESPOSNIVE HANDLER
	jQuery(".nav >  ul").clone(false).appendTo(".nav-rwd-sidebar");
	jQuery(window).on('load', function(){
		jQuery('.nav-rwd-sidebar').find('ul').removeClass();
	});
	jQuery(".btn-rwd-sidebar, .btn-hide").click( function() {
		jQuery(".nav-rwd-sidebar").toggleClass("sidebar-active");
		jQuery(".wrapper-inner").toggleClass("wrapper-active");
	});


	//TABS
	jQuery("#tabs li").click(function() {
		jQuery("#tabs li").removeClass('active');
		jQuery(this).addClass("active");
		jQuery(".tab_content").hide();
		var selected_tab = jQuery(this).find("a").attr("href");
		jQuery(selected_tab).fadeIn();
		return false;
	});
}

/* =Document Ready Trigger
-------------------------------------------------------------- */
jQuery(document).ready(function(){
    initializeScript();
});
/* END ------------------------------------------------------- */