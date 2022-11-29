// import $ from 'jquery';
// /*==================================================================
//     [ Fixed Header ]*/
// const headerDesktop = $('.container-menu-desktop');
// const wrapMenu = $('.wrap-menu-desktop');

// if ($('.top-bar').length > 0) {
//   var posWrapHeader = $('.top-bar').height();
// } else {
//   var posWrapHeader = 0;
// }

// if ($(window).scrollTop() > posWrapHeader) {
//   $(headerDesktop).addClass('fix-menu-desktop');
//   $(wrapMenu).css('top', 0);
// } else {
//   $(headerDesktop).removeClass('fix-menu-desktop');
//   $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop());
// }

// $(window).on('scroll', function () {
//   if ($(this).scrollTop() > posWrapHeader) {
//     $(headerDesktop).addClass('fix-menu-desktop');
//     $(wrapMenu).css('top', 0);
//   } else {
//     $(headerDesktop).removeClass('fix-menu-desktop');
//     $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop());
//   }
// });

// /*==================================================================
//     [ Show / hide modal search ]*/
// $('.js-show-modal-search').on('click', function () {
//   $('.modal-search-header').addClass('show-modal-search');
//   $(this).css('opacity', '0');
// });

// $('.js-hide-modal-search').on('click', function () {
//   $('.modal-search-header').removeClass('show-modal-search');
//   $('.js-show-modal-search').css('opacity', '1');
// });

// $('.container-search-header').on('click', function (e) {
//   e.stopPropagation();
// });

// /*[ Back to top ]
//     ===========================================================*/
// var windowH = $(window).height() / 2;

// $(window).on('scroll', function () {
//   if ($(this).scrollTop() > windowH) {
//     $('#myBtn').css('display', 'flex');
//   } else {
//     $('#myBtn').css('display', 'none');
//   }
// });

// $('#myBtn').on('click', function () {
//   $('html, body').animate({ scrollTop: 0 }, 300);
// });
