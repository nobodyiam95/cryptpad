// SPDX-FileCopyrightText: 2023 XWiki CryptPad Team <contact@cryptpad.org> and contributors
//
// SPDX-License-Identifier: AGPL-3.0-or-later

define([
    'jquery',
    '/common/outer/local-store.js',
], function ($, LocalStore) {

    $(function () {
        var $main = $('#mainBlock');

        // main block is hidden in case javascript is disabled
        $main.removeClass('hidden');

        // Make sure we don't display non-translated content (empty button)
        $main.find('#data').removeClass('hidden');

        if (LocalStore.isLoggedIn() && LocalStore.getDriveRedirectPreference()) {
            if (window.location.pathname === '/') {
                window.location = '/drive/';
                return;
            }
        }
        $(window).click(function () {
            $('.cp-dropdown-content').hide();
        });
    });
});
