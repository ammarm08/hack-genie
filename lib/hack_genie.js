'use strict';

var fs = require('fs');
var util = require('util');
var path = require('path');

var Bot = require('slackbots');
var Fido = require('./response_fetcher.js');

var Genie = function Constructor (settings) {
  this.settings = settings;
  this.settings.name = settings.name || 'genie';
  this.user = null;
}

util.inherits(Genie, Bot);

Genie.prototype.run = function () {
  Genie.super_.call(this, this.settings);

  this.on('start', this._onStart);
  this.on('message', this._onMessage);
}

Genie.prototype._onStart = function () {
  this._loadBotUser();
}

Genie.prototype._loadBotUser = function () {
  var self = this;
  this.user = this.users.filter(function (u) {
    return u.name === self.name;
  })[0];
}

Genie.prototype._onMessage = function (msg) {
  if (this._isTalkingToGenie(msg)) {
    this._replyToUser(msg);
    
  }
}

Genie.prototype._isTalkingToGenie = function (msg) {
  return this._isChatMessage(msg) && this._isChannelConvo(msg)
    && !this._isFromGenie(msg) && this._isMentioningGenie(msg)
}

Genie.prototype._isChatMessage = function (msg) {
  return msg.type === 'message' && Boolean(msg.text);
}

Genie.prototype._isChannelConvo = function (msg) {
  return typeof msg.channel === 'string';
}

Genie.prototype._isFromGenie = function (msg) {
  return msg.user === this.user.id;
}

Genie.prototype._isMentioningGenie = function (msg) {
  var words = msg.text.toLowerCase().split(' ');
  return words[0] === 'genie';
}

Genie.prototype._replyToUser = function (msg) {
  var self = this;
  var q = msg.text.toLowerCase().replace('genie ', '');

  Fido(q, function (res) {
    self.postMessage(msg.channel, res, {as_user: true});
  });
}

module.exports = Genie;