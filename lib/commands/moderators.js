// SPDX-FileCopyrightText: 2023 XWiki CryptPad Team <contact@cryptpad.org> and contributors
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/*jshint esversion: 6 */
const Moderators = module.exports;

const Moderator = require('../storage/moderator');
const Util = require("../common-util");

Moderators.getAll = (Env, cb) => {
    Moderator.getAll(Env, (err, data) => {
        if (err) { return void cb(err); }
        cb(null, data);
    });
};
Moderators.getKeysSync = (Env) => {
    return Moderator.getAllKeys(Env);
};

Moderators.add = (Env, edPublic, data, adminKey, _cb) => {
    const cb = Util.once(Util.mkAsync(_cb));
    data.createdBy = adminKey;
    data.time = +new Date();
    const safeKey = Util.escapeKeyCharacters(edPublic);
    Moderator.write(Env, safeKey, data, (err) => {
        if (err) { return void cb(err); }
        Env.moderators.push(edPublic);
        Env.envUpdated.fire();
        cb();
    });
};

Moderators.delete = (Env, id, _cb) => {
    const cb = Util.once(Util.mkAsync(_cb));
    Moderator.delete(Env, id, (err) => {
        if (err && err !== 'ENOENT') { return void cb(err); }
        // XXX update Env.moderators
        cb(void 0, true);
    });
};
